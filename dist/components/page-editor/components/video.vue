<template>
  <div class="c-video">
    <template v-for="(item, index) in value.data">
      <video
        v-if="item.src"
        :key="index"
        class="video"
        :style="videoStyle"
        :src="item.src"
        :controls="value.config.controls"
        :muted="value.config.muted"
        :autoplay="value.config.autoplay"
        :loop="value.config.loop"
      />
    </template>

    <ControlBox title="视频" v-if="showController">
      <el-form @submit.native.prevent label-position="left" label-width="auto">
        <el-form-item label="视频高度">
          <el-input-number v-model="value.config.height" @change="syncChange" />
        </el-form-item>
        <el-form-item label="视频左边间距">
          <el-input-number v-model="value.config.paddingLeft" @change="syncChange" />
        </el-form-item>
        <el-form-item label="视频右边边间距">
          <el-input-number v-model="value.config.paddingRight" @change="syncChange" />
        </el-form-item>
        <el-form-item label="视频的表现形式">
          <el-select v-model="value.config.objectFit" @change="syncChange">
            <el-option
              v-for="option in objectFitOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否显示播放控件">
          <el-switch v-model="value.config.controls" @change="syncChange" />
        </el-form-item>
        <el-form-item label="是否自动播放">
          <el-switch v-model="value.config.autoplay" @change="syncChange" />
        </el-form-item>
        <el-form-item label="是否循环播放">
          <el-switch v-model="value.config.loop" @change="syncChange" />
        </el-form-item>
        <el-form-item label="是否静音播放">
          <el-switch v-model="value.config.muted" @change="syncChange" />
        </el-form-item>
      </el-form>
      <c-upload
        :limit="1"
        accept="video/*"
        :size="100"
        :showCancelButton="false"
        @submit="handleSubmit"
      />
    </ControlBox>
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

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

import { Vue, Component, Model, Prop } from 'vue-property-decorator';
import ControlBox from "../control-box";
var CVideo = (_dec = Component({
  components: {
    ControlBox: ControlBox
  }
}), _dec2 = Model('change', {
  type: Object,
  default: function _default() {
    return {
      data: [{
        src: ''
      }],
      config: {
        height: 230,
        controls: true,
        autoplay: false,
        loop: true,
        muted: false,
        objectFit: 'contain',
        paddingLeft: 0,
        paddingRight: 0
      }
    };
  }
}), _dec3 = Prop(Boolean), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(CVideo, _Vue);

  function CVideo() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CVideo);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CVideo)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "showController", _descriptor2, _assertThisInitialized(_this));

    _this.objectFitOptions = [{
      label: '包含',
      value: 'contain'
    }, {
      label: '填充',
      value: 'fill'
    }, {
      label: '覆盖',
      value: 'cover'
    }];
    return _this;
  }

  _createClass(CVideo, [{
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
    key: "handleSubmit",
    value: function handleSubmit(data) {
      this.$set(this.value.data[0], 'src', data[0]);
      this.syncChange();
    }
  }, {
    key: "videoStyle",
    get: function get() {
      var _this$value$config = this.value.config,
          height = _this$value$config.height,
          objectFit = _this$value$config.objectFit,
          paddingLeft = _this$value$config.paddingLeft,
          paddingRight = _this$value$config.paddingRight;
      return {
        height: height + 'px',
        objectFit: objectFit,
        paddingLeft: paddingLeft + 'px',
        paddingRight: paddingRight + 'px'
      };
    }
  }]);

  return CVideo;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "showController", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { CVideo as default };</script>

<style lang="scss" scoped>
  .video {
    box-sizing: border-box;
    width: 100%;
    vertical-align: top;
  }
</style>
