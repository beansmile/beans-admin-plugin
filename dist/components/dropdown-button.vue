<template>
  <div class="button-list" v-if="buttonMode">
    <el-button v-bind="getButtonPropsMerged(button)" v-for="(button, index) in buttons" :key="index" @click="handleCommand(index)">{{ button.text || button.title }}</el-button>
  </div>
  <div class="dropdown-button" v-else>
    <el-dropdown @command="handleCommand" v-if="buttons.length > 1">
      <el-button v-bind="buttonProps">{{ buttonText }}<i class="el-icon-arrow-down el-icon--right" /></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(button, index) in buttons"
          :key="index"
          :command="index"
        >
          {{ button.text || button.title }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-button v-else v-bind="getButtonPropsMerged(button)" v-for="(button, index) in buttons" :key="index" @click="handleCommand(index)">{{ button.text || button.title }}<i class="el-icon-arrow-right el-icon--right" /></el-button>
  </div>
</template>

<script>import _initializerDefineProperty from "@babel/runtime-corejs2/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime-corejs2/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime-corejs2/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

import { Vue, Component, Prop } from 'vue-property-decorator';
import { i18n } from "../i18n";
var DropdownButton = (_dec = Prop({
  type: Array,
  default: function _default() {
    return [];
  }
}), _dec2 = Prop({
  type: Object,
  default: function _default() {
    return {
      type: 'text'
    };
  }
}), _dec3 = Prop({
  type: String,
  default: i18n.t('操作')
}), _dec4 = Prop(Boolean), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(DropdownButton, _Vue);

  function DropdownButton() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DropdownButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DropdownButton)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "buttons", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "buttonProps", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "buttonText", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "buttonMode", _descriptor4, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(DropdownButton, [{
    key: "getButtonPropsMerged",
    value: function getButtonPropsMerged(button) {
      return Object.assign({}, this.buttonProps, button.props);
    }
  }, {
    key: "handleCommand",
    value: function handleCommand(index) {
      var button = this.buttons[index];
      button.handler && button.handler(this.$createElement);
    }
  }]);

  return DropdownButton;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "buttons", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "buttonProps", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "buttonText", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "buttonMode", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { DropdownButton as default };</script>
