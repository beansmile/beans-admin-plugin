<template>
  <div class="c-product-list">

    <div class="list-title">{{ name }}</div>

    <ControlBox :title="$t('pageEditor.商品列表')" :visible="showController" @close="$emit('close')">
      <el-form @submit.native.prevent>
        <el-form-item :label="$t('pageEditor.选择商品列表')">
          <c-select :value="id" :options="selectOptions" @change="handleChange" />
        </el-form-item>
        <el-form-item :label="$t('pageEditor.是否横向展示')">
          <el-switch :value="value.config.scrollX" @change="handleSwitchChange" />
        </el-form-item>
      </el-form>
    </ControlBox>
  </div>
</template>

<script>import "core-js/modules/es6.array.find";
import _initializerDefineProperty from "@babel/runtime-corejs2/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime-corejs2/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime-corejs2/helpers/esm/initializerWarningHelper";
import _set from "lodash/set";
import _cloneDeep from "lodash/cloneDeep";
import _get from "lodash/get";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

import { Vue, Component, Model, Prop } from 'vue-property-decorator';
import ControlBox from "../control-box";
var ProductList = (_dec = Component({
  components: {
    ControlBox: ControlBox
  }
}), _dec2 = Model('change', {
  type: Object,
  default: function _default() {
    return {
      data: [{
        id: ''
      }],
      config: {}
    };
  }
}), _dec3 = Prop(Boolean), _dec4 = Prop(Object), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(ProductList, _Vue);

  function ProductList() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ProductList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ProductList)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "showController", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "data", _descriptor3, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(ProductList, [{
    key: "mounted",
    value: function mounted() {
      this.syncChange();
    }
  }, {
    key: "syncChange",
    value: function syncChange(value) {
      this.$emit('change', value || this.value);
    }
  }, {
    key: "handleSwitchChange",
    value: function handleSwitchChange(val) {
      var value = _cloneDeep(this.value);

      _set(value.config, 'scrollX', val);

      this.syncChange(value);
    }
  }, {
    key: "handleChange",
    value: function handleChange(val) {
      var value = _cloneDeep(this.value);

      _set(value.data[0], 'id', val);

      this.syncChange(value);
    }
  }, {
    key: "id",
    get: function get() {
      return this.value.data[0].id;
    }
  }, {
    key: "productList",
    get: function get() {
      return _get(this.data, 'productList') || [];
    }
  }, {
    key: "selectOptions",
    get: function get() {
      return this.productList.map(function (_ref) {
        var id = _ref.id,
            title = _ref.title;
        return {
          value: id,
          label: title
        };
      });
    }
  }, {
    key: "name",
    get: function get() {
      var _this2 = this;

      return _get(this.productList.find(function (item) {
        return item.id === _this2.id;
      }), 'title');
    }
  }]);

  return ProductList;
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
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "data", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { ProductList as default };</script>

<style lang="scss" scoped>
  .list-title {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
</style>
