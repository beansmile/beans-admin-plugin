<template>
  <div class="c-contact-service">
    <template v-for="(item, index) in value.data">
      <img class="image" :key="index" :src="item.src" v-if="item.src" />
    </template>

    <ControlBox :title="$t('pageEditor.客服')" :visible="showController" @close="$emit('close')">

      <el-form @submit.native.prevent label-position="left" label-width="auto">
        <el-form-item :label="$t('pageEditor.需要复制的客服名字')">
          <c-uncontrolled-input v-model="value.config.text" @change="syncChange" :placeholder="$t('pageEditor.默认直接联系小程序客服')"/>
        </el-form-item>
      </el-form>

      <c-source-table :table="{ data: value.data }" :columns="columns" class="source-table"/>
    </ControlBox>
  </div>
</template>

<script>import _initializerDefineProperty from "@babel/runtime-corejs2/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime-corejs2/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime-corejs2/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

import { Vue, Component, Model, Prop } from 'vue-property-decorator';
import ControlBox from "../control-box";
var ContactService = (_dec = Component({
  components: {
    ControlBox: ControlBox
  }
}), _dec2 = Model('change', {
  type: Object,
  default: function _default() {
    return {
      data: [{
        src: ''
      }],
      config: {
        text: ''
      }
    };
  }
}), _dec3 = Prop(Boolean), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(ContactService, _Vue);

  function ContactService() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ContactService);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ContactService)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "showController", _descriptor2, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(ContactService, [{
    key: "mounted",
    value: function mounted() {
      this.syncChange();
    }
  }, {
    key: "syncChange",
    value: function syncChange() {
      this.$emit('change', this.value);
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(imageUrl) {
      this.$set(this.value.data[0], 'src', imageUrl);
      this.syncChange();
    }
  }, {
    key: "columns",
    get: function get() {
      var _this2 = this;

      var h = this.$createElement;
      return [{
        prop: 'src',
        label: this.$t('pageEditor.图片'),
        renderCell: function renderCell(h, _ref) {
          var row = _ref.row;
          return h("c-upload-form-item", {
            "attrs": {
              "value": row.src
            },
            "on": {
              "change": function change(imageUrl) {
                return _this2.handleSubmit(imageUrl);
              }
            }
          });
        }
      }];
    }
  }]);

  return ContactService;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "showController", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { ContactService as default };</script>

<style scoped>
  .image {
    width: 100%;
    height: auto;
    object-fit: cover;
    vertical-align: top;
  }

  .source-table .img {
    width: 100%;
    height: auto;
  }
</style>
