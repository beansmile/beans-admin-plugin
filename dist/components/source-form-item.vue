<script>import "core-js/modules/es7.object.get-own-property-descriptors";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.object.keys";
import "core-js/modules/es6.array.find";
import _mergeJSXProps21 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps20 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps19 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps18 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps17 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps16 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps15 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps14 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps13 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps12 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps11 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps10 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps9 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps8 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps7 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps6 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps5 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps4 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps3 from "@vue/babel-helper-vue-jsx-merge-props";
import _defineProperty from "@babel/runtime-corejs2/helpers/esm/defineProperty";
import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime-corejs2/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime-corejs2/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime-corejs2/helpers/esm/initializerWarningHelper";
import _omit from "lodash/omit";
import _clone from "lodash/clone";
import _isFunction from "lodash/isFunction";
import _set from "lodash/set";
import _mergeWith from "lodash/mergeWith";
import _get from "lodash/get";
import _isArray from "lodash/isArray";
import _flatten from "lodash/flatten";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import Select from "./select.vue";

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

function getDate(val) {
  if (!val) return val;

  var dateArr = _flatten([val]).map(function (item) {
    if (!item) {
      return item;
    }

    var date = new Date(item);
    return isValidDate(date) ? date : new Date();
  });

  return _isArray(val) ? dateArr : dateArr[0];
}

