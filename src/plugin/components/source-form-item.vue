<script>
import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import _ from 'lodash';
import Select from './select.vue'

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

function getDate(val) {
  if (!val) return val;
  const dateArr = _.flatten([val]).map(item => {
    if (!item) {
      return item;
    }
    const date = new Date(item);
    return isValidDate(date) ? date : new Date();
  });
  return _.isArray(val) ? dateArr : dateArr[0];
}

@Component
export default class SourceFormItem extends Vue {
  @Prop(Object) column;
  @Prop(Object) row;
  @Model('change', { type: Object }) value;

  getPropValue(prop) {
    return _.get(this.value, prop);
  }

  handleValueChange(prop, { triggerColumnChange = true } = {}) {
    return (val) => {
      const newValue = _.mergeWith({}, this.value, _.set({}, prop, val), (objValue, srcValue) => {
        if (_.isArray(objValue)) {
          return srcValue;
        }
      });
      this.$emit('change', newValue);
      if (triggerColumnChange) {
        const { change } = this.formItem.events || {};
        _.isFunction(change) && change(newValue[prop]);
      }
    }
  }

  handleInputNumberChange(prop) {
    return val => this.handleValueChange(prop)(val || 0);
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
          props.checkboxs.map(checkbox => {
            const newProps = _.clone(checkbox);
            const id = newProps.id
            if (id) { newProps.id = String(id) }
            // id 必须是string类型
            return <el-checkbox props={newProps} key={checkbox.label}>{checkbox.title}</el-checkbox>
          })
        }
      </el-checkbox-group>
    )
  }

  renderCheckboxButtonGroup({ prop, props }) {
    return (
      <el-checkbox-group {...{ props }} value={this.getPropValue(prop)} onInput={this.handleValueChange(prop)}>
        {
          props.checkboxs.map(checkbox =>
            <el-checkbox-button props={checkbox} key={checkbox.label}>{checkbox.title}</el-checkbox-button>
          )
        }
      </el-checkbox-group>
    )
  }

  renderInput({ prop, props }) {
    return <el-input attrs={props} props={props} rows={props.rows} value={this.getPropValue(prop)} onInput={this.handleValueChange(prop)} />
  }

  renderTextArea({ prop, props }) {
    return <el-input attrs={props} props={props} type="textarea" value={this.getPropValue(prop)} onInput={this.handleValueChange(prop)} />
  }

  renderInputNumber({ prop, props }) {
    const componentProps = { max: 2147483647, min: 0, ...props }
    return <el-input-number props={componentProps} value={this.getPropValue(prop)} onChange={this.handleInputNumberChange(prop)} />
  }

  renderSelect({ prop, props }) {
    return <Select
      props={props}
      attrs={props}
      value={this.getPropValue(prop)}
      onChange={this.handleValueChange(prop)}
    />
  }

  renderSwitch({ prop, props }) {
    return <el-switch props={props} value={this.getPropValue(prop)} onChange={this.handleValueChange(prop)} />
  }

  renderDatePicker({ prop, props }) {
    const value = getDate(this.getPropValue(prop));
    // 文档上的change事件不会触发
    return <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" props={props} value={value} onInput={this.handleValueChange(prop)} />
  }

  renderDateTimePicker({ prop, props }) {
    const value = getDate(this.getPropValue(prop));

    return <el-date-picker
      props={props}
      value={value}
      onInput={this.handleValueChange(prop)}
      type="datetime"
      placeholder="Select Time"
    />
  }

  renderTimePicker({ prop, props }) {
    return <el-time-picker props={props} value-format="HH:mm" format="HH:mm" value={this.getPropValue(prop)} onInput={this.handleValueChange(prop)} />
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
      props={props}
      value={this.getPropValue(prop)}
      onChange={this.handleValueChange(prop)}
    />
  }

  renderStaticNestForm({ prop, props }) {
    return <c-static-nest-form
      props={props}
      value={this.getPropValue(prop)}
      onChange={this.handleValueChange(prop)}
    />
  }

  renderVNode({ props }) {
    return <v-node props={props} />
  }

  get formItem() {
    const { form, prop, label } = this.column;
    const formItem = { prop, props: {}, ..._.omit(form, 'component') };
    const { required, rules = [] } = formItem;

    if (_.isFunction(formItem.props)) {
      formItem.props = formItem.props(this.$createElement, { data: this.value, row: this.row });
    }

    const formRules = _.flatten([rules]);
    if (required) {
      if (!formRules.find(item => item.required)) {
        formRules.push({
          required: true,
          message: required === true ? `${label}必填` : required
        });
      }
    }

    return {
      ...formItem,
      label,
      rules: formRules
    };
  }

  render() {
    const renderMap = {
      radioGroup: this.renderRadioGroup,
      checkboxGroup: this.renderCheckboxGroup,
      checkboxButtonGroup: this.renderCheckboxButtonGroup,
      input: this.renderInput,
      textarea: this.renderTextArea,
      inputNumber: this.renderInputNumber,
      select: this.renderSelect,
      switch: this.renderSwitch,
      datePicker: this.renderDatePicker,
      dateTimePicker: this.renderDateTimePicker,
      timePicker: this.renderTimePicker,
      colorPicker: this.renderColorPicker,
      upload: this.renderUpload,
      editor: this.renderEditor,
      nestForm: this.renderNestForm,
      staticNestForm: this.renderStaticNestForm,
      vNode: this.renderVNode
    }

    const { prop, props: { defaultValue, hint } } = this.formItem;
    const { component = 'input', slots = {} } = this.column.form || {};

    if (this.value[prop] === undefined && defaultValue !== undefined) {
      this.handleValueChange(prop, { triggerColumnChange: false })(defaultValue);
    }

    const headerVNode = _.isFunction(slots.header) ? slots.header(this.$createElement, { value: this.value[prop] }) : slots.header;
    const footerVNode = _.isFunction(slots.footer) ? slots.footer(this.$createElement, { value: this.value[prop] }) : slots.footer;

    return (
      <el-form-item class="source-form-item" props={this.formItem}>
        {headerVNode}
        {renderMap[component](this.formItem)}
        {footerVNode}
        {hint && <span class="hint">{ hint }</span>}
      </el-form-item>
    )
  }
}
</script>

