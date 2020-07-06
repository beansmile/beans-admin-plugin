import "core-js/modules/es7.object.get-own-property-descriptors";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.object.keys";
import _mergeJSXProps3 from "@vue/babel-helper-vue-jsx-merge-props";
import _MessageBox from "element-ui/lib/message-box";
import "regenerator-runtime/runtime";
import _asyncToGenerator from "@babel/runtime-corejs2/helpers/esm/asyncToGenerator";
import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import "core-js/modules/es6.function.name";
import "core-js/modules/es6.number.constructor";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _defineProperty from "@babel/runtime-corejs2/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime-corejs2/helpers/esm/objectWithoutProperties";
import _isArray from "lodash/isArray";
import _flatten from "lodash/flatten";
import _isFunction from "lodash/isFunction";
import _isObject from "lodash/isObject";
import _isString from "lodash/isString";
import _get from "lodash/get";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import Vue from 'vue';
import moment from 'moment';
import { permissionService } from "../services";
import { i18n } from "../i18n"; // eslint-disable-next-line

export var renderCellByType = function renderCellByType(h) {
  return function (_ref) {
    var column = _ref.column,
        scope = _ref.scope;
    var row = scope.row;
    var prop = column.prop,
        renderCell = column.renderCell;

    var value = _get(row, prop);

    var type = _isString(renderCell) ? renderCell : _get(renderCell, 'type');
    var options = _isObject(renderCell) ? renderCell : {};
    if (_isFunction(type)) type = type(scope);

    switch (type) {
      case 'image':
        {
          var _options$width = options.width,
              width = _options$width === void 0 ? '50px' : _options$width,
              _options$height = options.height,
              height = _options$height === void 0 ? '50px' : _options$height,
              _options$borderRadius = options.borderRadius,
              borderRadius = _options$borderRadius === void 0 ? 0 : _options$borderRadius,
              opts = _objectWithoutProperties(options, ["width", "height", "borderRadius"]);

          var fit = opts.fit || opts.objectFit || 'cover';

          var images = _flatten([value]).filter(Boolean);

          if (!images.length) {
            return '/';
          }

          return h("div", {
            "class": "multi-images"
          }, [images.map(function (img, index) {
            var previewSrcList = images.slice(index, images.length).concat(images.slice(0, index));
            return h("el-image", {
              "class": "image",
              "style": _objectSpread({
                width: width,
                height: height,
                borderRadius: borderRadius
              }, opts),
              "attrs": {
                "src": img,
                "fit": fit,
                "preview-src-list": previewSrcList
              }
            });
          })]);
        }

      case 'video':
        {
          var _options$style = options.style,
              style = _options$style === void 0 ? {
            height: '200px'
          } : _options$style;

          if (!value) {
            return '/';
          }

          return h("video", {
            "attrs": {
              "controls": true,
              "src": value
            },
            "style": style
          });
        }

      case 'time':
        {
          var format = options.format || 'YYYY-MM-DD HH:mm';

          if (!value) {
            return '/';
          }

          return moment(value).format(format);
        }

      case 'date':
        {
          var _format = options.format || 'YYYY-MM-DD';

          if (!value) {
            return '/';
          }

          return moment(value).format(_format);
        }

      case 'bool':
        {
          var _options$textArr = options.textArr,
              textArr = _options$textArr === void 0 ? [i18n.t('否'), i18n.t('是')] : _options$textArr,
              _options$classArr = options.classArr,
              classArr = _options$classArr === void 0 ? ['danger', ''] : _options$classArr,
              _opts = _objectWithoutProperties(options, ["textArr", "classArr"]);

          delete _opts['type'];
          var num = +Boolean(value);
          return h("el-tag", _mergeJSXProps([{
            "attrs": {
              "type": classArr[num]
            }
          }, {
            "props": _opts
          }]), [textArr[num]]);
        }

      case 'currency':
        {
          if (!value) {
            return '/';
          }

          if (!+value) {
            return value;
          }

          var _options$length = options.length,
              length = _options$length === void 0 ? 2 : _options$length,
              _options$prefix = options.prefix,
              prefix = _options$prefix === void 0 ? '￥' : _options$prefix;
          return prefix + Number(value).toFixed(length);
        }

      case 'attachment':
        {
          if (!value) return '/';
          var _options$name = options.name,
              name = _options$name === void 0 ? i18n.t('下载') : _options$name;

          var renderLink = function renderLink() {
            var href = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            return h("a", {
              "attrs": {
                "href": href,
                "download": true
              },
              "style": "display: block;"
            }, [h("el-button", {
              "attrs": {
                "type": "primary"
              }
            }, [name])]);
          };

          if (_isArray(value)) {
            return value.map(renderLink);
          }

          return renderLink(value);
        }

      case 'html':
        {
          if (!value) {
            return '/';
          }

          return h("div", _mergeJSXProps2([{
            "class": "markdown-body html-content"
          }, {
            "domProps": {
              innerHTML: value
            }
          }]));
        }

      default:
        return value;
    }
  };
};
export var renderAction = function renderAction(h, _ref2) {
  var resource = _ref2.resource,
      actionButtonMode = _ref2.actionButtonMode,
      actionButtonProps = _ref2.actionButtonProps;
  return function (_ref3) {
    var column = _ref3.column,
        scope = _ref3.scope;
    var actions = [{
      key: 'detail',
      render: function render(_ref4) {
        var location = _ref4.location,
            _ref4$permission = _ref4.permission,
            permission = _ref4$permission === void 0 ? "".concat(resource, ".read") : _ref4$permission,
            _ref4$buttonText = _ref4.buttonText,
            buttonText = _ref4$buttonText === void 0 ? i18n.t('详情') : _ref4$buttonText;
        var routeLocation = location || {
          name: "".concat(resource, ".show"),
          params: {
            id: scope.row.id
          }
        };
        return {
          permission: permission,
          text: buttonText,
          handler: function handler() {
            return Vue.appRouter.push(routeLocation);
          }
        };
      }
    }, {
      key: 'edit',
      render: function render(_ref5) {
        var location = _ref5.location,
            _ref5$permission = _ref5.permission,
            permission = _ref5$permission === void 0 ? "".concat(resource, ".update") : _ref5$permission,
            _ref5$buttonText = _ref5.buttonText,
            buttonText = _ref5$buttonText === void 0 ? i18n.t('编辑') : _ref5$buttonText;
        var routeLocation = location || {
          name: "".concat(resource, ".edit"),
          params: {
            id: scope.row.id
          }
        };
        return {
          permission: permission,
          text: buttonText,
          handler: function handler() {
            return Vue.appRouter.push(routeLocation);
          }
        };
      }
    }, {
      key: 'delete',
      render: function render(_ref6) {
        var handler = _ref6.handler,
            _ref6$permission = _ref6.permission,
            permission = _ref6$permission === void 0 ? "".concat(resource, ".destroy") : _ref6$permission,
            _ref6$buttonText = _ref6.buttonText,
            buttonText = _ref6$buttonText === void 0 ? i18n.t('删除') : _ref6$buttonText;

        var showConfirm =
        /*#__PURE__*/
        function () {
          var _ref7 = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    // eslint-disable-next-line
                    try {
                      _MessageBox.close();
                    } catch (e) {}

                    _context.next = 3;
                    return _MessageBox.confirm(i18n.t('删除操作不可恢复，确定删除？'), buttonText);

                  case 3:
                    _context.t0 = handler;

                    if (!_context.t0) {
                      _context.next = 7;
                      break;
                    }

                    _context.next = 7;
                    return handler(scope);

                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function showConfirm() {
            return _ref7.apply(this, arguments);
          };
        }();

        return {
          permission: permission,
          text: buttonText,
          handler: showConfirm
        };
      }
    }];

    var renderActionButton = function renderActionButton(action) {
      var actionConfig = _get(column, action.key) || {};

      if (_isFunction(actionConfig)) {
        actionConfig = actionConfig(scope);
      }

      if (!actionConfig) return null;
      return column[action.key] && action.render(actionConfig || {});
    }; // extraAction支持Array和Function
    // TODO 类型判断


    var extraAction = _isFunction(column.extraAction) ? column.extraAction(h, scope) : column.extraAction;
    var buttons = actions.map(renderActionButton).concat(extraAction).filter(function (buttonConfig) {
      if (buttonConfig) {
        // 支持权限判断
        return permissionService.hasPermission(buttonConfig.permission);
      }

      return false;
    }); // 第一个按钮（一般是详情）放在外面

    return [buttons.slice(0, 1), buttons.slice(1)].map(function (item) {
      return h("c-dropdown-button", {
        "attrs": {
          "buttons": item,
          "buttonMode": actionButtonMode,
          "buttonProps": actionButtonProps
        }
      });
    });
  };
};
export var sourceColumnRender = function sourceColumnRender(h) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (_ref8) {
    var columns = _ref8.columns,
        column = _ref8.column,
        scope = _ref8.scope;
    var createElement = h;
    var renderCell = column.renderCell,
        prop = column.prop,
        clipboard = column.clipboard;

    var renderedVNode = function renderedVNode() {
      if (prop === 'action') {
        return h("div", {
          "class": "cell-action"
        }, [renderAction(createElement, params)({
          columns: columns,
          column: column,
          scope: scope
        }), _isFunction(renderCell) && renderCell(createElement, scope)]);
      }

      if (_isObject(renderCell)) {
        if (renderCell.template) {
          // TODO 饶了一个圈
          return h("v-node", {
            "attrs": {
              "render-node": function renderNode() {
                return new Vue(renderCell).$mount()._vnode;
              }
            }
          });
        }

        return renderCellByType(createElement)({
          column: column,
          scope: scope
        });
      }

      if (_isFunction(renderCell)) {
        return renderCell(createElement, scope);
      }

      if (_isString(renderCell)) {
        return renderCellByType(createElement)({
          column: column,
          scope: scope
        });
      }

      var value = _get(scope, "row.".concat(prop), '/');

      return value === null || value === '' ? '/' : value;
    };

    var renderClipboard = function renderClipboard(clipboard) {
      var vNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return clipboard ? h("c-clipboard", _mergeJSXProps3([{}, {
        "props": _isObject(clipboard) ? clipboard : {}
      }]), [vNode]) : vNode;
    };

    return renderClipboard(clipboard, renderedVNode());
  };
};