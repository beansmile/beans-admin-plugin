<template>
  <div class="c-sku-editor">
    <h4 class="page-header">{{ title }}</h4>

    <div style="margin-bottom: 20px">
      <el-button @click="handleAddProperty" type="primary">新建规格</el-button>
    </div>

    <el-form label-position="right" label-width="auto">
      <el-form-item
        v-for="property in localSkuProperties"
        :key="property.text"
      >
        <template v-slot:label>
          <div>
            {{ property.text }}
            <el-button style="margin-left: 10px" size="mini" icon="el-icon-plus" circle @click="handleAddPropertyValue(property.value, property.text)"></el-button>
            <el-button style="margin-left: 10px" size="mini" icon="el-icon-edit" circle @click="handleEditPropertyText(property.value, property.text)"></el-button>
          </div>
        </template>
        <el-select
          v-model="propertySelected[property.value]"
          multiple
          filterable
          default-first-option
          @change="onPropertySelected"
        >
          <el-option
            v-for="item in property.children"
            :key="item.text"
            :label="item.text"
            :value="item.value"
          >
            <el-button style="margin-right: 10px" size="mini" icon="el-icon-edit" circle @click.stop="handleEditPropertyValueText(item.value, item.text)"></el-button>
            <span>{{ item.text }}</span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <c-source-table
      :columns="tableColumns"
      :table="{ data: value, border: true }"
    />

  </div>
</template>

