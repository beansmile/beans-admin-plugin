<script>import "core-js/modules/es7.array.includes";
import "core-js/modules/es6.string.includes";
import "core-js/modules/es6.array.find";
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
import _set from "lodash/set";
import _cloneDeep from "lodash/cloneDeep";
import _uniqBy from "lodash/uniqBy";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import uuid from 'uuid/v4';
import draggable from 'vuedraggable';
import defaultComponents from "./components";
import { arrayMove } from "../../utils";
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
    key: "handleAddComponent",
    value: function handleAddComponent(_ref) {
      var component = _ref.component,
          title = _ref.title,
          name = _ref.name;
      var newComponent = {
        component: component,
        name: name,
        title: title,
        key: uuid()
      };
      this.$emit('change', this.value.concat(newComponent));
      this.currentKey = newComponent.key;
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
    key: "handleSort",
    value: function handleSort(_ref2) {
      var oldIndex = _ref2.oldIndex,
          newIndex = _ref2.newIndex;

      if (oldIndex !== newIndex) {
        this.$emit('change', arrayMove(this.value, oldIndex, newIndex));
      }
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
          "change": function change(e) {
            return _this2.handleComponentDataChange(e, index);
          }
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var h = arguments[0];
      return h("div", {
        "class": "c-page-editor"
      }, [h("div", {
        "class": "box-preview"
      }, [h(draggable, {
        "attrs": {
          "value": this.value
        },
        "on": {
          "end": this.handleSort
        }
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
        }, [index - 1 >= 0 && h("i", {
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
      })]), h("div", {
        "class": "box-components"
      }, [h("h5", {
        "class": "box-title"
      }, ["\u9009\u62E9\u7EC4\u4EF6"]), h("div", {
        "class": "content"
      }, [this.renderComponents.map(function (item) {
        return h("div", {
          "class": "item",
          "key": item.name,
          "on": {
            "click": function click() {
              return _this3.handleAddComponent(item);
            }
          }
        }, [item.title]);
      })])]), h("el-button", {
        "class": "btn-save",
        "attrs": {
          "type": "primary"
        },
        "on": {
          "click": this.handleSave
        }
      }, ["\u4FDD\u5B58"])])]);
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
