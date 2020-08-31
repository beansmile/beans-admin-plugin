<template>
  <div class="c-dynamic-nest-form">
    <div class="inputs" v-for="(resource, index) in resources" :key="index" v-show="!resource._destroy">

      <el-button size="mini" circle class="btn-remove" icon="el-icon-delete" @click="hasManyRemove($event, index)"></el-button>

      <c-source-form-item
        v-for="column in computedColumns"
        :key="column.prop"
        :column="column"
        :row="resource"
        :value="resource"
        @change="handleResourceChange($event, index)"
      />
    </div>
    <div>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="hasManyAdd">{{ $t('添加') }}</el-button>
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
import _cloneDeep from "lodash/cloneDeep";
import _isFunction from "lodash/isFunction";
import _flatten from "lodash/flatten";

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

import { Vue, Component, Prop, Model } from 'vue-property-decorator';
var DynamicNestForm = (_dec = Model('change', {
  type: Array,
  default: function _default() {
    return [];
  }
}), _dec2 = Prop({
  type: [Array, Function],
  default: function _default() {
    return [];
  }
}), _dec3 = Prop({
  type: String,
  default: 'id'
}), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(DynamicNestForm, _Vue);

  function DynamicNestForm() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DynamicNestForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DynamicNestForm)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "columns", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "addDestroyFlagFieldName", _descriptor3, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(DynamicNestForm, [{
    key: "handleResourceChange",
    value: function handleResourceChange($event, index) {
      var newResources = _cloneDeep(this.value);

      newResources.splice(index, 1, $event);
      this.$emit('change', newResources);
    }
  }, {
    key: "hasManyAdd",
    value: function hasManyAdd() {
      this.$emit('change', this.value.concat({}));
    }
  }, {
    key: "hasManyRemove",
    value: function hasManyRemove($event, index) {
      var newResources = _cloneDeep(this.value);

      var current = newResources[index];

      if (current[this.addDestroyFlagFieldName]) {
        current._destroy = true;
        newResources.splice(index, 1, current);
      } else {
        newResources.splice(index, 1);
      }

      this.$emit('change', newResources);
    }
  }, {
    key: "resources",
    // 删除后添加_destory的数据标识
    get: function get() {
      return this.value ? _flatten([this.value]) : [];
    }
  }, {
    key: "computedColumns",
    get: function get() {
      if (_isFunction(this.columns)) {
        return this.columns({
          resource: this.resources
        });
      } else {
        return this.columns;
      }
    }
  }]);

  return DynamicNestForm;
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
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "addDestroyFlagFieldName", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { DynamicNestForm as default };</script>
