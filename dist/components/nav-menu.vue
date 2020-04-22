<script>import "core-js/modules/web.dom.iterable";
import _toConsumableArray from "@babel/runtime-corejs2/helpers/esm/toConsumableArray";
import "regenerator-runtime/runtime";
import _asyncToGenerator from "@babel/runtime-corejs2/helpers/esm/asyncToGenerator";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import "core-js/modules/es6.function.name";
import _initializerDefineProperty from "@babel/runtime-corejs2/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime-corejs2/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime-corejs2/helpers/esm/initializerWarningHelper";
import _get from "lodash/get";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
var NavMenu = (_dec = Prop(Object), _dec2 = Prop({
  type: Function,
  default: function _default() {
    return true;
  }
}), _dec3 = Prop(Array), _dec4 = Prop(Boolean), _dec5 = Watch('$route.name', {
  immediate: true
}), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(NavMenu, _Vue);

  function NavMenu() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, NavMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(NavMenu)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "menu", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "filter", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "routes", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "replaceRouter", _descriptor4, _assertThisInitialized(_this));

    _this.active = '';
    return _this;
  }

  _createClass(NavMenu, [{
    key: "getTitle",
    value: function getTitle(route) {
      return _get(route, 'meta.title', this.$t('未命名'));
    }
  }, {
    key: "getIcon",
    value: function getIcon(route) {
      return _get(route, 'meta.navbar', '');
    }
  }, {
    key: "handleSelect",
    value: function handleSelect(e) {
      this.$emit('select', e);
    }
  }, {
    key: "renderMenuItem",
    value: function renderMenuItem(route) {
      var h = this.$createElement;
      return route && this.filter(route) && h("c-permission", {
        "attrs": {
          "permission": _get(route, 'meta.permission')
        }
      }, [h("el-menu-item", {
        "key": route.name,
        "attrs": {
          "index": route.name,
          "data-index": route.name
        }
      }, [h("c-router-link", {
        "attrs": {
          "to": {
            name: route.name
          },
          "replace": this.replaceRouter
        }
      }, [h("i", {
        "class": this.getIcon(route)
      }), this.getTitle(route)])])]);
    }
  }, {
    key: "renderSubMenu",
    value: function renderSubMenu(route, index) {
      var _this2 = this;

      var h = this.$createElement;
      // 父级有meta渲染二级路由，父级没有meta当一级路由渲染
      var children = (route.children || []).filter(Boolean);
      return route.meta && children.length ? h("el-submenu", {
        "key": route.name,
        "attrs": {
          "index": String(index)
        }
      }, [h("template", {
        "slot": "title"
      }, [h("div", [h("i", {
        "class": this.getIcon(route)
      }), this.getTitle(route)])]), children.map(function (child) {
        return _this2.renderMenuItem(child);
      })]) : children.map(function (child) {
        return _this2.renderMenuItem(child);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var h = arguments[0];
      return h("el-menu", _mergeJSXProps([{
        "class": "c-nav-menu",
        "ref": "menu",
        "attrs": {
          "default-active": this.active
        }
      }, {
        "props": this.menu
      }, {
        "on": {
          "select": this.handleSelect
        }
      }]), [this.routes.map(function (route, index) {
        return route && route.children ? _this3.renderSubMenu(route, index) : _this3.renderMenuItem(route, index);
      })]);
    }
  }, {
    key: "onRouteChange",
    value: function () {
      var _onRouteChange = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var menuEle, menuItem;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.$nextTick();

              case 2:
                menuEle = this.$refs.menu.$el; // 计算当前高亮菜单

                menuItem = _get(_toConsumableArray(menuEle.querySelectorAll('.router-link-active')).pop(), 'parentNode');
                menuItem && (this.active = menuItem.dataset.index); // 删除没有子菜单的父菜单

                _toConsumableArray(menuEle.querySelectorAll('.el-submenu .el-menu')).forEach(function (item) {
                  if (!item.children.length) {
                    menuEle.removeChild(item.parentNode);
                  }
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onRouteChange() {
        return _onRouteChange.apply(this, arguments);
      }

      return onRouteChange;
    }()
  }]);

  return NavMenu;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "menu", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "filter", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "routes", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "replaceRouter", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "onRouteChange", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "onRouteChange"), _class2.prototype)), _class2)) || _class);
export { NavMenu as default };</script>
