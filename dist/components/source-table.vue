<script>import "core-js/modules/es7.object.get-own-property-descriptors";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.object.keys";
import _defineProperty from "@babel/runtime-corejs2/helpers/esm/defineProperty";
import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import "core-js/modules/es6.regexp.replace";
import "core-js/modules/es6.array.sort";
import "core-js/modules/es6.array.find";
import "core-js/modules/es7.array.includes";
import "core-js/modules/es6.string.includes";
import _initializerDefineProperty from "@babel/runtime-corejs2/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime-corejs2/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime-corejs2/helpers/esm/initializerWarningHelper";
import "core-js/modules/es6.number.constructor";
import _set from "lodash/set";
import _get from "lodash/get";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Vue, Component, Prop } from 'vue-property-decorator';
import { sourceColumnRender } from "./source-render";
import { loadingService } from "../services";
var SourceTable = (_dec = Prop({
  type: Object,
  default: function _default() {
    return {
      data: []
    };
  }
}), _dec2 = Prop({
  type: Array,
  default: function _default() {
    return [];
  }
}), _dec3 = Prop(String), _dec4 = Prop(Number), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(SourceTable, _Vue);

  function SourceTable() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SourceTable);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SourceTable)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "table", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "columns", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "resource", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "tableHeight", _descriptor4, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(SourceTable, [{
    key: "filterTableColumns",
    // source page会用到
    value: function filterTableColumns(columns) {
      return columns.filter(function (item) {
        return !(item.action || []).includes('hide-in-table');
      });
    }
  }, {
    key: "getRowByPropName",
    value: function getRowByPropName(propName) {
      return this.columns.find(function (item) {
        return item.prop === propName;
      });
    }
  }, {
    key: "getTableComponent",
    value: function getTableComponent() {
      return this.$refs.table;
    }
  }, {
    key: "handleSortChange",
    value: function handleSortChange(_ref) {
      var order = _ref.order,
          prop = _ref.prop;

      var _get2 = _get(this.$appConfig, 'table.sort', {}),
          ascending = _get2.ascending,
          descending = _get2.descending;

      var query = Object.assign({}, this.$route.query, {
        page: 1
      });

      if (order) {
        _set(query, '_sort_field', prop);

        _set(query, '_sort_value', order);

        var row = this.getRowByPropName(prop);
        var sortQueryKey = row.sort;
        var sortQueryValue = {
          ascending: ascending,
          descending: descending
        }[order];

        _set(query, sortQueryKey, "".concat(prop, " ").concat(sortQueryValue));
      } else {
        var currentSortField = _get(query, '_sort_field');

        var _row = this.getRowByPropName(currentSortField);

        var _sortQueryKey = _row.sort;

        _set(query, '_sort_field', undefined);

        _set(query, '_sort_value', undefined);

        _set(query, _sortQueryKey, undefined);
      }

      this.$router.replace({
        query: query
      });
    }
  }, {
    key: "renderScopedSlots",
    value: function renderScopedSlots(column) {
      var _this2 = this;

      if (!column.prop) {
        return null;
      }

      return {
        default: function _default(scope) {
          return sourceColumnRender(_this2.$createElement, {
            resource: _this2.resource
          })({
            columns: _this2.columns,
            column: column,
            scope: scope
          });
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var h = arguments[0];
      var table = this.table,
          tableColumns = this.tableColumns;
      return h("div", {
        "class": "c-source-table",
        "directives": [{
          name: "loading",
          value: loadingService.state.count > 0
        }]
      }, [h("el-table", _mergeJSXProps([{
        "class": "el-table--scrollable-y",
        "attrs": {
          "default-sort": this.defaultSort
        },
        "on": {
          "sort-change": this.handleSortChange
        }
      }, {
        "props": table
      }, {}, {
        "on": table.events
      }, {
        "attrs": {
          "height": this.tableHeight
        },
        "ref": "table"
      }]), [tableColumns.map(function (column, index) {
        return h("el-table-column", _mergeJSXProps2([{
          "key": index,
          "attrs": {
            "align": "center"
          }
        }, {
          "props": column
        }, {
          "scopedSlots": _this3.renderScopedSlots(column, index)
        }]));
      })])]);
    }
  }, {
    key: "tableColumns",
    get: function get() {
      return this.filterTableColumns(this.columns).map(function (item) {
        return _objectSpread({}, item, {
          sortable: item.sort ? 'custom' : false,
          'sort-orders': ['ascending', 'descending', null]
        });
      }).map(function (item) {
        return _objectSpread({}, item, {
          prop: item.prop && String(item.prop)
        });
      });
    }
  }, {
    key: "defaultSort",
    get: function get() {
      var query = _get(this, '$route.query');

      var sortProp = _get(query, '_sort_field');

      var sortValue = _get(query, '_sort_value');

      return {
        prop: sortProp,
        order: sortValue
      };
    }
  }]);

  return SourceTable;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "table", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "columns", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "resource", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "tableHeight", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { SourceTable as default };</script>
