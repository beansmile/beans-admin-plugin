<template>
  <div class="c-notice-bar">
    <div class="notice-bar" v-for="(item, index) in value.data" :key="index" :style="noticeBarStyle">{{ item.text }}</div>
    <div class="tip" style="font-size: 12px; color: #ccc; text-align: center; padding: 10px;">{{ $t('pageEditor.通知栏') }}: {{ tip }}</div>
    <ControlBox :visible="showController" @close="$emit('close')" :title="$t('pageEditor.通知栏')">
      <el-form @submit.native.prevent label-position="left" label-width="auto">
        <el-form-item :label="$t('pageEditor.文本')" v-for="(item, index) in value.data" :key="index">
          <c-uncontrolled-input type="textarea" :rows="5" autosize v-model="item.text" @change="syncChange" :placeholder="tip" />
        </el-form-item>
        <el-form-item :label="$t('pageEditor.颜色')">
          <el-color-picker show-alpha v-model="value.config.color" @change="syncChange"></el-color-picker>
        </el-form-item>
        <el-form-item :label="$t('pageEditor.背景颜色')">
          <el-color-picker show-alpha v-model="value.config.backgroundColor" @change="syncChange"></el-color-picker>
        </el-form-item>
      </el-form>
    </ControlBox>
  </div>
</template>

<script>import "core-js/modules/es7.object.get-own-property-descriptors";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.object.keys";
import _defineProperty from "@babel/runtime-corejs2/helpers/esm/defineProperty";
import _initializerDefineProperty from "@babel/runtime-corejs2/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime-corejs2/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime-corejs2/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Vue, Component, Model, Prop } from 'vue-property-decorator';
import ControlBox from "../control-box";
var CNoticeBar = (_dec = Component({
  components: {
    ControlBox: ControlBox
  }
}), _dec2 = Model('change', {
  type: Object,
  default: function _default() {
    return {
      data: [{
        text: ''
      }],
      config: {
        color: '#000',
        backgroundColor: '#fffbe8'
      }
    };
  }
}), _dec3 = Prop(Boolean), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(CNoticeBar, _Vue);

  function CNoticeBar() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CNoticeBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CNoticeBar)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "showController", _descriptor2, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(CNoticeBar, [{
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
    key: "tip",
    get: function get() {
      return this.$t('pageEditor.通知栏提示');
    }
  }, {
    key: "noticeBarStyle",
    get: function get() {
      return _objectSpread({
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px'
      }, this.value.config);
    }
  }]);

  return CNoticeBar;
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
export { CNoticeBar as default };</script>
