<script>
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';
import _ from 'lodash';

@Component
export default class AdminForm extends Vue {
  @Model('change', { type: Object, default: () => ({}) }) value;
  @Prop({ type: Array, default: () => [] }) columns;
  @Prop(Boolean) loading;

  get formColumns() {
    return this.columns.filter(item => item.renderCell);
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
    const locales = _.get(column, 'locales') || [];
    if (locales.length) {
      return (
        <div>
          <el-form-item label={column.label}>
            {
              locales.map(locale => {
                const localeColumn = _.merge({}, column, locale, { prop: `${column.prop}_${locale.prop}` });
                return this.renderFormItem(localeColumn);
              })
            }
          </el-form-item>
        </div>
      );
    }
    return this.renderFormItem(column);
  }

  renderFormItem(column) {
    const props = {
      prop: column.prop,
      label: column.label
    }
    if (_.isPlainObject(column.renderCell)) {
      // column里面可能有些key 是引用类型（rules...）改到其中的某一项会死循环渲染
      Object.assign(props, _.cloneDeep(_.pick(column.renderCell, ['label-width', 'required', 'rules', 'error', 'show-message', 'inline-message', 'size', 'hint'])));
    }
    props.rules = props.rules || [];
    if (props.required) {
      delete props.required;
      props.rules.unshift({
        required: true,
        message: this.$t('bean.fieldRequired', { field: props.label }),
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

  getFormInstance() {
    const formComponents = [];
    function getFormCom(instance) {
      if (_.get(instance, '$children.length', 0) > 0) {
        instance.$children.forEach(child => {
          if (_.isFunction(child.validate) && _.isFunction(child.resetFields) && _.get(child, '$el.nodeName', '').toLowerCase() === 'form') {
            formComponents.push(child);
          }
          getFormCom(child);
        });
      }
    }
    getFormCom(this);
    return formComponents;
  }

  async handleValidateForm() {
    const formComponents = this.getFormInstance();
    return Promise.all(
      formComponents.map(item => item.validate())
    );
  }

  @Emit('submit')
  async handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }
    await this.handleValidateForm();
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
        props={{ ...this.$attrs, model: this.value }}
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
