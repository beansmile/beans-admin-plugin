<script>import "core-js/modules/es7.array.includes";
import "core-js/modules/es6.string.includes";
import "regenerator-runtime/runtime";
import _asyncToGenerator from "@babel/runtime-corejs2/helpers/esm/asyncToGenerator";
import "core-js/modules/es6.function.name";
import "core-js/modules/es6.array.find";
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
import _set from "lodash/set";
import _cloneDeep from "lodash/cloneDeep";
import _uniqBy from "lodash/uniqBy";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import uuid from 'uuid/v4';
import draggable from 'vuedraggable';
import defaultComponents from "./components";
import { arrayMove } from "../../utils";
import "./devices.css";
var PageEditor = (_dec = Model('change', {
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
  type: Array,
  default: function _default() {
    return [];
  }
}), _dec4 = Prop({
  type: Object,
  default: function _default() {
    return {};
  }
}), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(PageEditor, _Vue);

  function PageEditor() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PageEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PageEditor)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "customComponents", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "useComponents", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "data", _descriptor4, _assertThisInitialized(_this));

    _this.currentKey = '';
    return _this;
  }

  _createClass(PageEditor, [{
    key: "handleFocusComponent",
    value: function handleFocusComponent(key) {
      this.currentKey = key;
    }
  }, {
    key: "handleDelete",
    value: function handleDelete(e, $index) {
      e.stopPropagation();

      var value = _cloneDeep(this.value);

      value.splice($index, 1);
      this.$emit('change', value);
    }
  }, {
    key: "handleUp",
    value: function handleUp(e, $index) {
      e.stopPropagation();
      this.$emit('change', arrayMove(this.value, $index - 1, $index));
    }
  }, {
    key: "handleDown",
    value: function handleDown(e, $index) {
      e.stopPropagation();
      this.$emit('change', arrayMove(this.value, $index, $index + 1));
    }
  }, {
    key: "handleSave",
    value: function handleSave() {
      this.$emit('submit', this.value);
    }
  }, {
    key: "handleComponentDataChange",
    value: function handleComponentDataChange(data, index) {
      var value = _cloneDeep(this.value);

      _set(value[index], 'data', data);

      this.$emit('change', value);
    }
  }, {
    key: "renderComponent",
    value: function renderComponent(row, index) {
      var _this2 = this;

      var h = this.$createElement;

      var component = _get(this.renderComponents.find(function (item) {
        return item.name === row.name;
      }), 'component');

      if (!component) {
        return null;
      }

      return h(component, {
        "attrs": {
          "value": row.data,
          "data": this.data,
          "show-controller": this.currentKey === row.key
        },
        "on": {
          "close": function close() {
            return _this2.currentKey = '';
          },
          "change": function change(e) {
            return _this2.handleComponentDataChange(e, index);
          }
        }
      });
    }
  }, {
    key: "handleMove",
    value: function handleMove(_ref) {
      var oldIndex = _ref.oldIndex,
          newIndex = _ref.newIndex;

      if (oldIndex !== newIndex) {
        this.$emit('change', arrayMove(this.value, oldIndex, newIndex));
      }
    }
  }, {
    key: "handleAddByClick",
    value: function () {
      var _handleAddByClick = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(component) {
        var oDraggableContent;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.handleAdd(component);
                _context.next = 3;
                return this.$nextTick();

              case 3:
                oDraggableContent = _get(this.$refs.draggableContent, '$el');

                if (oDraggableContent) {
                  oDraggableContent.scrollTop = 99999;
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleAddByClick(_x) {
        return _handleAddByClick.apply(this, arguments);
      }

      return handleAddByClick;
    }()
  }, {
    key: "handleAdd",
    value: function handleAdd(_ref2) {
      var component = _ref2.component,
          title = _ref2.title,
          name = _ref2.name;
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
      var newComponent = {
        component: component,
        name: name,
        title: title,
        key: uuid()
      };

      var value = _cloneDeep(this.value);

      value.splice(index, 0, newComponent);
      this.$emit('change', value);
      this.currentKey = newComponent.key;
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      var moved = e.moved,
          added = e.added;

      if (moved) {
        this.handleMove(moved);
      }

      if (added) {
        this.handleAdd(added.element, added.newIndex);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var h = arguments[0];
      return h("div", {
        "class": "c-page-editor"
      }, [h("portal-target", {
        "attrs": {
          "name": "page-editor",
          "multiple": true
        }
      }), h("div", {
        "class": "page-content"
      }, [h("div", {
        "class": "box-components"
      }, [h("h2", [this.$t('选择模块')]), h(draggable, {
        "class": "content",
        "attrs": {
          "sort": false,
          "group": {
            name: 'component',
            pull: 'clone',
            put: false
          },
          "value": this.renderComponents
        }
      }, [this.renderComponents.map(function (item) {
        return h("el-button", {
          "attrs": {
            "size": "medium",
            "icon": item.icon
          },
          "key": item.name,
          "class": "item",
          "on": {
            "click": function click() {
              return _this3.handleAddByClick(item);
            }
          }
        }, [_this3.$t(item.title)]);
      })])]), h("div", {
        "class": "box-preview"
      }, [h("div", {
        "class": "marvel-device iphone8 gold"
      }, [h("div", {
        "class": "top-bar"
      }), h("div", {
        "class": "sleep"
      }), h("div", {
        "class": "volume"
      }), h("div", {
        "class": "camera"
      }), h("div", {
        "class": "sensor"
      }), h("div", {
        "class": "speaker"
      }), h("div", {
        "class": "screen"
      }, [h(draggable, {
        "class": "device-content",
        "attrs": {
          "value": this.value,
          "group": "component"
        },
        "on": {
          "change": this.handleChange
        },
        "ref": "draggableContent"
      }, [this.value.map(function (row, index) {
        return h("div", {
          "key": row.key,
          "class": "item-component ".concat(_this3.currentKey === row.key && 'active'),
          "on": {
            "click": function click() {
              return _this3.handleFocusComponent(row.key);
            }
          }
        }, [h("div", {
          "class": "box-control"
        }, [h("i", [_this3.$t(row.title)]), index - 1 >= 0 && h("i", {
          "class": "el-icon-arrow-up",
          "on": {
            "click": function click(e) {
              return _this3.handleUp(e, index);
            }
          }
        }), index + 1 < _this3.value.length && h("i", {
          "class": "el-icon-arrow-down",
          "on": {
            "click": function click(e) {
              return _this3.handleDown(e, index);
            }
          }
        }), h("i", {
          "class": "el-icon-delete",
          "on": {
            "click": function click(e) {
              return _this3.handleDelete(e, index);
            }
          }
        })]), _this3.renderComponent(row, index)]);
      })])]), h("div", {
        "class": "home"
      }), h("div", {
        "class": "bottom-bar"
      })])])]), h("el-button", {
        "attrs": {
          "size": "medium",
          "type": "primary"
        },
        "class": "btn-save",
        "on": {
          "click": this.handleSave
        }
      }, [this.$t('保存')])]);
    }
  }, {
    key: "renderComponents",
    get: function get() {
      var _this4 = this;

      // 组件name不能重复
      var useedDefaultComponents = this.useComponents.length ? defaultComponents.filter(function (item) {
        return _this4.useComponents.includes(item.name);
      }) : defaultComponents;
      return _uniqBy(useedDefaultComponents.concat(this.customComponents), 'name');
    }
  }]);

  return PageEditor;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "customComponents", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "useComponents", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "data", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { PageEditor as default };</script>
