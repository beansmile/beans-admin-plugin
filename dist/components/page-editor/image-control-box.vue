<template>
  <div class="c-image-control-box">
    <ControlBox :title="title">
      <slot />
      <el-button class="btn-add" type="primary" @click="handleAdd">添加图片</el-button>
      <c-source-table :table="{ data: value }" :columns="columns" />
    </ControlBox>
  </div>
</template>

<script>import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import "core-js/modules/es6.string.link";
import _initializerDefineProperty from "@babel/runtime-corejs2/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime-corejs2/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime-corejs2/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import ControlBox from "./control-box";
var ImageControlBox = (_dec = Component({
  components: {
    ControlBox: ControlBox
  }
}), _dec2 = Model('change', {
  type: Array,
  default: function _default() {
    return [];
  }
}), _dec3 = Prop({
  type: Array,
  default: function _default() {
    return [];
  }
}), _dec4 = Prop(String), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(ImageControlBox, _Vue);

  function ImageControlBox() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ImageControlBox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ImageControlBox)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "links", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "title", _descriptor3, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(ImageControlBox, [{
    key: "syncChange",
    value: function syncChange() {
      this.$emit('change', this.value);
    }
  }, {
    key: "handleAdd",
    value: function handleAdd() {
      var newImage = {
        src: '',
        link: ''
      };
      this.value.push(newImage);
      this.syncChange();
    }
  }, {
    key: "handleDelete",
    value: function handleDelete($index) {
      this.value.splice($index, 1);
      this.syncChange();
    }
  }, {
    key: "handleUpdateImage",
    value: function handleUpdateImage(imageInfo, $index) {
      this.$set(this.value[$index], 'src', imageInfo.src);
      this.$set(this.value[$index], 'width', imageInfo.width);
      this.$set(this.value[$index], 'height', imageInfo.height);
      this.syncChange();
    }
  }, {
    key: "handleUpdateLink",
    value: function handleUpdateLink(link, $index) {
      this.$set(this.value[$index], 'link', link);
      this.syncChange();
    }
  }, {
    key: "handleUp",
    value: function handleUp($index) {
      var current = this.value.splice($index, 1)[0];
      this.value.splice($index - 1, 0, current);
      this.syncChange();
    }
  }, {
    key: "handleDown",
    value: function handleDown($index) {
      var current = this.value.splice($index, 1)[0];
      this.value.splice($index + 1, 0, current);
      this.syncChange();
    }
  }, {
    key: "columns",
    get: function get() {
      var _this2 = this;

      var h = this.$createElement;
      return [{
        prop: 'src',
        label: '图片',
        renderCell: function renderCell(h, _ref) {
          var row = _ref.row,
              $index = _ref.$index;
          return h("c-upload-form-item", {
            "attrs": {
              "value": row.src
            },
            "on": {
              "submit": function submit(imageInfoArr) {
                return _this2.handleUpdateImage(imageInfoArr[0], $index);
              },
              "delete": function _delete() {
                return _this2.handleUpdateImage({
                  src: '',
                  width: 0,
                  height: 0
                }, $index);
              }
            }
          });
        }
      }, {
        prop: 'link',
        label: '跳转链接',
        renderCell: function renderCell(h, _ref2) {
          var row = _ref2.row,
              $index = _ref2.$index;
          var selectProps = {
            value: row.link,
            options: _this2.links,
            filterable: true
          };
          return h("c-select", _mergeJSXProps([{}, {
            "props": selectProps
          }, {
            "attrs": {
              "filterable": true,
              "clearable": true
            },
            "on": {
              "change": function change(val) {
                return _this2.handleUpdateLink(val, $index);
              }
            }
          }]));
        }
      }, {
        prop: 'action',
        label: '操作',
        extraAction: function extraAction(h, _ref3) {
          var $index = _ref3.$index;
          return [$index - 1 >= 0 && {
            title: '上移',
            handler: function handler() {
              return _this2.handleUp($index);
            }
          }, $index + 1 < _this2.value.length && {
            title: '下移',
            handler: function handler() {
              return _this2.handleDown($index);
            }
          }, {
            title: '移除图片',
            handler: function handler() {
              return _this2.handleDelete($index);
            }
          }];
        }
      }];
    }
  }]);

  return ImageControlBox;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "links", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { ImageControlBox as default };</script>
