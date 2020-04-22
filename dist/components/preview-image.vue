<template>
  <el-image
    v-bind="{
      src: current,
      previewSrcList: [current],
      ...$attrs
    }"
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

var _dec, _class, _class2, _descriptor, _temp;

import { Vue, Component, Prop } from 'vue-property-decorator';
var PreviewImage = (_dec = Prop(String), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(PreviewImage, _Vue);

  function PreviewImage() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PreviewImage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PreviewImage)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "current", _descriptor, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(PreviewImage, [{
    key: "created",
    value: function created() {
      console.warn('<c-preview-image />已废弃， 请使用 <el-image /> https://element.eleme.cn/#/zh-CN/component/image');
    }
  }]);

  return PreviewImage;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "current", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { PreviewImage as default };</script>
