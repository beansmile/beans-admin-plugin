import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.object.keys";
import "core-js/modules/es7.array.includes";
import "core-js/modules/es6.string.includes";
import "core-js/modules/es6.regexp.split";
import _slicedToArray from "@babel/runtime-corejs2/helpers/esm/slicedToArray";
import "regenerator-runtime/runtime";
import _asyncToGenerator from "@babel/runtime-corejs2/helpers/esm/asyncToGenerator";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _flatten from "lodash/flatten";
import _isFunction from "lodash/isFunction";
import { fly } from "../utils";
import Vue from 'vue';

var PermissionService =
/*#__PURE__*/
function () {
  function PermissionService() {
    _classCallCheck(this, PermissionService);

    this.PERMISSION_STORAGE_KEY = 'permissionMap';
    this.permissionMap = Vue.observable({});
    this.usePermission = false;
  }

  _createClass(PermissionService, [{
    key: "getPermissionMapFromStorage",
    value: function getPermissionMapFromStorage() {
      try {
        return JSON.parse(window.sessionStorage.getItem(this.PERMISSION_STORAGE_KEY));
      } catch (e) {
        return null;
      }
    }
  }, {
    key: "savePermissionMapToStorage",
    value: function savePermissionMapToStorage(data) {
      window.sessionStorage.setItem(this.PERMISSION_STORAGE_KEY, JSON.stringify(data));
    }
  }, {
    key: "removePermissionMapToStorage",
    value: function removePermissionMapToStorage() {
      window.sessionStorage.removeItem(this.PERMISSION_STORAGE_KEY);
    }
  }, {
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _Vue$appConfig$permis, request_url, getPermissionMap, permissionMap, abilities, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _Vue$appConfig$permis = Vue.appConfig.permission, request_url = _Vue$appConfig$permis.request_url, getPermissionMap = _Vue$appConfig$permis.getPermissionMap;

                if (!(request_url || _isFunction(getPermissionMap))) {
                  _context.next = 19;
                  break;
                }

                this.usePermission = true;
                permissionMap = this.getPermissionMapFromStorage();

                if (!permissionMap) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", this.permissionMap = permissionMap);

              case 6:
                abilities = [];

                if (!getPermissionMap) {
                  _context.next = 13;
                  break;
                }

                _context.next = 10;
                return getPermissionMap();

              case 10:
                abilities = _context.sent;
                _context.next = 17;
                break;

              case 13:
                _context.next = 15;
                return fly.get(request_url);

              case 15:
                data = _context.sent;
                abilities = data.abilities;

              case 17:
                this.savePermissionMapToStorage(abilities);
                return _context.abrupt("return", this.permissionMap = abilities);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "destroyPermission",
    value: function destroyPermission() {
      this.permissionMap = {};
      this.removePermissionMapToStorage();
    }
  }, {
    key: "hasPermission",
    value: function hasPermission(permissionFlag) {
      var _this = this;

      var hasPermission = Vue.appConfig.permission.hasPermission;

      if (_isFunction(hasPermission)) {
        return hasPermission(permissionFlag, this.permissionMap);
      }

      if (!permissionFlag || !this.usePermission) return true;

      var needPermissions = _flatten([permissionFlag]);

      return needPermissions.filter(function (item) {
        var _item$split = item.split('.'),
            _item$split2 = _slicedToArray(_item$split, 2),
            _item$split2$ = _item$split2[0],
            resource = _item$split2$ === void 0 ? '' : _item$split2$,
            _item$split2$2 = _item$split2[1],
            action = _item$split2$2 === void 0 ? '' : _item$split2$2;

        return (_this.permissionMap[resource] || []).includes(action);
      }).length === needPermissions.length;
    }
  }, {
    key: "inited",
    get: function get() {
      return !!Object.keys(this.permissionMap).length;
    }
  }]);

  return PermissionService;
}();

export var permissionService = new PermissionService();