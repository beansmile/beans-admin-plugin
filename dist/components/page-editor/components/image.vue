<template>
  <div class="c-image">
    <el-image
      v-for="(item, index) in value.data"
      :key="index"
      :src="item.src"
      fit="cover"
      class="item-image"
    >
      <div slot="error">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <ImageControlBox :visible="showController" :title="$t('pageEditor.图片')" :links="links" :value="value.data" @change="handleChange" @close="$emit('close')" />
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
import _get from "lodash/get";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

import { Vue, Component, Model, Prop } from 'vue-property-decorator';
import ImageControlBox from "../image-control-box";
var CImage = (_dec = Component({
  components: {
    ImageControlBox: ImageControlBox
  }
}), _dec2 = Model('change', {
  type: Object,
  default: function _default() {
    return {
      data: [],
      // { src, link }
      config: {}
    };
  }
}), _dec3 = Prop(Object), _dec4 = Prop(Boolean), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(CImage, _Vue);

  function CImage() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CImage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CImage)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "data", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "showController", _descriptor3, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(CImage, [{
    key: "mounted",
    value: function mounted() {
      this.syncChange();
    }
  }, {
    key: "syncChange",
    value: function syncChange() {
      this.$emit('change', this.value);
    }
  }, {
    key: "handleChange",
    value: function handleChange(data) {
      this.value.data = data;
      this.syncChange();
    }
  }, {
    key: "links",
    get: function get() {
      return _get(this.data, 'links') || [];
    }
  }]);

  return CImage;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "data", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "showController", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { CImage as default };</script>

<style lang="scss" scoped>
  .c-image {
    display: flex;
    align-items: stretch;

    .item-image {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
