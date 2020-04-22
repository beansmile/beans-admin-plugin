<script>import "core-js/modules/es7.object.get-own-property-descriptors";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.object.keys";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import "core-js/modules/es6.function.name";
import "core-js/modules/es6.array.find";
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

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Vue, Component, Prop } from 'vue-property-decorator';
import { sourceColumnRender } from "./source-render";
import { loadingService } from "../services";
var SourceDetail = (_dec = Prop({
  type: Array,
  default: function _default() {
    return [];
  }
}), _dec2 = Prop({
  type: Array,
  default: function _default() {
    return [];
  }
}), _dec3 = Prop(Object), _dec4 = Prop({
  type: String
}), _dec5 = Prop({
  type: Object,
  default: function _default() {
    return {};
  }
}), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(SourceDetail, _Vue);

  function SourceDetail() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SourceDetail);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SourceDetail)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "pages", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "columns", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "scope", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "resource", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "data", _descriptor5, _assertThisInitialized(_this));

    _this.activeTab = '0';
    _this.tabSessionKey = '';
    return _this;
  }

  _createClass(SourceDetail, [{
    key: "created",
    value: function created() {
      var TAB_SESSION_STORAGE_KEY = 'tab_session';
      var path = this.$route.path;
      this.tabSessionKey = TAB_SESSION_STORAGE_KEY + path;
      this.activeTab = this.getTabSession();
    }
  }, {
    key: "removeTabSession",
    value: function removeTabSession() {
      return sessionStorage.removeItem(this.tabSessionKey);
    }
  }, {
    key: "getTabSession",
    value: function getTabSession() {
      return sessionStorage.getItem(this.tabSessionKey);
    }
  }, {
    key: "setTabSession",
    value: function setTabSession(value) {
      var activeTab = String(value);
      this.activeTab = activeTab;
      sessionStorage.setItem(this.tabSessionKey, activeTab);
    }
  }, {
    key: "renderCell",
    value: function renderCell(columns, column) {
      var extra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var scope = this.scope || {
        row: this.data
      };
      return sourceColumnRender(this.$createElement, _objectSpread({
        resource: this.resource
      }, extra))({
        columns: columns,
        column: column,
        scope: scope
      });
    }
  }, {
    key: "getClass",
    value: function getClass(column) {
      return "item item-".concat(column.prop);
    }
  }, {
    key: "renderColumns",
    value: function renderColumns(columns) {
      var _this2 = this;

      var h = this.$createElement;
      var showColumns = columns.filter(function (item) {
        return (item.action || []).indexOf('hide-in-detail') === -1;
      });
      var detailColumns = showColumns.filter(function (item) {
        return item.prop !== 'action';
      });
      var actionColumn = showColumns.find(function (item) {
        return item.prop === 'action';
      });
      return h("div", {
        "class": "render-columns"
      }, [h("div", {
        "class": "content"
      }, [detailColumns.map(function (column) {
        return h("div", {
          "class": _this2.getClass(column),
          "key": column.prop
        }, [h("div", {
          "class": "label"
        }, [column.label, "\uFF1A"]), h("div", {
          "class": "value"
        }, [_this2.renderCell(columns, column)])]);
      })]), actionColumn && h("div", {
        "class": "toolbar-action"
      }, [this.renderCell(this.columns, actionColumn, {
        actionButtonMode: true,
        actionButtonProps: {
          type: 'primary'
        }
      })])]);
    }
  }, {
    key: "renderComponent",
    value: function renderComponent(component) {
      var h = this.$createElement;
      // eslint-disable-next-line
      return h("div", {
        "class": "render-component"
      }, [h("v-node", {
        "attrs": {
          "renderNode": function renderNode(h) {
            return component;
          }
        }
      })]);
    }
  }, {
    key: "renderPages",
    value: function renderPages() {
      var _this3 = this;

      var h = this.$createElement;
      var event = {
        'tab-click': function tabClick(_ref) {
          var name = _ref.name;

          _this3.setTabSession(name);
        }
      };
      var activeTab = (+this.activeTab > this.pages.length - 1 ? '0' : this.activeTab) || '0';
      return h("el-tabs", _mergeJSXProps([{
        "attrs": {
          "type": "border-card",
          "value": activeTab
        }
      }, {
        "on": event
      }]), [this.pages.map(function (page, index) {
        return h("el-tab-pane", {
          "attrs": {
            "label": page.name || page.label,
            "name": String(index)
          }
        }, [activeTab === String(index) && (page.columns ? _this3.renderColumns(page.columns) : _this3.renderComponent(page.component))]);
      })]);
    }
  }, {
    key: "render",
    value: function render() {
      var h = arguments[0];
      return h("div", {
        "class": "c-source-detail",
        "directives": [{
          name: "loading",
          value: loadingService.state.count > 0
        }]
      }, [this.columns.length ? this.renderColumns(this.columns) : this.renderPages()]);
    }
  }]);

  return SourceDetail;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "pages", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "columns", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "scope", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "resource", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "data", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { SourceDetail as default };</script>
