<template>
  <div class="c-static-nest-form">
    <div class="inputs" v-if="show">
      <c-source-form-item
        v-for="column in computedColumns"
        :key="column.prop"
        :column="column"
        :row="resource"
        :value="resource"
        @change="handleChange"
      />
    </div>
    <div>
      <el-button type="primary" @click="toggleShow" v-if="collapsible">{{ toggleButtonText }}</el-button>
    </div>
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
import _isFunction from "lodash/isFunction";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator';
var StaticNestForm = (_dec = Model('change', {
  type: Object,
  default: function _default() {}
}), _dec2 = Prop({
  type: [Array, Function],
  default: function _default() {
    return [];
  }
}), _dec3 = Prop({
  type: Boolean,
  default: false
}), _dec4 = Watch('collapsible', {
  immediate: true
}), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(StaticNestForm, _Vue);

  function StaticNestForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, StaticNestForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(StaticNestForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "columns", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "collapsible", _descriptor3, _assertThisInitialized(_this));

    _this.show = false;
    return _this;
  }

  _createClass(StaticNestForm, [{
    key: "handleChange",
    value: function handleChange(data) {
      this.$emit('change', data);
    }
  }, {
    key: "toggleShow",
    value: function toggleShow() {
      this.show = !this.show;
    }
  }, {
    key: "onCollapsibleChange",
    value: function onCollapsibleChange(collapsible) {
      this.show = !collapsible;
    }
  }, {
    key: "toggleButtonText",
    get: function get() {
      return this.show ? this.$t('收起') : this.$t('展开编辑');
    }
  }, {
    key: "resource",
    get: function get() {
      return this.value || {};
    }
  }, {
    key: "computedColumns",
    get: function get() {
      if (_isFunction(this.columns)) {
        return this.columns({
          resource: this.resource
        });
      } else {
        return this.columns;
      }
    }
  }]);

  return StaticNestForm;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "columns", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "collapsible", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "onCollapsibleChange", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "onCollapsibleChange"), _class2.prototype)), _class2)) || _class);
export { StaticNestForm as default };</script>
