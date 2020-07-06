<template>
  <div class="nest-form-v2">
    <div class="nest-form-group" v-for="(group, index) in formGroup" :key="index">
      <SourceForm
        v-bind="$attrs"
        :form="group"
        :columns="columns"
        @change="handleGroupChange(index, $event)"
        ref="source-form"
      >
        <template v-slot:form-header>
          <i class="el-icon-delete btn-delete" @click="handleDelete(index)"></i>
        </template>
        <template v-slot:action>
          <span />
        </template>
      </SourceForm>
    </div>
    <el-button
      type="primary"
      size="small"
      @click="handleAdd"
      icon="el-icon-plus"
    >{{ $t('添加') }}</el-button>
  </div>
</template>

<script>import "core-js/modules/es7.object.get-own-property-descriptors";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.object.keys";
import _defineProperty from "@babel/runtime-corejs2/helpers/esm/defineProperty";
import "regenerator-runtime/runtime";
import _asyncToGenerator from "@babel/runtime-corejs2/helpers/esm/asyncToGenerator";
import _initializerDefineProperty from "@babel/runtime-corejs2/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime-corejs2/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime-corejs2/helpers/esm/initializerWarningHelper";
import "core-js/modules/es6.number.constructor";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Vue, Component, Model, Prop } from 'vue-property-decorator';
import SourceForm from "./index";
var NestForm = (_dec = Component({
  components: {
    SourceForm: SourceForm
  }
}), _dec2 = Model('change', {
  type: Array,
  default: function _default() {
    return [];
  }
}), _dec3 = Prop({
  type: Array,
  default: function _default() {
    return [];
  }
}), _dec4 = Prop({
  type: [String, Number],
  default: 'id'
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(NestForm, _Vue);

  function NestForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, NestForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(NestForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "columns", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "destroyTrackBy", _descriptor3, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(NestForm, [{
    key: "mounted",
    value: function mounted() {
      this.syncSourceFormRefs();
    }
  }, {
    key: "syncSourceFormRefs",
    value: function syncSourceFormRefs() {
      this.$emit('refsChange', this.$refs['source-form']);
    }
  }, {
    key: "getPureValue",
    value: function getPureValue() {
      return JSON.parse(JSON.stringify(this.value));
    }
  }, {
    key: "handleGroupChange",
    value: function handleGroupChange(index, data) {
      var value = this.getPureValue();
      value[index] = data;
      this.$emit('change', value);
    }
  }, {
    key: "handleAdd",
    value: function () {
      var _handleAdd = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.$emit('change', this.value.concat({}));
                _context.next = 3;
                return this.$nextTick();

              case 3:
                this.syncSourceFormRefs();

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleAdd() {
        return _handleAdd.apply(this, arguments);
      }

      return handleAdd;
    }()
  }, {
    key: "handleDelete",
    value: function () {
      var _handleDelete = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(index) {
        var value;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                value = this.getPureValue();

                if (value[index][this.destroyTrackBy]) {
                  value[index] = _objectSpread({}, value[index], {
                    _destroy: true
                  });
                } else {
                  value.splice(index, 1);
                }

                this.$emit('change', value);
                _context2.next = 5;
                return this.$nextTick();

              case 5:
                this.syncSourceFormRefs();

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleDelete(_x) {
        return _handleDelete.apply(this, arguments);
      }

      return handleDelete;
    }()
  }, {
    key: "formGroup",
    // 根据判断数据中有没有trackBy字段，删除后添加_destroy标识
    get: function get() {
      return this.value.filter(function (item) {
        return !item._destroy;
      });
    }
  }]);

  return NestForm;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "columns", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "destroyTrackBy", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { NestForm as default };</script>
