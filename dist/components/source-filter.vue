<template>
  <el-form
    inline
    v-if="filterColumns.length"
    @submit.native.prevent="onSubmit"
  >
    <c-source-form-item v-for="(item, index) in filterColumns" :column="item" v-model="formModel" :key="item.prop" :class="`item-${item.prop} item-${index}`" />

    <el-form-item>
      <el-button type="primary" native-type="submit">{{ $t('查询') }}</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="default" @click="onClear">{{ $t('清除') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>import "core-js/modules/es7.object.get-own-property-descriptors";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.object.keys";
import "core-js/modules/es6.array.find";
import _defineProperty from "@babel/runtime-corejs2/helpers/esm/defineProperty";
import "core-js/modules/es6.regexp.replace";
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
import _pickBy from "lodash/pickBy";
import _unset from "lodash/unset";
import _get from "lodash/get";
import _cloneDeep from "lodash/cloneDeep";

var _dec, _dec2, _class, _class2, _descriptor, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import flatten, { unflatten } from 'flat';
var SourceFilter = (_dec = Prop({
  type: Array,
  default: function _default() {
    return [];
  }
}), _dec2 = Watch('filterTransformed', {
  immediate: true
}), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(SourceFilter, _Vue);

  function SourceFilter() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SourceFilter);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SourceFilter)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "filter", _descriptor, _assertThisInitialized(_this));

    _this.formModel = {
      _search: {
        field: '',
        value: ''
      }
    };
    return _this;
  }

  _createClass(SourceFilter, [{
    key: "mounted",
    value: function mounted() {
      this.initModel();
    }
  }, {
    key: "initModel",
    value: function initModel() {
      var query = _cloneDeep(this.$route.query);

      var searchField = _get(query, '_search.field');

      searchField && _unset(query, searchField);
      this.formModel = Object.assign({}, this.formModel, query);
    }
  }, {
    key: "onSubmit",
    value: function onSubmit() {
      // 空字符串不提交
      var flattenFormModel = flatten(this.formModel);
      var query = unflatten(_pickBy(flattenFormModel, function (value) {
        return value !== '';
      }));

      var searchKey = _get(query, '_search.field');

      var searchValue = _get(query, '_search.value');

      if (searchKey && searchValue) {
        _set(query, searchKey, searchValue);
      }

      this.$router.replace({
        query: _objectSpread({}, query, {
          page: 1
        })
      });
    }
  }, {
    key: "onClear",
    value: function onClear() {
      this.$router.replace({
        query: {}
      });
    }
  }, {
    key: "onFilterFormatedChange",
    value: function onFilterFormatedChange(val) {
      var searchItem = val.find(function (item) {
        return item.prop === '_search.field';
      });

      var searchOptions = _get(searchItem, 'form.props.options');

      if (searchOptions) {
        if (!_get(this.formModel, '_search.field')) {
          _set(this.formModel, '_search.field', searchOptions[0].value);
        }
      }
    }
  }, {
    key: "filterColumns",
    get: function get() {
      return this.filterTransformed.map(function (item) {
        return _objectSpread({}, item, {
          prop: String(item.prop)
        });
      });
    }
  }, {
    key: "filterTransformed",
    get: function get() {
      var searchComponents = this.filter.filter(function (item) {
        return _get(item, 'form.component') === 'search';
      });
      var filterTransformed = this.filter.filter(function (item) {
        return _get(item, 'form.component') !== 'search';
      });
      var searchOptions = searchComponents.map(function (item) {
        return {
          label: item.label,
          value: item.prop
        };
      });

      if (searchOptions.length) {
        filterTransformed.unshift({
          prop: '_search.value',
          form: {
            component: 'input',
            props: {
              // TODO placeholder没渲染出来
              placeholder: this.$t('请输入关键字')
            }
          }
        });
        filterTransformed.unshift({
          prop: '_search.field',
          label: this.$t('搜索'),
          form: {
            component: 'select',
            props: {
              options: searchOptions,
              clearable: false
            }
          }
        });
      }

      return filterTransformed;
    }
  }]);

  return SourceFilter;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "filter", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "onFilterFormatedChange", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "onFilterFormatedChange"), _class2.prototype)), _class2)) || _class);
export { SourceFilter as default };</script>