var SourceFormItem = (_dec = Prop(Object), _dec2 = Prop(Object), _dec3 = Prop({
  type: Boolean,
  default: true
}), _dec4 = Model('change', {
  type: Object
}), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(SourceFormItem, _Vue);

  function SourceFormItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SourceFormItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SourceFormItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "column", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "row", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "inForm", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "value", _descriptor4, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(SourceFormItem, [{
    key: "getPropValue",
    value: function getPropValue(prop) {
      return _get(this.value, prop);
    }
  }, {
    key: "handleValueChange",
    value: function handleValueChange(prop) {
      var _this2 = this;

      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$triggerColumnCha = _ref.triggerColumnChange,
          triggerColumnChange = _ref$triggerColumnCha === void 0 ? true : _ref$triggerColumnCha;

      return function (val) {
        var newValue = _mergeWith({}, _this2.value, _set({}, prop, val), function (objValue, srcValue) {
          if (_isArray(objValue)) {
            return srcValue;
          }
        });

        _this2.$emit('change', newValue);

        if (triggerColumnChange) {
          var _ref2 = _this2.formItem.events || {},
              change = _ref2.change;

          _isFunction(change) && change(newValue[prop]);
        }
      };
    }
  }, {
    key: "handleInputNumberChange",
    value: function handleInputNumberChange(prop, min) {
      var _this3 = this;

      return function (val) {
        return _this3.handleValueChange(prop)(val || min);
      };
    }
  }, {
    key: "renderRadioGroup",
    value: function renderRadioGroup(_ref3) {
      var prop = _ref3.prop,
          props = _ref3.props;
      var h = this.$createElement;
      return h("el-radio-group", _mergeJSXProps([{}, {
        "props": props
      }, {
        "attrs": {
          "value": this.getPropValue(prop)
        },
        "on": {
          "input": this.handleValueChange(prop)
        }
      }]), [props.radios.map(function (radio) {
        return h("el-radio", _mergeJSXProps2([{}, {
          "props": radio
        }, {
          "key": radio.label
        }]), [radio.title]);
      })]);
    }
  }, {
    key: "renderCheckboxGroup",
    value: function renderCheckboxGroup(_ref4) {
      var prop = _ref4.prop,
          props = _ref4.props;
      var h = this.$createElement;
      return h("el-checkbox-group", {
        "props": _objectSpread({}, props),
        "attrs": {
          "value": this.getPropValue(prop) || []
        },
        "on": {
          "input": this.handleValueChange(prop)
        }
      }, [props.checkboxs.map(function (checkbox) {
        var newProps = _clone(checkbox);

        var id = newProps.id;

        if (id) {
          newProps.id = String(id);
        } // id 必须是string类型


        return h("el-checkbox", _mergeJSXProps3([{}, {
          "props": newProps
        }, {
          "key": checkbox.label
        }]), [checkbox.title]);
      })]);
    }
  }, {
    key: "renderCheckboxButtonGroup",
    value: function renderCheckboxButtonGroup(_ref5) {
      var prop = _ref5.prop,
          props = _ref5.props;
      var h = this.$createElement;
      return h("el-checkbox-group", {
        "props": _objectSpread({}, props),
        "attrs": {
          "value": this.getPropValue(prop)
        },
        "on": {
          "input": this.handleValueChange(prop)
        }
      }, [props.checkboxs.map(function (checkbox) {
        return h("el-checkbox-button", _mergeJSXProps4([{}, {
          "props": checkbox
        }, {
          "key": checkbox.label
        }]), [checkbox.title]);
      })]);
    }
  }, {
    key: "renderInput",
    value: function renderInput(_ref6) {
      var prop = _ref6.prop,
          props = _ref6.props;
      var h = this.$createElement;
      return h("el-input", _mergeJSXProps5([{}, {
        "attrs": props
      }, {}, {
        "props": props
      }, {
        "attrs": {
          "rows": props.rows,
          "value": this.getPropValue(prop)
        },
        "on": {
          "input": this.handleValueChange(prop)
        }
      }]));
    }
  }, {
    key: "renderTextArea",
    value: function renderTextArea(_ref7) {
      var prop = _ref7.prop,
          props = _ref7.props;
      var h = this.$createElement;
      return h("el-input", _mergeJSXProps6([{}, {
        "attrs": props
      }, {}, {
        "props": props
      }, {
        "attrs": {
          "type": "textarea",
          "value": this.getPropValue(prop)
        },
        "on": {
          "input": this.handleValueChange(prop)
        }
      }]));
    }
  }, {
    key: "renderInputNumber",
    value: function renderInputNumber(_ref8) {
      var prop = _ref8.prop,
          props = _ref8.props;
      var h = this.$createElement;

      var componentProps = _objectSpread({
        max: 2147483647,
        min: 0
      }, props);

      var propValue = this.getPropValue(prop);
      var value = propValue ? +propValue : propValue;
      return h("el-input-number", _mergeJSXProps7([{}, {
        "props": componentProps
      }, {
        "attrs": {
          "value": value
        },
        "on": {
          "change": this.handleInputNumberChange(prop, componentProps.min)
        }
      }]));
    }
  }, {
    key: "renderSelect",
    value: function renderSelect(_ref9) {
      var prop = _ref9.prop,
          props = _ref9.props;
      var h = this.$createElement;
      return h(Select, _mergeJSXProps8([{}, {
        "props": props
      }, {}, {
        "attrs": props
      }, {
        "attrs": {
          "value": this.getPropValue(prop)
        },
        "on": {
          "change": this.handleValueChange(prop)
        }
      }]));
    }
  }, {
    key: "renderSwitch",
    value: function renderSwitch(_ref10) {
      var prop = _ref10.prop,
          props = _ref10.props;
      var h = this.$createElement;
      return h("el-switch", _mergeJSXProps9([{}, {
        "props": props
      }, {
        "attrs": {
          "value": this.getPropValue(prop)
        },
        "on": {
          "change": this.handleValueChange(prop)
        }
      }]));
    }
  }, {
    key: "renderDatePicker",
    value: function renderDatePicker(_ref11) {
      var prop = _ref11.prop,
          props = _ref11.props;
      var h = this.$createElement;
      var value = getDate(this.getPropValue(prop)); // 文档上的change事件不会触发

      return h("el-date-picker", _mergeJSXProps10([{
        "attrs": {
          "format": "yyyy-MM-dd",
          "value-format": "yyyy-MM-dd"
        }
      }, {
        "props": props
      }, {
        "attrs": {
          "value": value
        },
        "on": {
          "input": this.handleValueChange(prop)
        }
      }]));
    }
  }, {
    key: "renderDateTimePicker",
    value: function renderDateTimePicker(_ref12) {
      var prop = _ref12.prop,
          props = _ref12.props;
      var h = this.$createElement;
      var value = getDate(this.getPropValue(prop));
      return h("el-date-picker", _mergeJSXProps11([{}, {
        "props": props
      }, {
        "attrs": {
          "value": value,
          "type": "datetime",
          "placeholder": this.$t('选择日期时间')
        },
        "on": {
          "input": this.handleValueChange(prop)
        }
      }]));
    }
  }, {
    key: "renderTimePicker",
    value: function renderTimePicker(_ref13) {
      var prop = _ref13.prop,
          props = _ref13.props;
      var h = this.$createElement;
      return h("el-time-picker", _mergeJSXProps12([{}, {
        "props": props
      }, {
        "attrs": {
          "value-format": "HH:mm",
          "format": "HH:mm",
          "value": this.getPropValue(prop)
        },
        "on": {
          "input": this.handleValueChange(prop)
        }
      }]));
    }
  }, {
    key: "renderColorPicker",
    value: function renderColorPicker(_ref14) {
      var prop = _ref14.prop,
          props = _ref14.props;
      var h = this.$createElement;
      return h("el-color-picker", _mergeJSXProps13([{}, {
        "props": props
      }, {
        "attrs": {
          "value": this.getPropValue(prop)
        },
        "on": {
          "change": this.handleValueChange(prop)
        }
      }]));
    }
  }, {
    key: "renderUpload",
    value: function renderUpload(_ref15) {
      var prop = _ref15.prop,
          props = _ref15.props;
      var h = this.$createElement;
      return h("c-upload-form-item", _mergeJSXProps14([{}, {
        "attrs": props
      }, {}, {
        "props": props
      }, {
        "attrs": {
          "value": this.getPropValue(prop)
        },
        "on": {
          "change": this.handleValueChange(prop)
        }
      }]));
    }
  }, {
    key: "renderEditor",
    value: function renderEditor(_ref16) {
      var prop = _ref16.prop,
          props = _ref16.props;
      var h = this.$createElement;
      return h("c-editor", _mergeJSXProps15([{}, {
        "props": props
      }, {
        "attrs": {
          "value": this.getPropValue(prop)
        },
        "on": {
          "change": this.handleValueChange(prop)
        }
      }]));
    }
  }, {
    key: "renderNestForm",
    value: function renderNestForm(_ref17) {
      var prop = _ref17.prop,
          props = _ref17.props;
      var h = this.$createElement;
      return h("c-nest-form", _mergeJSXProps16([{}, {
        "props": props
      }, {
        "attrs": {
          "value": this.getPropValue(prop)
        },
        "on": {
          "change": this.handleValueChange(prop)
        }
      }]));
    }
  }, {
    key: "renderStaticNestForm",
    value: function renderStaticNestForm(_ref18) {
      var prop = _ref18.prop,
          props = _ref18.props;
      var h = this.$createElement;
      return h("c-static-nest-form", _mergeJSXProps17([{}, {
        "props": props
      }, {
        "attrs": {
          "value": this.getPropValue(prop)
        },
        "on": {
          "change": this.handleValueChange(prop)
        }
      }]));
    }
  }, {
    key: "renderVNode",
    value: function renderVNode(_ref19) {
      var props = _ref19.props;
      var h = this.$createElement;
      return h("v-node", _mergeJSXProps18([{}, {
        "props": props
      }]));
    }
  }, {
    key: "renderCascader",
    value: function renderCascader(_ref20) {
      var prop = _ref20.prop,
          props = _ref20.props;
      var h = this.$createElement;
      return h("el-cascader", _mergeJSXProps19([{}, {
        "props": props
      }, {
        "attrs": {
          "value": this.getPropValue(prop)
        },
        "on": {
          "change": this.handleValueChange(prop)
        }
      }]));
    }
  }, {
    key: "renderListSelect",
    value: function renderListSelect(_ref21) {
      var prop = _ref21.prop,
          props = _ref21.props;
      var h = this.$createElement;
      return h("c-list-select", _mergeJSXProps20([{}, {
        "props": props
      }, {
        "attrs": {
          "value": this.getPropValue(prop)
        },
        "on": {
          "change": this.handleValueChange(prop)
        }
      }]));
    }
  }, {
    key: "render",
    value: function render() {
      var h = arguments[0];
      var renderMap = {
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
        vNode: this.renderVNode,
        cascader: this.renderCascader,
        listSelect: this.renderListSelect
      };
      var _this$formItem = this.formItem,
          prop = _this$formItem.prop,
          _this$formItem$props = _this$formItem.props,
          defaultValue = _this$formItem$props.defaultValue,
          hint = _this$formItem$props.hint;

      var _ref22 = this.column.form || {},
          _ref22$component = _ref22.component,
          component = _ref22$component === void 0 ? 'input' : _ref22$component,
          _ref22$slots = _ref22.slots,
          slots = _ref22$slots === void 0 ? {} : _ref22$slots;

      if (this.value[prop] === undefined && defaultValue !== undefined) {
        this.handleValueChange(prop, {
          triggerColumnChange: false
        })(defaultValue);
      }

      var headerVNode = _isFunction(slots.header) ? slots.header(this.$createElement, {
        value: this.value[prop]
      }) : slots.header;
      var footerVNode = _isFunction(slots.footer) ? slots.footer(this.$createElement, {
        value: this.value[prop]
      }) : slots.footer;
      var className = 'source-form-item';

      if (this.formItem.className) {
        className += " ".concat(this.formItem.className);
      }

      if (this.inForm) {
        return h("el-form-item", _mergeJSXProps21([{
          "class": className
        }, {
          "props": this.formItem
        }]), [headerVNode, renderMap[component](this.formItem), footerVNode, hint && h("span", {
          "class": "hint"
        }, [hint])]);
      }

      return renderMap[component](this.formItem);
    }
  }, {
    key: "formItem",
    get: function get() {
      var _this$column = this.column,
          form = _this$column.form,
          prop = _this$column.prop,
          label = _this$column.label;

      var formItem = _objectSpread({
        prop: prop,
        props: {}
      }, _omit(form, 'component'));

      var required = formItem.required,
          _formItem$rules = formItem.rules,
          rules = _formItem$rules === void 0 ? [] : _formItem$rules;

      if (_isFunction(formItem.props)) {
        formItem.props = formItem.props(this.$createElement, {
          data: this.value,
          row: this.row
        });
      }

      var formRules = _flatten([rules]);

      if (required) {
        if (!formRules.find(function (item) {
          return item.required;
        })) {
          formRules.push({
            required: true,
            message: required === true ? this.$t('必填提示', {
              label: label
            }) : required
          });
        }
      }

      return _objectSpread({}, formItem, {
        label: label,
        rules: formRules
      });
    }
  }]);

  return SourceFormItem;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "column", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "row", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "inForm", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { SourceFormItem as default };</script>

