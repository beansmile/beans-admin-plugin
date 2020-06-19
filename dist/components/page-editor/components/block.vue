<template>
  <div class="c-block">

    <div class="block" :style="blockStyle"></div>

    <ControlBox :title="$t('pageEditor.占位块')" :visible="showController" @close="$emit('close')">
      <el-form @submit.native.prevent label-position="left" label-width="auto">
        <el-form-item :label="$t('pageEditor.块高度')">
          <el-input-number v-model="value.config.height" @change="syncChange" />
        </el-form-item>
        <el-form-item :label="$t('pageEditor.块背景颜色')">
          <el-color-picker show-alpha v-model="value.config.backgroundColor" @change="syncChange"></el-color-picker>
        </el-form-item>
      </el-form>
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
var CBlock = (_dec = Component({
  components: {
    ControlBox: ControlBox
  }
}), _dec2 = Model('change', {
  type: Object,
  default: function _default() {
    return {
      data: [],
      config: {
        height: 20,
        backgroundColor: '#fff'
      }
    };
  }
}), _dec3 = Prop(Boolean), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(CBlock, _Vue);

  function CBlock() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CBlock);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CBlock)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "showController", _descriptor2, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(CBlock, [{
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
    key: "blockStyle",
    get: function get() {
      var _this$value$config = this.value.config,
          height = _this$value$config.height,
          backgroundColor = _this$value$config.backgroundColor;
      return {
        height: height + 'px',
        backgroundColor: backgroundColor
      };
    }
  }]);

  return CBlock;
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
export { CBlock as default };</script>

<style lang="scss" scoped>
  .block {
    width: 100%;
  }
</style>
