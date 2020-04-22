<script lang="jsx">import "core-js/modules/es7.object.get-own-property-descriptors";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.object.keys";
import "core-js/modules/es7.array.includes";
import "core-js/modules/es6.string.includes";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _defineProperty from "@babel/runtime-corejs2/helpers/esm/defineProperty";
import "regenerator-runtime/runtime";
import _asyncToGenerator from "@babel/runtime-corejs2/helpers/esm/asyncToGenerator";
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
import _debounce from "lodash/debounce";
import _get from "lodash/get";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Vue, Component, Prop } from 'vue-property-decorator';
import { createSourceFormDialog } from "./source-form";
var SourcePage = (_dec = Prop({
  type: Array,
  default: function _default() {
    return [];
  }
}), _dec2 = Prop({
  type: Array,
  default: function _default() {
    return [];
  }
}), _dec3 = Prop({
  type: Object,
  default: function _default() {
    return {};
  }
}), _dec4 = Prop({
  type: Object,
  default: function _default() {
    return {
      data: []
    };
  }
}), _dec5 = Prop({
  type: String
}), _dec6 = Prop(String), _dec7 = Prop(Object), _dec8 = Prop({
  type: String,
  default: ''
}), _dec9 = Prop({
  type: Array,
  default: function _default() {
    return [];
  }
}), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(SourcePage, _Vue);

  function SourcePage() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SourcePage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SourcePage)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "columns", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "filter", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "pagination", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "table", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "resource", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "createButtonText", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "createPageLocation", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "exportExcelURL", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "batchActions", _descriptor9, _assertThisInitialized(_this));

    _this.exporting = false;
    _this.tableHeight = 0;
    _this.selectedRows = [];
    _this.debouncedCalcTableHeight = _debounce(_this.calcTableHeight, 500);
    return _this;
  }

  _createClass(SourcePage, [{
    key: "export",
    value: function () {
      var _export2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var params;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.exporting = true;
                _context.prev = 1;
                this.$refs.sourceFilter.onSubmit();
                _context.next = 5;
                return this.$nextTick();

              case 5:
                params = _objectSpread({}, this.$route.query, {
                  page: undefined,
                  per_page: undefined
                });
                _context.next = 8;
                return this.$download({
                  url: this.exportExcelURL,
                  params: params,
                  name: _get(this.$route, 'meta.title', 'resource') + '.xlsx'
                });

              case 8:
                _context.prev = 8;
                this.exporting = false;
                return _context.finish(8);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1,, 8, 11]]);
      }));

      function _export() {
        return _export2.apply(this, arguments);
      }

      return _export;
    }()
  }, {
    key: "getTableComponent",
    value: function getTableComponent() {
      return this.$refs.sourceTable.getTableComponent();
    }
  }, {
    key: "renderSelectionButtons",
    value: function renderSelectionButtons() {
      var _this2 = this;

      var h = this.$createElement;
      return this.batchActions.map(function (item) {
        var props = _objectSpread({
          type: 'primary'
        }, item.buttonProps);

        return h("el-button", _mergeJSXProps([{
          "attrs": {
            "disabled": !_this2.selectedRows.length
          }
        }, {
          "props": props
        }, {
          "on": {
            "click": function click() {
              return item.handler(JSON.parse(JSON.stringify(_this2.selectedRows)));
            }
          }
        }]), [item.text || item.title]);
      });
    }
  }, {
    key: "renderButtons",
    value: function renderButtons() {
      var h = this.$createElement;
      var createPageLocation = this.createPageLocation || {
        name: "".concat(this.resource, ".new")
      };
      var _this$$slots = this.$slots,
          defaultSlot = _this$$slots.default,
          actionSlot = _this$$slots.action;
      var $actionSlot = actionSlot || defaultSlot;
      return h("div", {
        "class": "source-page-btn-group"
      }, [this.showCreateButton && h("c-router-link", {
        "attrs": {
          "keepNode": false,
          "to": createPageLocation
        }
      }, [h("el-button", {
        "class": "btn-create",
        "attrs": {
          "type": "primary"
        }
      }, [this.createButtonText])]), this.showExportButton && h("el-button", {
        "attrs": {
          "disabled": this.exporting,
          "loading": this.exporting,
          "type": "primary"
        },
        "on": {
          "click": this.export
        }
      }, [this.$t('导出数据')]), this.renderSelectionButtons(), $actionSlot && h("div", {
        "class": "action"
      }, [$actionSlot])]);
    }
  }, {
    key: "calcTableHeight",
    value: function () {
      var _calcTableHeight = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var table;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.$nextTick();

              case 2:
                table = this.$refs.sourceTable;
                this.tableHeight = table.$el.offsetHeight;

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function calcTableHeight() {
        return _calcTableHeight.apply(this, arguments);
      }

      return calcTableHeight;
    }()
  }, {
    key: "mounted",
    value: function mounted() {
      this.calcTableHeight();
      window.addEventListener('resize', this.debouncedCalcTableHeight, false);
    }
  }, {
    key: "beforeDestroy",
    value: function beforeDestroy() {
      window.removeEventListener('resize', this.debouncedCalcTableHeight, false);
    }
  }, {
    key: "handleTableSetting",
    value: function handleTableSetting() {
      var _this3 = this;

      // source-table filterTableColumns
      var tableColumnsFilter = _get(this.$refs.sourceTable, 'filterTableColumns', function (a) {
        return a;
      });

      var columns = tableColumnsFilter(this.tableColumns).filter(function (item) {
        return item.label && item.prop;
      });
      createSourceFormDialog(this.$createElement, {
        title: this.$t('表格设置'),
        data: {
          fieldSelected: this.tableFieldSelected
        },
        columns: [{
          prop: 'fieldSelected',
          label: this.$t('选择渲染列'),
          form: {
            component: 'checkboxGroup',
            props: {
              checkboxs: columns.map(function (item) {
                return {
                  label: item.prop,
                  title: item.label
                };
              })
            }
          }
        }],
        onConfirm: function onConfirm(_ref) {
          var fieldSelected = _ref.fieldSelected;
          var data = {
            selected: fieldSelected,
            origin: _this3.tableColumnsProp
          };
          localStorage.setItem(_this3.tableKey, JSON.stringify(data));
          location.reload();
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var h = arguments[0];
      return h("div", {
        "class": "source-page"
      }, [h("div", {
        "class": "source-page-header"
      }, [h("c-source-filter", {
        "attrs": {
          "filter": this.filter
        },
        "ref": "sourceFilter"
      })]), this.renderButtons(), h("c-source-table", {
        "ref": "sourceTable",
        "attrs": {
          "table-height": this.tableHeight,
          "resource": this.resource,
          "table": this.tableProps,
          "columns": this.tableRenderColumns
        }
      }), h("div", {
        "class": "page-bottom"
      }, [h("c-pagination", {
        "attrs": {
          "pagination": this.pagination
        },
        "class": "pagination"
      }), h("el-button", {
        "attrs": {
          "type": "primary",
          "icon": "el-icon-setting"
        },
        "on": {
          "click": this.handleTableSetting
        }
      }, [this.$t('表格设置')])])]);
    }
  }, {
    key: "showCreateButton",
    get: function get() {
      return this.createButtonText;
    }
  }, {
    key: "showExportButton",
    get: function get() {
      return !!this.exportExcelURL;
    }
  }, {
    key: "tableKey",
    get: function get() {
      var key = _get(this, '$route.name');

      return key ? "table_".concat(key) : '';
    }
  }, {
    key: "tableFieldSelected",
    get: function get() {
      var key = this.tableKey;
      var data = localStorage.getItem(key);

      if (data) {
        try {
          var _JSON$parse = JSON.parse(data),
              _JSON$parse$selected = _JSON$parse.selected,
              selected = _JSON$parse$selected === void 0 ? [] : _JSON$parse$selected,
              _JSON$parse$origin = _JSON$parse.origin,
              origin = _JSON$parse$origin === void 0 ? [] : _JSON$parse$origin; // 对比当前版本和之前版本字段


          if (String(origin) === String(this.tableColumnsProp)) {
            return selected;
          }
        } catch (e) {
          localStorage.removeItem(key);
        }
      }

      return this.tableColumns.map(function (item) {
        return item.prop;
      }).filter(Boolean);
    }
  }, {
    key: "tableColumns",
    get: function get() {
      return this.batchActions.length ? [{
        type: 'selection',
        width: 55
      }].concat(this.columns) : this.columns;
    }
  }, {
    key: "tableColumnsProp",
    get: function get() {
      return this.tableColumns.map(function (item) {
        return item.prop;
      }).filter(Boolean);
    }
  }, {
    key: "tableRenderColumns",
    get: function get() {
      var _this4 = this;

      return this.tableColumns.filter(function (item) {
        return !item.prop || _this4.tableFieldSelected.includes(item.prop);
      });
    }
  }, {
    key: "tableProps",
    get: function get() {
      var _this5 = this;

      if (this.batchActions.length) {
        _set(this.table, 'events.selection-change', function (selectedRows) {
          return _this5.selectedRows = selectedRows;
        });
      }

      return this.table;
    }
  }]);

  return SourcePage;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "columns", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "filter", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "pagination", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "table", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "resource", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "createButtonText", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "createPageLocation", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "exportExcelURL", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "batchActions", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { SourcePage as default };</script>
