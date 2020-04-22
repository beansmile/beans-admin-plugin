<script>import "core-js/modules/es7.object.get-own-property-descriptors";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.object.keys";
import _defineProperty from "@babel/runtime-corejs2/helpers/esm/defineProperty";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
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
import "core-js/modules/es6.number.constructor";
import _uniqBy from "lodash/uniqBy";
import _get from "lodash/get";
import _debounce from "lodash/debounce";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Vue, Component, Prop, Model } from 'vue-property-decorator';
var Select = (_dec = Prop(Function), _dec2 = Prop(Function), _dec3 = Prop(Object), _dec4 = Prop(Array), _dec5 = Model('change', {
  type: [String, Number, Object, Array, Boolean],
  default: ''
}), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(Select, _Vue);

  function Select() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Select);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Select)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "xRemoteSearch", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "xRemotePreload", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "xRemote", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "options", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "value", _descriptor5, _assertThisInitialized(_this));

    _this.localOptions = [];
    _this.localProps = {};
    return _this;
  }

  _createClass(Select, [{
    key: "mounted",
    value: function () {
      var _mounted = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var _this2 = this;

        var search, remoteObj, _ref2, strategy, remoteMethod, _search, _remoteObj;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.xRemotePreload) {
                  _context3.next = 4;
                  break;
                }

                _context3.next = 3;
                return this.xRemotePreload();

              case 3:
                this.localOptions = _context3.sent;

              case 4:
                if (this.xRemoteSearch) {
                  search = _debounce(
                  /*#__PURE__*/
                  function () {
                    var _ref = _asyncToGenerator(
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _callee(keyword) {
                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.next = 2;
                              return _this2.xRemoteSearch(keyword);

                            case 2:
                              return _context.abrupt("return", _this2.localOptions = _context.sent);

                            case 3:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }));

                    return function (_x) {
                      return _ref.apply(this, arguments);
                    };
                  }(), 500);
                  remoteObj = {
                    remote: true,
                    filterable: true,
                    'remote-method': function remoteMethod(keyword) {
                      return keyword && search(keyword);
                    }
                  };
                  this.localProps = Object.assign({}, remoteObj);
                } // TODO 兼容之前的xRemote


                if (!this.xRemote) {
                  _context3.next = 17;
                  break;
                }

                _ref2 = this.xRemote || {}, strategy = _ref2.strategy, remoteMethod = _ref2.remoteMethod;

                if (!strategy) {
                  _context3.next = 17;
                  break;
                }

                if (!(strategy === 'search')) {
                  _context3.next = 14;
                  break;
                }

                _search = _debounce(
                /*#__PURE__*/
                function () {
                  var _ref3 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee2(keyword) {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return remoteMethod(keyword);

                          case 2:
                            return _context2.abrupt("return", _this2.localOptions = _context2.sent);

                          case 3:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x2) {
                    return _ref3.apply(this, arguments);
                  };
                }(), 500);
                _remoteObj = {
                  remote: true,
                  filterable: true,
                  'remote-method': function remoteMethod(keyword) {
                    return keyword && _search(keyword);
                  }
                };
                this.localProps = Object.assign({}, _remoteObj);
                _context3.next = 17;
                break;

              case 14:
                _context3.next = 16;
                return remoteMethod();

              case 16:
                this.localOptions = _context3.sent;

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function mounted() {
        return _mounted.apply(this, arguments);
      }

      return mounted;
    }()
  }, {
    key: "renderOptions",
    value: function renderOptions() {
      var h = this.$createElement;
      var isGroup = this.computedOptions.length && this.computedOptions[0].options && this.computedOptions[0].options.length;

      if (isGroup) {
        return this.computedOptions.map(function (group) {
          return h("el-option-group", {
            "key": group.label,
            "attrs": {
              "label": group.label
            }
          }, [group.options.map(function (option) {
            return h("el-option", {
              "attrs": {
                "label": option.label,
                "value": option.value
              },
              "key": option.value
            });
          })]);
        });
      } else {
        return this.computedOptions.map(function (option) {
          return h("el-option", {
            "attrs": {
              "label": option.label,
              "value": option.value
            },
            "key": option.value
          });
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var h = arguments[0];
      return h("el-select", _mergeJSXProps([{}, {
        "props": _objectSpread({
          value: this.value
        }, this.$attrs, {}, this.localProps)
      }, {
        "on": {
          "change": function change(val) {
            return _this3.$emit('change', val);
          }
        }
      }]), [this.renderOptions()]);
    }
  }, {
    key: "computedOptions",
    get: function get() {
      // 分组select不去重，不合并
      var isGroupOption = _get(this.localOptions, '0.options.length', 0) > 0 || _get(this.options, '0.options.length', 0) > 0;

      if (isGroupOption) {
        return this.localOptions.length ? this.localOptions : this.options || [];
      }

      return _uniqBy((this.localOptions || []).concat(this.options || []), 'value');
    }
  }]);

  return Select;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "xRemoteSearch", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "xRemotePreload", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "xRemote", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "options", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Select as default };</script>
