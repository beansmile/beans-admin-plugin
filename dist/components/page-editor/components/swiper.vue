<template>
  <div class="c-swiper">
    <el-carousel
      trigger="click"
      :height="value.config.height + 'px'"
      :autoplay="value.config.autoplay"
      :interval="value.config.interval"
      arrow="never"
    >
      <el-carousel-item v-for="(item, index) in value.data" :key="index">
        <img :src="item.src" className="item-image" style="width: 100%; height: 100%; object-fit: cover" />
      </el-carousel-item>
    </el-carousel>

    <ImageControlBox :visible="showController" title="轮播图" :links="links" v-model="value.data" @change="syncChange" @close="$emit('close')">
      <el-form @submit.native.prevent>
        <el-form-item label="轮播图高度">
          <el-input-number v-model="value.config.height" @change="syncChange" />
        </el-form-item>
        <el-form-item label="是否显示面板指示点">
          <el-switch v-model="value.config.indicatorDots" @change="syncChange" />
          <small>（无预览效果）</small>
        </el-form-item>
        <el-form-item label="指示点颜色">
          <el-color-picker show-alpha v-model="value.config.indicatorColor" @change="syncChange"></el-color-picker>
          <small>（无预览效果）</small>
        </el-form-item>
        <el-form-item label="当前选中的指示点颜色">
          <el-color-picker show-alpha v-model="value.config.indicatorActiveColor" @change="syncChange"></el-color-picker>
          <small>（无预览效果）</small>
        </el-form-item>
        <el-form-item label="是否自动切换">
          <el-switch v-model="value.config.autoplay" @change="syncChange" />
        </el-form-item>
        <el-form-item label="自动切换时间间隔(毫秒)">
          <el-input-number v-model="value.config.interval" @change="syncChange" />
          <small>（无预览效果）</small>
        </el-form-item>
        <el-form-item label="滑动动画时长(毫秒)">
          <el-input-number v-model="value.config.duration" @change="syncChange" />
          <small>（无预览效果）</small>
        </el-form-item>
        <el-form-item label="是否采用衔接滑动">
          <el-switch v-model="value.config.circular" @change="syncChange" />
          <small>（无预览效果）</small>
        </el-form-item>
      </el-form>
    </ImageControlBox>
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
var Swiper = (_dec = Component({
  components: {
    ImageControlBox: ImageControlBox
  }
}), _dec2 = Model('change', {
  type: Object,
  default: function _default() {
    return {
      data: [],
      // { id, src, link }
      config: {
        height: 200,
        indicatorDots: true,
        indicatorColor: 'rgba(0, 0, 0, .3)',
        indicatorActiveColor: '#000000',
        autoplay: true,
        interval: 5000,
        duration: 500,
        circular: false
      }
    };
  }
}), _dec3 = Prop(Object), _dec4 = Prop(Boolean), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(Swiper, _Vue);

  function Swiper() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Swiper);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Swiper)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "data", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "showController", _descriptor3, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(Swiper, [{
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
    key: "links",
    get: function get() {
      return _get(this.data, 'links') || [];
    }
  }]);

  return Swiper;
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
export { Swiper as default };</script>

<style lang="scss" scoped>
  .el-color-picker {
    vertical-align: middle;
  }
</style>