<script>import "core-js/modules/es7.object.get-own-property-descriptors";
import "core-js/modules/es6.object.keys";
import "core-js/modules/web.dom.iterable";
import _defineProperty from "@babel/runtime-corejs2/helpers/esm/defineProperty";
import "core-js/modules/es6.array.sort";
import "core-js/modules/es6.array.find";
import "core-js/modules/es6.regexp.split";
import _slicedToArray from "@babel/runtime-corejs2/helpers/esm/slicedToArray";
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
import _uniq from "lodash/uniq";
import _reduce from "lodash/reduce";
import _forEach from "lodash/forEach";
import _get from "lodash/get";
import _cloneDeep from "lodash/cloneDeep";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Vue, Component, Prop, Model } from 'vue-property-decorator';
var SkuEditor = (_dec = Prop({
  type: String,
  default: 'sku信息'
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
}), _dec4 = Model('change', {
  type: Array,
  default: function _default() {
    return [];
  }
}), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(SkuEditor, _Vue);

  function SkuEditor() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SkuEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SkuEditor)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "title", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "skuProperties", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "skuColumns", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "value", _descriptor4, _assertThisInitialized(_this));

    _this.propertySelected = {};
    return _this;
  }

  _createClass(SkuEditor, [{
    key: "mounted",
    value: function mounted() {
      if (this.value.length) {
        this.propertySelected = this.initPropertySelected(this.value);
      }
    }
  }, {
    key: "handleSkuChange",
    value: function handleSkuChange($index, prop, value) {
      var skus = _cloneDeep(this.value);

      skus[$index][prop] = value[prop];
      this.$emit('change', skus);
    }
  }, {
    key: "handleAddProperty",
    value: function () {
      var _handleAddProperty = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref, value;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.$prompt('请输入规格名', '新建规格', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消'
                });

              case 2:
                _ref = _context.sent;
                value = _ref.value;

                if (value) {
                  this.$emit('add-property', value);
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleAddProperty() {
        return _handleAddProperty.apply(this, arguments);
      }

      return handleAddProperty;
    }()
  }, {
    key: "handleAddPropertyValue",
    value: function () {
      var _handleAddPropertyValue = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(propertyCategory, propertyCategoryText) {
        var _ref2, value;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.$prompt('请输入规格值', propertyCategoryText, {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消'
                });

              case 2:
                _ref2 = _context2.sent;
                value = _ref2.value;

                if (value) {
                  this.$emit('add-property-value', {
                    value: value,
                    id: propertyCategory
                  });
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleAddPropertyValue(_x, _x2) {
        return _handleAddPropertyValue.apply(this, arguments);
      }

      return handleAddPropertyValue;
    }()
  }, {
    key: "handleEditPropertyText",
    value: function () {
      var _handleEditPropertyText = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(propertyValue, valueText) {
        var _ref3, value;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.$prompt('请输入新名称', valueText, {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消'
                });

              case 2:
                _ref3 = _context3.sent;
                value = _ref3.value;

                if (value) {
                  this.$emit('edit-property-text', {
                    value: value,
                    id: propertyValue
                  });
                }

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function handleEditPropertyText(_x3, _x4) {
        return _handleEditPropertyText.apply(this, arguments);
      }

      return handleEditPropertyText;
    }()
  }, {
    key: "handleEditPropertyValueText",
    value: function () {
      var _handleEditPropertyValueText = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(propertyValue, valueText) {
        var _ref4, value;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.$prompt('请输入新名称', valueText, {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消'
                });

              case 2:
                _ref4 = _context4.sent;
                value = _ref4.value;

                if (value) {
                  this.$emit('edit-property-value-text', {
                    value: value,
                    id: propertyValue
                  });
                }

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function handleEditPropertyValueText(_x5, _x6) {
        return _handleEditPropertyValueText.apply(this, arguments);
      }

      return handleEditPropertyValueText;
    }()
  }, {
    key: "getPropertyText",
    value: function getPropertyText(property) {
      var _property$split = property.split(':'),
          _property$split2 = _slicedToArray(_property$split, 2),
          propertyCategory = _property$split2[0],
          propertyValue = _property$split2[1];

      var propertyItem = this.skuProperties.find(function (item) {
        return String(item.value) === String(propertyCategory);
      });

      if (!propertyItem) {
        return '';
      }

      var childItem = _get(propertyItem, 'children', []).find(function (item) {
        return String(item.value) === String(propertyValue);
      });

      if (!childItem) {
        return '';
      }

      return childItem.text;
    }
  }, {
    key: "getSortedProperties",
    value: function getSortedProperties(property) {
      return property.split(';').sort().join(';');
    }
  }, {
    key: "onPropertySelected",
    value: function () {
      var _onPropertySelected = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var _this2 = this;

        var propertySelected, skuProperties, skus;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.$nextTick();

              case 2:
                propertySelected = {};

                _forEach(this.propertySelected, function (val, key) {
                  propertySelected[key] = val.map(function (item) {
                    return "".concat(key, ":").concat(item);
                  });
                });

                skuProperties = _reduce(propertySelected, function (accumulator, currentValue) {
                  if (!accumulator.length || !currentValue.length) {
                    return currentValue.concat(accumulator);
                  }

                  var data = [];

                  for (var i = 0; i < currentValue.length; i++) {
                    for (var j = 0; j < accumulator.length; j++) {
                      data.push("".concat(currentValue[i], ";").concat(accumulator[j]));
                    }
                  }

                  return data;
                }, []);
                skus = skuProperties.map(function (properties) {
                  var propertiesSorted = _this2.getSortedProperties(properties);

                  var current = _this2.value.find(function (sku) {
                    return _this2.getSortedProperties(sku.properties) === propertiesSorted;
                  });

                  return _objectSpread({
                    properties: propertiesSorted
                  }, current);
                });
                this.$emit('change', skus);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function onPropertySelected() {
        return _onPropertySelected.apply(this, arguments);
      }

      return onPropertySelected;
    }()
  }, {
    key: "initPropertySelected",
    value: function initPropertySelected() {
      var skus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var selected = {};
      skus.forEach(function (_ref5) {
        var properties = _ref5.properties;
        properties.split(';').forEach(function (item) {
          var _item$split = item.split(':'),
              _item$split2 = _slicedToArray(_item$split, 2),
              propertyCategory = _item$split2[0],
              propertyValue = _item$split2[1];

          if (selected[propertyCategory]) {
            selected[propertyCategory].push(propertyValue);
          } else {
            selected[String(propertyCategory)] = [String(propertyValue)];
          }
        });
      }); // 去重

      _forEach(selected, function (values, key) {
        selected[key] = _uniq(values);
      });

      return selected;
    }
  }, {
    key: "localSkuProperties",
    get: function get() {
      return this.skuProperties.map(function (item) {
        return _objectSpread({}, item, {
          value: String(item.value),
          children: item.children.map(function (child) {
            return _objectSpread({}, child, {
              value: String(child.value)
            });
          })
        });
      });
    }
  }, {
    key: "tableColumns",
    get: function get() {
      var _this3 = this;

      var h = this.$createElement;
      var propertyColumn = {
        prop: 'properties',
        label: '规格',
        renderCell: function renderCell(h, _ref6) {
          var row = _ref6.row;
          return row.properties.split(';').map(_this3.getPropertyText).join('、');
        }
      };
      var columns = this.skuColumns.map(function (item) {
        return _objectSpread({
          renderCell: item.form ? function (h, _ref7) {
            var row = _ref7.row,
                $index = _ref7.$index;
            return h("c-source-form-item", {
              "attrs": {
                "in-form": false,
                "column": item,
                "value": row
              },
              "on": {
                "change": function change(val) {
                  return _this3.handleSkuChange($index, item.prop, val);
                }
              }
            });
          } : undefined
        }, item);
      });
      return [propertyColumn].concat(columns);
    }
  }]);

  return SkuEditor;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "skuProperties", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "skuColumns", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { SkuEditor as default };</script>
