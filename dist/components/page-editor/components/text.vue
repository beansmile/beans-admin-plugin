<template>
  <div class="c-text">

    <div class="text" v-for="(item, index) in value.data" :key="index" :style="textStyle">{{ item.text }}</div>

    <ControlBox :title="$t('pageEditor.文本')" :visible="showController" @close="$emit('close')">
      <el-form @submit.native.prevent label-position="left" label-width="auto">
        <el-form-item :label="$t('pageEditor.文本')" v-for="(item, index) in value.data" :key="index">
          <c-uncontrolled-input type="textarea" :rows="5" autosize v-model="item.text" @change="syncChange" />
        </el-form-item>
        <el-form-item :label="$t('pageEditor.颜色')">
          <el-color-picker show-alpha v-model="value.config.color" @change="syncChange"></el-color-picker>
        </el-form-item>
        <el-form-item :label="$t('pageEditor.背景颜色')">
          <el-color-picker show-alpha v-model="value.config.backgroundColor" @change="syncChange"></el-color-picker>
        </el-form-item>
        <el-form-item :label="$t('pageEditor.文字大小')">
          <el-input-number v-model="value.config.fontSize" @change="syncChange"/>
        </el-form-item>
        <el-form-item :label="$t('pageEditor.行高')">
          <el-input-number v-model="value.config.lineHeight" @change="syncChange"/>
        </el-form-item>
        <el-form-item :label="$t('pageEditor.字重')">
          <el-select v-model="value.config.fontWeight" @change="syncChange">
            <el-option
              v-for="item in fontWeightOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select >
        </el-form-item>
        <el-form-item :label="$t('pageEditor.上间距')">
          <el-input-number v-model="value.config.paddingTop" @change="syncChange" />
        </el-form-item>
        <el-form-item :label="$t('pageEditor.下间距')">
          <el-input-number v-model="value.config.paddingBottom" @change="syncChange" />
        </el-form-item>
        <el-form-item :label="$t('pageEditor.左间距')">
          <el-input-number v-model="value.config.paddingLeft" @change="syncChange" />
        </el-form-item>
        <el-form-item :label="$t('pageEditor.右间距')">
          <el-input-number v-model="value.config.paddingRight" @change="syncChange" />
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
import _range from "lodash/range";

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Vue, Component, Model, Prop } from 'vue-property-decorator';
import ControlBox from "../control-box";
var CText = (_dec = Component({
  components: {
    ControlBox: ControlBox
  }
}), _dec2 = Model('change', {
  type: Object,
  default: function _default() {
    return {
      data: [{
        text: '文本'
      }],
      config: {
        boxSizing: 'border-box',
        color: '#000',
        backgroundColor: '#fff',
        fontSize: 14,
        lineHeight: 22,
        textAlign: 'left',
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        fontWeight: 'normal'
      }
    };
  }
}), _dec3 = Prop(Boolean), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(CText, _Vue);

  function CText() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CText);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CText)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "showController", _descriptor2, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(CText, [{
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
    key: "fontWeightOptions",
    get: function get() {
      return [{
        label: this.$t('默认'),
        value: 'normal'
      }, {
        label: 'bold',
        value: 'bold'
      }, {
        label: 'bolder',
        value: 'bolder'
      }].concat(_range(100, 1000, 100).map(function (item) {
        return {
          label: item,
          value: item
        };
      }));
    }
  }, {
    key: "textStyle",
    get: function get() {
      var _this$value$config = this.value.config,
          fontSize = _this$value$config.fontSize,
          lineHeight = _this$value$config.lineHeight,
          paddingLeft = _this$value$config.paddingLeft,
          paddingRight = _this$value$config.paddingRight,
          paddingTop = _this$value$config.paddingTop,
          paddingBottom = _this$value$config.paddingBottom;
      return _objectSpread({}, this.value.config, {
        fontSize: fontSize + 'px',
        lineHeight: lineHeight + 'px',
        paddingLeft: paddingLeft + 'px',
        paddingRight: paddingRight + 'px',
        paddingTop: paddingTop + 'px',
        paddingBottom: paddingBottom + 'px'
      });
    }
  }]);

  return CText;
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
export { CText as default };</script>
