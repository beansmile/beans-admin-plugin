<template>
  <div @click="handleShowDialog">
    <slot />
    <el-dialog
      v-if="render"
      :visible="visible"
      :title="title"
      append-to-body
      destroy-on-close
      @close="handleCloseDialog"
      @closed="handleDestroyDialog"
    >
      <SourceForm
        :form="dialogForm"
        :columns="columns"
        @change="handleFormChange"
        @submit="handleSubmit"
        :disabled="loading"
        v-bind="$attrs"
        class="source-form-dialog-v2"
      >
        <template v-slot:action>
          <span />
        </template>
      </SourceForm>
      <template v-slot:footer>
        <el-button type="primary" @click="handleSubmit" :loading="loading">{{ $t('确定')}}</el-button>
        <el-button @click="handleCloseDialog">{{ $t('取消') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>import "regenerator-runtime/runtime";
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

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import SourceForm from "./index";
import { i18n } from "../../i18n";
var SourceFormDialog = (_dec = Component({
  components: {
    SourceForm: SourceForm
  }
}), _dec2 = Prop({
  type: Object,
  default: function _default() {
    return {};
  }
}), _dec3 = Prop(Array), _dec4 = Prop({
  type: String,
  default: ''
}), _dec5 = Prop(Function), _dec6 = Watch('form', {
  immediate: true
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(SourceFormDialog, _Vue);

  function SourceFormDialog() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SourceFormDialog);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SourceFormDialog)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "form", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "columns", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "title", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "submitHander", _descriptor4, _assertThisInitialized(_this));

    _this.loading = false;
    _this.render = true;
    _this.visible = false;
    _this.dialogForm = {};
    return _this;
  }

  _createClass(SourceFormDialog, [{
    key: "handleShowDialog",
    value: function handleShowDialog() {
      this.visible = true;
    }
  }, {
    key: "handleCloseDialog",
    value: function handleCloseDialog() {
      this.visible = false;
    }
  }, {
    key: "handleFormChange",
    value: function handleFormChange(form) {
      this.dialogForm = form;
    }
  }, {
    key: "handleDestroyDialog",
    value: function () {
      var _handleDestroyDialog = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.render = false;
                _context.next = 3;
                return this.$nextTick();

              case 3:
                this.render = true;

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleDestroyDialog() {
        return _handleDestroyDialog.apply(this, arguments);
      }

      return handleDestroyDialog;
    }()
  }, {
    key: "handleSubmit",
    value: function () {
      var _handleSubmit = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.submitHander) {
                  _context2.next = 8;
                  break;
                }

                this.loading = true;
                _context2.prev = 2;
                _context2.next = 5;
                return this.submitHander(JSON.parse(JSON.stringify(this.dialogForm)));

              case 5:
                _context2.prev = 5;
                this.loading = false;
                return _context2.finish(5);

              case 8:
                this.visible = false;

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2,, 5, 8]]);
      }));

      function handleSubmit() {
        return _handleSubmit.apply(this, arguments);
      }

      return handleSubmit;
    }()
  }, {
    key: "onFormChange",
    value: function onFormChange(form) {
      if (form) {
        this.dialogForm = JSON.parse(JSON.stringify(form));
      }
    }
  }]);

  return SourceFormDialog;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "form", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "columns", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "submitHander", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "onFormChange", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "onFormChange"), _class2.prototype)), _class2)) || _class);
export { SourceFormDialog as default };
export var createSourceFormDialogV2 = function createSourceFormDialogV2(props) {
  var instance = new SourceFormDialog({
    i18n: i18n,
    propsData: props
  });
  instance.$mount();
  instance.handleShowDialog();
};</script>
