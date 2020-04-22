<template>
  <el-pagination
    background
    :layout="layout"
    :page-sizes="pagesizes"
    @current-change="onPageChange"
    @size-change="onSizeChange"
    v-bind="pagination"
    class="c-pagination"
  />
</template>

<script>import "core-js/modules/es7.object.get-own-property-descriptors";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.object.keys";
import "core-js/modules/es6.regexp.replace";
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

var _dec, _class, _class2, _descriptor, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Vue, Component, Prop } from 'vue-property-decorator';
var Pagination = (_dec = Prop({
  type: Object,
  default: function _default() {
    return {};
  }
}), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(Pagination, _Vue);

  function Pagination() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Pagination);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Pagination)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "pagination", _descriptor, _assertThisInitialized(_this));

    _this.pagesizes = [10, 25, 35, 50, 100];
    _this.layout = 'total, prev, pager, next, sizes, jumper';
    return _this;
  }

  _createClass(Pagination, [{
    key: "onPageChange",
    value: function onPageChange(currentPage) {
      this.$router.push({
        query: _objectSpread({}, this.$route.query, {
          page: currentPage
        })
      });
    }
  }, {
    key: "onSizeChange",
    value: function onSizeChange(size) {
      var totalPage = Math.ceil(this.pagination.total / size);
      var page = this.pagination['current-page'];
      this.$router.replace({
        query: _objectSpread({}, this.$route.query, {
          per_page: size,
          page: Math.min(page, totalPage)
        })
      });
    }
  }]);

  return Pagination;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "pagination", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Pagination as default };</script>
