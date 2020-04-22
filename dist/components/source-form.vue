<template>
  <el-form
    v-bind="formProps"
    class="c-source-form"
    v-loading="loading || loadingService.state.count > 0"
    :model="formData"
    ref="source-form"
  >
    <div class="content">
      <slot name="header" />
      <c-source-form-item
        v-for="column in editColumns"
        :key="column.prop"
        :column="column"
        :row="data"
        v-model="formData"
        @change="handleChange"
      />
      <slot />
    </div>
    <el-form-item class="btn-group">
      <el-button type="primary" @click="onSubmit('source-form')">{{ $t('确定') }}</el-button>
      <el-button @click="$emit('cancel')" v-if="showCancelButton">{{ $t('取消') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>import "core-js/modules/es7.object.get-own-property-descriptors";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.object.keys";
import _initializerDefineProperty from "@babel/runtime-corejs2/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime-corejs2/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime-corejs2/helpers/esm/initializerWarningHelper";
import "regenerator-runtime/runtime";
import _asyncToGenerator from "@babel/runtime-corejs2/helpers/esm/asyncToGenerator";
import _defineProperty from "@babel/runtime-corejs2/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime-corejs2/helpers/esm/objectWithoutProperties";
import _noop from "lodash/noop";
import _pick from "lodash/pick";
import _get from "lodash/get";
import _merge from "lodash/merge";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import { i18n } from "../i18n";
import { loadingService } from "../services";
import { createDialog } from "../utils";
var SourceForm = (_dec = Prop({
  type: Array,
  default: function _default() {
    return [];
  }
}), _dec2 = Prop({
  type: Object,
  default: function _default() {
    return {};
  }
}), _dec3 = Prop({
  type: Boolean,
  default: false
}), _dec4 = Emit('submit'), _dec5 = Emit('change'), _dec6 = Watch('data', {
  immediate: true
}), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(SourceForm, _Vue);

  function SourceForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SourceForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SourceForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "columns", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "data", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "showCancelButton", _descriptor3, _assertThisInitialized(_this));

    _this.loadingService = loadingService;
    _this.loading = false;
    _this.formData = {};
    return _this;
  }

  _createClass(SourceForm, [{
    key: "onSubmit",
    value: function () {
      var _onSubmit = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(formName) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.$refs[formName].validate();

              case 2:
                return _context2.abrupt("return", JSON.parse(JSON.stringify(this.formData)));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onSubmit(_x2) {
        return _onSubmit.apply(this, arguments);
      }

      return onSubmit;
    }()
  }, {
    key: "handleChange",
    value: function handleChange(data) {
      return data;
    }
  }, {
    key: "onDataChange",
    value: function onDataChange(val) {
      if (val) {
        this.formData = _pick(this.data, this.editColumns.map(function (column) {
          return column.prop;
        }));
      }
    }
  }, {
    key: "formProps",
    get: function get() {
      return _merge({}, {
        'label-position': 'left',
        'label-width': 'auto'
      }, this.$attrs);
    }
  }, {
    key: "editColumns",
    get: function get() {
      return this.columns.filter(function (item) {
        return _get(item, 'form.component');
      });
    }
  }]);

  return SourceForm;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "columns", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "data", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "showCancelButton", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "onSubmit", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "onSubmit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleChange", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "handleChange"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onDataChange", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "onDataChange"), _class2.prototype)), _class2)) || _class);
export { SourceForm as default };
export var createSourceFormDialog = function createSourceFormDialog(h) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? i18n.t('弹窗') : _ref$title,
      _ref$columns = _ref.columns,
      columns = _ref$columns === void 0 ? [] : _ref$columns,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? {} : _ref$data,
      onConfirm = _ref.onConfirm,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? _noop : _ref$onChange,
      onClose = _ref.onClose,
      opts = _objectWithoutProperties(_ref, ["title", "columns", "data", "onConfirm", "onChange", "onClose"]);

  var sourceFormComponent = h(SourceForm, {
    "attrs": {
      "showCancelButton": true,
      "columns": columns,
      "data": data
    }
  });
  var slots = {
    default: sourceFormComponent
  };

  var props = _objectSpread({
    title: title,
    top: '0'
  }, opts, {
    customClass: "source-form-dialog ".concat(opts.customClass || '')
  });

  var events = {
    close: function close(instance) {
      instance.visible = false;
      onClose && onClose();
    },
    opened: function opened(instance) {
      var componentInstance = sourceFormComponent.componentInstance;
      componentInstance.$on('cancel', function () {
        instance.visible = false;
        onClose && onClose();
      });
      componentInstance.$on('change', onChange);
      componentInstance.$on('submit',
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(data) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!onConfirm) {
                    _context.next = 8;
                    break;
                  }

                  componentInstance.loading = true;
                  _context.prev = 2;
                  _context.next = 5;
                  return onConfirm(data);

                case 5:
                  _context.prev = 5;
                  componentInstance.loading = false;
                  return _context.finish(5);

                case 8:
                  instance.visible = false;

                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[2,, 5, 8]]);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  };
  return createDialog({
    slots: slots,
    props: props,
    events: events
  });
};</script>
