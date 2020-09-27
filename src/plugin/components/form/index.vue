<script>
//TODO v-model 饶了太多层了，input事件同步数据有性能问题
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';
import _ from 'lodash';
import ColumnRender from '../column-render';

const FORM_REF_NAME = 'form_ref';

@Component
export default class AdminForm extends Vue {
  @Model('change', { type: Object, default: () => ({}) }) value;
  @Prop({ type: Array, default: () => [] }) columns;
  @Prop(Boolean) loading;

  get formColumns() {
    return this.columns.filter(item => item.renderCell);
  }

  renderFormComponent(column) {
    return <ColumnRender
      value={this.getFormItemValue(column)}
      on={{
        change: val => this.handleFormItemChange(column, val),
        input: val => this.handleFormItemChange(column, val)
      }}
      onRefsChange={e => e && _.set(this, `formRefs.${column.prop}`, e)}
      column={column}
      renderCell={column.renderCell}
    />
  }

  renderFormItem(column) {
    const props = {
      prop: column.prop,
      label: column.label
    }
    if (_.isPlainObject(column.renderCell)) {
      // column里面可能有些key 是引用类型（rules...）  改到其中的某一项会死循环渲染
      Object.assign(props, _.cloneDeep(_.pick(column.renderCell, ['label-width', 'required', 'rules', 'error', 'show-message', 'inline-message', 'size', 'hint'])));
    }
    props.rules = props.rules || [];
    if (props.required) {
      delete props.required;
      props.rules.unshift({
        required: true,
        message: `${props.label}必填`,
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

  async handleValidateForm() {
    const validateForm = async (instance) => {
      if (instance.$refs && instance.$refs[FORM_REF_NAME]) {
        await instance.$refs[FORM_REF_NAME].validate();
      }
    }
    const validateChild = () => {
      const formComponents = _.flattenDeep(_.map(this.formRefs, val => val)).filter(Boolean);
      if (!formComponents.length) {
        return;
      }
      return Promise.all(formComponents.map(validateForm));
    }
    await Promise.all([
      validateForm(this),
      validateChild()
    ]);
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
    if (this.$refs[FORM_REF_NAME]) {
      await this.$refs[FORM_REF_NAME].resetFields();
    }
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
        ref={FORM_REF_NAME}
        props={{ ...this.$attrs, model: this.value }}
        nativeOnSubmit={this.handleSubmit}
      >
        {this.renderHeader()}
        {this.formColumns.map(this.renderFormItem)}
        {this.renderAction()}
      </el-form>
    );
  }
}
</script>
