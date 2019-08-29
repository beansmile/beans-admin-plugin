<script>
import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import _ from 'lodash';
import Select from './select.vue'

@Component
export default class SourceFormItem extends Vue {
  @Prop(Object) column;
  @Prop(Object) row;
  @Model('change', { type: Object }) value;

  getPropValue(prop) {
    return _.get(this.value, prop);
  }

  handleValueChange(prop) {
    return (val) => {
      const newValue = _.mergeWith({}, this.value, _.set({}, prop, val), (objValue, srcValue) => {
        if (_.isArray(objValue)) {
          return srcValue;
        }
      });
      this.$emit('change', newValue);
    }
  }

  renderRadioGroup({ prop, props }) {
    return (
      <el-radio-group props={props} value={this.getPropValue(prop)} onInput={this.handleValueChange(prop)}>
        {
          props.radios.map(radio =>
            <el-radio props={radio} key={radio.label}>{radio.title}</el-radio>
          )
        }
      </el-radio-group>
    )
  }

  renderCheckboxGroup({ prop, props }) {
    return (
      <el-checkbox-group {...{ props }} value={this.getPropValue(prop) || []} onInput={this.handleValueChange(prop)}>
        {
          props.checkboxs.map(checkbox =>
            <el-checkbox props={checkbox} key={checkbox.label}>{checkbox.title}</el-checkbox>
          )
        }
      </el-checkbox-group>
    )
  }

  renderInput({ prop, props }) {
    // TODO placeholder 在props里面解构有问题
    return <el-input props={props} rows={props.rows} placeholder={props.placeholder} value={this.getPropValue(prop)} onInput={this.handleValueChange(prop)} />
  }

  renderInputNumber({ prop, props }) {
    return <el-input-number props={props} value={this.getPropValue(prop)} onChange={this.handleValueChange(prop)} />
  }

  renderSelect({ prop, props }) {
    return <Select
      selectProps={{ ...props, value: this.getPropValue(prop) }}
      onChange={this.handleValueChange(prop)}
      row={this.data} />
  }

  renderSwitch({ prop, props }) {
    return <el-switch props={props} value={this.getPropValue(prop)} onChange={this.handleValueChange(prop)} />
  }

  renderDatePicker({ prop, props }) {
    // 文档上的change事件不会触发
    return <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" props={props} value={this.getPropValue(prop)} onInput={this.handleValueChange(prop)} />
  }

  renderDateTimePicker({ prop, props }) {
    return <el-date-picker
      props={props}
      value={this.getPropValue(prop)}
      onInput={this.handleValueChange(prop)}
      type="datetime"
      placeholder="选择日期时间"
    />
  }

  renderColorPicker({ prop, props }) {
    return <el-color-picker props={props} value={this.getPropValue(prop)} onChange={this.handleValueChange(prop)} />
  }

  renderUpload({ prop, props }) {
    return <c-upload-form-item attrs={props} props={props} value={this.getPropValue(prop)} onChange={this.handleValueChange(prop)} />
  }

  renderEditor({ prop, props }) {
    return <c-editor props={props} value={this.getPropValue(prop)} onChange={this.handleValueChange(prop)} />
  }

  renderNestForm({ prop, props }) {
    return <c-nest-form
      options={props}
      value={this.getPropValue(prop)}
      onChange={this.handleValueChange(prop)}
    />
  }

  renderVNode({ props }) {
    return <v-node props={props} />
  }

  render() {
    const renderMap = {
      radioGroup: this.renderRadioGroup,
      checkboxGroup: this.renderCheckboxGroup,
      input: this.renderInput,
      inputNumber: this.renderInputNumber,
      select: this.renderSelect,
      switch: this.renderSwitch,
      datePicker: this.renderDatePicker,
      dateTimePicker: this.renderDateTimePicker,
      colorPicker: this.renderColorPicker,
      upload: this.renderUpload,
      editor: this.renderEditor,
      nestForm: this.renderNestForm,
      vNode: this.renderVNode
    }

    const { form, prop, label, metaRender } = this.column;
    const renderType = _.get(this.column, 'form.component');
    const formItem = { prop, props: {}, ..._.omit(form, 'component') };

    if (!this.value[formItem.prop] && formItem.props.defaultValue) {
      this.handleValueChange(formItem.prop)(formItem.props.defaultValue);
    }

    if (_.isFunction(formItem.props)) {
      formItem.props = formItem.props(this.$createElement, { data: this.value, row: this.row });
    }

    const { required, rules = [] } = formItem;
    let formRules = _.flatten([rules]);
    if (required) {
      if (!formRules.find(item => item.required)) {
        formRules.push({
          required: true,
          message: required === true ? `${label}必填` : required,
          trigger: 'blur'
        })
      }
    }

    return (
      <el-form-item class="source-form-item" prop={prop} label={label} rules={formRules}>
        { metaRender ? metaRender(this.$createElement) : null }
        {renderMap[renderType](formItem)}
        {formItem.props.hint && <span class="hint">{ formItem.props.hint }</span>}
      </el-form-item>
    )
  }
}
</script>

<style lang="less">
  .source-form-item {
    .hint {
      font-size: 12px;
      color: gray;
      line-height: 24px;
      display: block;
    }
  }

  .source-form-item .has_many_fieds .source-form-item {
    margin-bottom: 22px;
  }
</style>

