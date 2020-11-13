<template>
  <el-input
    v-model="inputValue"
    @change="handleChange"
    v-bind="$attrs"
  />
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
import "core-js/modules/es6.number.constructor";

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _temp;

import { Vue, Component, Watch, Model, Emit } from 'vue-property-decorator';
var AdminUncontrolledInput = (_dec = Model('change', {
  type: [Number, String]
}), _dec2 = Emit('change'), _dec3 = Watch('value', {
  immediate: true
}), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(AdminUncontrolledInput, _Vue);

  function AdminUncontrolledInput() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AdminUncontrolledInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AdminUncontrolledInput)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this));

    _this.inputValue = '';
    return _this;
  }

  _createClass(AdminUncontrolledInput, [{
    key: "handleChange",
    value: function handleChange() {
      return this.inputValue;
    }
  }, {
    key: "onValueChange",
    value: function onValueChange(val) {
      this.inputValue = val;
    }
  }]);

  return AdminUncontrolledInput;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "handleChange", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "handleChange"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onValueChange", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "onValueChange"), _class2.prototype)), _class2)) || _class);
export { AdminUncontrolledInput as default };</script>
