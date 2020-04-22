<template>
  <div class="c-transfer">
    <div class="panel panel-left">
      <div class="panel-header">
        <el-checkbox :value="leftSelected.length && leftSelected.length ===  pabelData[0].length" @change="handleToggleLeftPanelSelect">{{ titles[0] }}</el-checkbox>
        <span class="indicator">{{ leftSelected.length }} / {{ pabelData[0].length }}</span>
      </div>
      <div class="panel-content">
        <el-checkbox-group v-model="leftSelected">
          <el-checkbox v-for="item in pabelData[0]" :key="item.value" :label="item.value" :class="{ active: rightSelected.includes(item.value) }">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="btns">
      <el-button icon="el-icon-arrow-left" circle :disabled="!rightSelected.length" @click="handleToLeft"></el-button>
      <el-button icon="el-icon-arrow-right" circle :disabled="!leftSelected.length" @click="handleToRight"></el-button>
    </div>
    <div class="panel panel-right">
      <div class="panel-header">
        <el-checkbox :value="rightSelected.length && rightSelected.length ===  pabelData[1].length" @change="handleToggleRightPanelSelect">{{ titles[1] }}</el-checkbox>
        <span class="indicator">{{ rightSelected.length }} / {{ pabelData[1].length }}</span>
      </div>
      <div class="panel-content">
        <el-checkbox-group v-model="rightSelected">
          <draggable class="drag-content" :value="pabelData[1]" @end="handleDragChange">
            <el-checkbox v-for="item in pabelData[1]" :key="item.value" :label="item.value" :class="{ active: rightSelected.includes(item.value) }">{{ item.name }}</el-checkbox>
          </draggable>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>import "core-js/modules/es6.array.find";
import "core-js/modules/es7.array.includes";
import "core-js/modules/es6.string.includes";
import "core-js/modules/web.dom.iterable";
import _initializerDefineProperty from "@babel/runtime-corejs2/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime-corejs2/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime-corejs2/helpers/esm/initializerWarningHelper";
import _cloneDeep from "lodash/cloneDeep";
import _difference from "lodash/difference";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import { arrayMove } from "../utils";
var Transfer = (_dec = Component({
  components: {
    draggable: draggable
  }
}), _dec2 = Model('change', {
  type: Array,
  default: function _default() {
    return [];
  }
}), _dec3 = Prop({
  type: Array,
  default: function _default() {
    return [];
  }
}), _dec4 = Prop({
  type: Array,
  default: function _default() {
    return ['列表1', '列表2'];
  }
}), _dec5 = Watch('data', {
  immediate: true
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(Transfer, _Vue);

  function Transfer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Transfer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Transfer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "data", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "titles", _descriptor3, _assertThisInitialized(_this));

    _this.leftSelected = [];
    _this.rightSelected = [];
    _this.dataLocal = [];
    return _this;
  }

  _createClass(Transfer, [{
    key: "handleToRight",
    value: function handleToRight() {
      this.$emit('change', this.value.concat(this.leftSelected));
      this.leftSelected = [];
    }
  }, {
    key: "handleToLeft",
    value: function handleToLeft() {
      this.$emit('change', _difference(this.value, this.rightSelected));
      this.rightSelected = [];
    }
  }, {
    key: "handleToggleLeftPanelSelect",
    value: function handleToggleLeftPanelSelect(val) {
      this.leftSelected = val ? this.pabelData[0].map(function (item) {
        return item.value;
      }) : [];
    }
  }, {
    key: "handleToggleRightPanelSelect",
    value: function handleToggleRightPanelSelect(val) {
      this.rightSelected = val ? this.pabelData[1].map(function (item) {
        return item.value;
      }) : [];
    }
  }, {
    key: "handleDragChange",
    value: function handleDragChange(_ref) {
      var oldIndex = _ref.oldIndex,
          newIndex = _ref.newIndex;

      if (oldIndex !== newIndex) {
        this.$emit('change', arrayMove(this.value, oldIndex, newIndex));
      }
    }
  }, {
    key: "onDataChange",
    value: function onDataChange(newVal) {
      if (newVal) {
        this.dataLocal = _cloneDeep(newVal);
      }
    }
  }, {
    key: "pabelData",
    get: function get() {
      var _this2 = this;

      var leftPanel = [];
      var rightPanel = [];
      this.dataLocal.forEach(function (item) {
        _this2.value.includes(item.value) ? rightPanel.push(item) : leftPanel.push(item);
      });
      var rightPanelSorted = this.value.map(function (value) {
        return rightPanel.find(function (item) {
          return item.value === value;
        });
      });
      return [leftPanel, rightPanelSorted];
    }
  }]);

  return Transfer;
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
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "titles", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "onDataChange", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "onDataChange"), _class2.prototype)), _class2)) || _class);
export { Transfer as default };</script>
