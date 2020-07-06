<template>
  <el-form
    :model="form"
    label-position='left'
    label-width='auto'
    v-bind="$attrs"
    class="c-source-form-v2"
    ref="source-form-v2"
    v-loading="loading"
    @submit.native.prevent="handleSubmit"
  >
    <slot name="form-header"></slot>
    <div class="form-content">
      <slot name="content-header"></slot>

      <div class="form-group" v-for="formGroup in formColumnGroups" :key="formGroup.title">
        <h3 class="form-group-title" v-if="formGroup.title">{{ formGroup.title }}</h3>
        <div class="form-group-content">
          <el-form-item
            v-bind="formItem.itemProps"
            v-for="formItem in formGroup.columns"
            :key="formItem.prop"
          >
            <v-node :render-node="() => renderVNode(formItem.itemSlots.header, formItem.prop)" v-if="formItem.itemSlots.header" />
            <component
              :is="formItem.component"
              v-bind="formItem.props"
              :value="getFormItemValue(formItem.prop)"
              @input="setFormItemValue(formItem.prop, $event)"
              @change="setFormItemValue(formItem.prop, $event)"
              @refsChange="handleRefsChange(formItem, $event)"
              v-on="formItem.events"
            >
              <template v-for="(slotValue, slotName) in formItem.slots" v-slot:[slotName]>
                <v-node :key="slotName" :render-node="() => renderVNode(slotValue, formItem.prop)" />
              </template>
            </component>
            <div class="form-item-hint" v-if="formItem.props.hint">
              <v-node :render-node="() => renderVNode(formItem.props.hint, formItem.prop)" />
            </div>
            <v-node :render-node="() => renderVNode(formItem.itemSlots.footer, formItem.prop)" v-if="formItem.itemSlots.footer" />
          </el-form-item>
        </div>
      </div>
      <slot name="content-footer"></slot>
    </div>
    <slot name="action">
      <div class="form-action">
        <el-button type="primary" @click="handleSubmit">{{ $t('确定') }}</el-button>
      </div>
    </slot>
  </el-form>
</template>

<script>import "core-js/modules/es7.object.get-own-property-descriptors";
import "core-js/modules/es6.object.keys";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.string.iterator";
import "regenerator-runtime/runtime";
import _asyncToGenerator from "@babel/runtime-corejs2/helpers/esm/asyncToGenerator";
import _defineProperty from "@babel/runtime-corejs2/helpers/esm/defineProperty";
import _initializerDefineProperty from "@babel/runtime-corejs2/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime-corejs2/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime-corejs2/helpers/esm/initializerWarningHelper";
import _isObject from "lodash/isObject";
import _isFunction from "lodash/isFunction";
import _set from "lodash/set";
import _get from "lodash/get";

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Vue, Component, Model, Prop } from 'vue-property-decorator';
import { loadingService } from "../../services";
var SourceFormV2 = (_dec = Model('change', {
  type: Object
}), _dec2 = Prop(Array), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(SourceFormV2, _Vue);

  function SourceFormV2() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SourceFormV2);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SourceFormV2)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "form", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "columns", _descriptor2, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(SourceFormV2, [{
    key: "transformFormColumn",
    value: function transformFormColumn(column) {
      var formItem = _objectSpread({
        itemSlots: {},
        itemProps: {},
        slots: {},
        events: {},
        props: {}
      }, column);

      if (!_get(formItem, 'itemProps.rules.length') && formItem.required) {
        _set(formItem, 'itemProps.rules', {
          required: true,
          message: "".concat(formItem.label, "\u5FC5\u586B"),
          trigger: 'blur'
        });
      }

      Object.assign(formItem.itemProps, {
        label: column.label,
        prop: column.prop
      });
      return formItem;
    }
  }, {
    key: "getPureForm",
    value: function getPureForm() {
      return JSON.parse(JSON.stringify(this.form));
    }
  }, {
    key: "getFormItemValue",
    value: function getFormItemValue(prop) {
      return _get(this.form, prop);
    }
  }, {
    key: "setFormItemValue",
    value: function setFormItemValue(prop, value) {
      if (this.getFormItemValue(prop) !== value) {
        var form = this.getPureForm();
        this.$emit('change', _set(form, prop, value));
      }
    }
  }, {
    key: "renderVNode",
    value: function renderVNode(node, prop) {
      var h = this.$createElement;

      if (_isFunction(node)) {
        return node(this.$createElement, {
          form: this.getPureForm(),
          value: this.getFormItemValue(prop)
        });
      }

      if (_isObject(node)) {
        // TODO 这块的渲染饶了一圈
        return new Vue(node).$mount()._vnode;
      }

      return h("span", [node]);
    }
  }, {
    key: "validate",
    value: function validate() {
      if (this.$refs['source-form-v2']) {
        return this.$refs['source-form-v2'].validate();
      }
    }
  }, {
    key: "handleRefsChange",
    value: function handleRefsChange(formItem, $event) {
      _set(this, "formRefs.".concat(formItem.prop), $event);
    }
  }, {
    key: "handleSubmit",
    value: function () {
      var _handleSubmit = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        var validateChild;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                validateChild =
                /*#__PURE__*/
                function () {
                  var _ref = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee() {
                    var promises, attr;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (_this2.formRefs) {
                              _context.next = 2;
                              break;
                            }

                            return _context.abrupt("return");

                          case 2:
                            promises = [];

                            for (attr in _this2.formRefs) {
                              promises.push(Promise.all(_this2.formRefs[attr].map(function (formRef) {
                                if (formRef && formRef.validate) {
                                  return formRef.validate();
                                }
                              })));
                            }

                            return _context.abrupt("return", Promise.all(promises));

                          case 5:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function validateChild() {
                    return _ref.apply(this, arguments);
                  };
                }();

                _context2.next = 3;
                return Promise.all([this.validate(), validateChild()]);

              case 3:
                this.$emit('submit', this.getPureForm());

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleSubmit() {
        return _handleSubmit.apply(this, arguments);
      }

      return handleSubmit;
    }()
  }, {
    key: "loading",
    get: function get() {
      return loadingService.state.count > 0;
    }
  }, {
    key: "formColumnGroups",
    get: function get() {
      var _this3 = this;

      var isGroupMode = !!_get(this.columns, '0.columns');

      if (isGroupMode) {
        return this.columns.map(function (columnGroup) {
          return _objectSpread({}, columnGroup, {
            columns: columnGroup.columns.map(_this3.transformFormColumn)
          });
        });
      }

      return [{
        title: '',
        columns: this.columns.map(this.transformFormColumn)
      }];
    }
  }]);

  return SourceFormV2;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "form", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "columns", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { SourceFormV2 as default };</script>
