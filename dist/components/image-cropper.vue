<template>
  <div class="c-image-cropper" v-loading="loading">
    <div class="content">
      <img class="image" :src="img" ref="img" />
    </div>
    <el-row class="btn-group">
      <el-button @click="handleReset" size="medium">重置</el-button>
      <el-button type="primary" @click="handleSave" size="medium">确定</el-button>
    </el-row>
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
import "core-js/modules/es6.number.constructor";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

import { Vue, Component, Prop } from 'vue-property-decorator';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
var ImageCropper = (_dec = Prop(String), _dec2 = Prop(Boolean), _dec3 = Prop({
  type: Number,
  default: 200
}), _dec4 = Prop({
  type: Number,
  default: 200
}), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(ImageCropper, _Vue);

  function ImageCropper() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ImageCropper);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ImageCropper)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "img", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "loading", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "width", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "height", _descriptor4, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(ImageCropper, [{
    key: "mounted",
    value: function mounted() {
      var defaultConfig = {
        aspectRatio: this.width / this.height,
        responsive: true
      };
      this.cropper = new Cropper(this.$refs.img, Object.assign(defaultConfig, this.$attrs));
    }
  }, {
    key: "beforeDestroy",
    value: function beforeDestroy() {
      this.cropper && this.cropper.destroy();
    }
  }, {
    key: "handleSave",
    value: function handleSave() {
      var _this2 = this;

      var config = {
        imageSmoothingQuality: 'high',
        width: this.width,
        height: this.height
      };
      this.cropper.getCroppedCanvas(config).toBlob(function (blob) {
        _this2.$emit('change', blob);
      });
    }
  }, {
    key: "handleReset",
    value: function handleReset() {
      this.cropper.reset();
    }
  }]);

  return ImageCropper;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "img", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "loading", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "width", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "height", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { ImageCropper as default };</script>
