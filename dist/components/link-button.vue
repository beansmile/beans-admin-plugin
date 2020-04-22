<template>
  <c-router-link :to="to" v-bind="linkProps">
    <el-button v-bind="buttonProps" style="white-space:normal;"><slot /></el-button>
  </c-router-link>
</template>

<script>import _initializerDefineProperty from "@babel/runtime-corejs2/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime-corejs2/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime-corejs2/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

import { Vue, Component, Prop } from 'vue-property-decorator';
var LinkButton = (_dec = Prop([Object, String]), _dec2 = Prop(Object), _dec3 = Prop({
  type: Object,
  default: function _default() {
    return {
      type: 'text'
    };
  }
}), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(LinkButton, _Vue);

  function LinkButton() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, LinkButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LinkButton)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "to", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "linkProps", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "buttonProps", _descriptor3, _assertThisInitialized(_this));

    return _this;
  }

  return LinkButton;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "to", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "linkProps", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "buttonProps", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { LinkButton as default };</script>
