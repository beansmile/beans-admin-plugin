<script>
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';
import _ from 'lodash';
import Collapse from '../collapse';
import { screenService } from '../../services';

const COLLAPSED_CONTENT_CLASS = 'collapsed-content-class'

@Component
export default class AdminForm extends Vue {
  @Model('change', { type: Object, default: () => ({}) }) value;
  @Prop({ type: Array, default: () => [] }) columns;
  @Prop(Boolean) loading;

  get labelProps() {
    const isMobile = screenService.isMobile;
    return {
      ...(isMobile ? { 'label-position': 'top' } : { 'label-position': 'left', 'label-width': 'auto' }),
      ...this.$attrs
    };
  }

  get formColumns() {
    return this.columns.filter(item => item.renderCell);
  }

  get locales() {
    const locales = _.get(this.$vadminConfig, 'i18n.locales', {});
    const locale = _.get(this.$i18n, 'locale');
    const localesArr = _.map(locales, (localeLabel, lacaleValue) => ({ label: localeLabel, locale: lacaleValue }));
    const currentIndex = localesArr.findIndex(item => item.locale === locale);
    // 当前语言排在第一个
    localesArr.unshift(localesArr.splice(currentIndex, 1)[0]);
    return localesArr;
  }

  renderFormComponent(column) {
    const ColumnRenderHelper = require('./column-render-helper').default;
    return <ColumnRenderHelper
      value={this.getFormItemValue(column)}
      scope={{ row: this.value }}
      on={{
        change: val => this.handleFormItemChange(column, val),
      }}
      column={column}
      renderCell={column.renderCell}
    />
  }

  renderFormItemDispatcher(column) {
    if (column.locale) {
      const locale = _.get(this.$i18n, 'locale');
      const render = item => {
        const required = (_.has(column, 'required') ? column.required : _.get(column, 'renderCell.required', false)) && (locale === item.locale);
        const localeColumn = _.merge({ 'label-width': '200px' }, { prop: `${column.prop}_${item.locale}`, label: item.label, _label: column.label, renderCell: { required: false } }, { ..._.omit(column, ['prop', 'label']) },  _.get(column.locale, item.locale, { renderCell: { required } }));
        return this.renderFormItem(localeColumn);
      }
      if (this.locales.length) {
        return (
          <el-form-item label={column.label}>
            <Collapse
              class="form-item-locale"
              collapsedContentClass={COLLAPSED_CONTENT_CLASS}
              scopedSlots={{
                trigger: ({ collapsed }) => <el-button size="mini" icon={`el-icon-arrow-${collapsed ? 'down' : 'up'}`} circle />,
                collapsed: () => this.locales.slice(1).map(render)
              }}
            >
              {render(this.locales[0])}
            </Collapse>
          </el-form-item>
        );
      }
    }
    return this.renderFormItem(column);
  }

  renderFormItem(column) {
    const props = {
      prop: column.prop,
      label: column.label
    };
    const formItemProps = ['required', 'label-width', 'rules', 'error', 'show-message', 'inline-message', 'size', 'hint'];
    // 外层的prop优先级更高
    Object.assign(props,
      _.cloneDeep(_.pick(column.renderCell, formItemProps)),
      _.cloneDeep(_.pick(column, formItemProps))
    );
    props.rules = props.rules || [];
    if (props.required) {
      delete props.required;
      props.rules.unshift({
        required: true,
        message: this.$t('bean.fieldRequired', { field: column._label ? column._label : props.label }),
        trigger: 'blur'
      });
    }
    return (
      <el-form-item key={props.prop} props={props} class={props.prop}>
        {this.renderFormComponent(column)}
        {!!props.hint && <div class="form-item-hint">{props.hint}</div>}
      </el-form-item>
    )
  }

  getPureForm() {
    return JSON.parse(JSON.stringify(this.value));
  }

  getFormItemValue(column) {
    return _.get(this.value, column.prop);
  }

  @Emit('change')
  handleFormItemChange(column, value) {
    const form = this.getPureForm();
    _.set(form, column.prop, value);
    return form;
  }

  findInstance(condition) {
    const instances = [];
    function getInstance(instance) {
      if (_.get(instance, '$children.length', 0) > 0) {
        instance.$children.forEach(child => {
          if (condition(child)) {
            instances.push(child);
          }
          getInstance(child);
        });
      }
    }
    getInstance(this);
    return instances;
  }

  getFormInstance() {
    return this.findInstance(child => _.isFunction(child.validate) && _.isFunction(child.resetFields) && _.get(child, '$el.nodeName', '').toLowerCase() === 'form');
  }

  formValidate(formInstance) {
    // 如果formInstance.validate(callback)，如果formInstance没有model，callback不会触发...
    // return new Promise((resolve, reject) => {
    //   formInstance.validate((isValid, errorObject) => {
    //     if (isValid) {
    //       return resolve(isValid);
    //     }
    //     return reject(errorObject);
    //   });
    // });
    return formInstance.validate();
  }

  async handleValidateForm() {
    const formComponents = this.getFormInstance();
    return Promise.all(
      formComponents.map(this.formValidate)
    );
  }

  @Emit('submit')
  async handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    try {
      await this.handleValidateForm();
    } catch (e) {
      this.$message.error(this.$t('bean.formValidateError'));
      this.$nextTick()
        .finally(() => {
          const collapseComponents = this.findInstance(child => _.has(child, 'collapsed'));
          collapseComponents.forEach(item => {
            const errorItem = item.$el.querySelector(`.${COLLAPSED_CONTENT_CLASS} .is-error`);
            // 有错误就打开折叠
            if (errorItem) {
              item.collapsed = false;
            }
          });
        });
      throw e;
    }
    return this.getPureForm();
  }

  @Emit('change')
  async handleReset() {
    const formComponents = this.getFormInstance();
    await Promise.all(
      formComponents.map(item => item.resetFields())
    )
    return this.getPureForm();
  }

  @Emit('change')
  handleClear() {
    return {};
  }

  renderAction() {
    const { action } = this.$scopedSlots;
    if (action) {
      return action({
        submit: () => this.handleSubmit(),
        clear: () => this.handleClear(),
        reset: () => this.handleReset()
      });
    }
    return (
      <el-form-item>
        <el-button type="primary" loading={this.loading} onClick={this.handleSubmit}>提交</el-button>
      </el-form-item>
    )
  }

  renderHeader() {
    const header = this.$scopedSlots['header'];
    if (header) {
      return header();
    }
  }

  render() {
    // model需要放在props里面传进去，直接写外面会有问题
    return (
      <el-form
        class="admin-form"
        label-position="left"
        props={{ ...this.labelProps, ...this.$attrs, model: this.value }}
        nativeOnSubmit={this.handleSubmit}
      >
        {this.renderHeader()}
        {this.formColumns.map(this.renderFormItemDispatcher)}
        {this.renderAction()}
      </el-form>
    );
  }
}
</script>
