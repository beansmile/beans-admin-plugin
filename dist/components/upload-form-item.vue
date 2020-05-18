<template>
  <div class="upload-form-item">
    <draggable
      :value="filesResouces"
      class="resource-content"
      :class="{ column: type !== 'image' || type !== 'video' }"
      @end="handleDragChange"
    >
      <template v-for="(item, index) in filesResouces">
        <div class="item-resource item-image" v-if="type === 'image'" :key="index">
          <i class="el-icon-close btn-close" @click.stop="handleDelete(index)"></i>
          <el-image :src="item" class="image" :preview-src-list="imagePreview ? filesResouces : []" fit="cover" />
        </div>
        <div class="item-resource item-video" v-else-if="type === 'video'" :key="index">
          <i class="el-icon-close btn-close" @click="handleDelete(index)"></i>
          <video class="video" :src="item"/>
        </div>
        <div v-else :key="index" style="width: 100%">
          <a :href="item" style="display: block;" class="download-url" download>{{
            item.split('/').pop() }}</a>
        </div>
      </template>
    </draggable>
    <div v-if="filesResouces.length > 1" class="drag-tip">可拖拽排序</div>
    <el-button type="primary" @click="handleShow" :disabled="isMultiple && filesResouces.length >= limit">{{ $t('上传') }}<i
      class="el-icon-upload el-icon--right"></i></el-button>

    <el-dialog
      v-if="show"
      :visible="visible"
      append-to-body
      :title="$t('上传')"
      custom-class="upload-dialog"
      @close="handleHide"
      @closed="handleClosed"
    >
      <c-upload
        v-bind="$attrs"
        :limit="isMultiple ? limit - filesResouces.length : 1"
        @change="handleSubmit"
        @cancel="handleHide"
      />
    </el-dialog>
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
import "core-js/modules/es6.number.constructor";
import _isArray from "lodash/isArray";
import _flatten from "lodash/flatten";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import { arrayMove } from "../utils";
import draggable from 'vuedraggable';
var UploadFormItem = (_dec = Component({
  components: {
    draggable: draggable
  }
}), _dec2 = Prop({
  type: Number,
  default: 1
}), _dec3 = Prop({
  type: String,
  default: 'image'
}), _dec4 = Prop({
  type: String,
  default: true
}), _dec5 = Model('change', {
  type: [Array, String]
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(UploadFormItem, _Vue);

  function UploadFormItem() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, UploadFormItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(UploadFormItem)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "limit", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "type", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "imagePreview", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "value", _descriptor4, _assertThisInitialized(_this));

    _this.visible = false;
    _this.show = true;
    return _this;
  }

  _createClass(UploadFormItem, [{
    key: "handleDragChange",
    value: function handleDragChange(_ref) {
      var oldIndex = _ref.oldIndex,
          newIndex = _ref.newIndex;

      if (oldIndex !== newIndex) {
        var filesResoucesSorted = arrayMove(this.filesResouces, oldIndex, newIndex);
        this.$emit('change', this.limit > 1 ? filesResoucesSorted : filesResoucesSorted[0]);
      }
    }
  }, {
    key: "handleShow",
    value: function handleShow() {
      this.visible = true;
    }
  }, {
    key: "handleHide",
    value: function handleHide() {
      this.visible = false;
    }
  }, {
    key: "handleClosed",
    value: function handleClosed() {
      var _this2 = this;

      this.show = false;
      this.$nextTick(function () {
        return _this2.show = true;
      });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(data) {
      this.handleHide();

      if (data.length) {
        var dataSrcArr = data.map(function (item) {
          return item.src;
        });
        this.$emit('change', this.limit > 1 ? this.filesResouces.concat(dataSrcArr) : dataSrcArr[0]);
        this.$emit('submit', data);
      }
    }
  }, {
    key: "handleDelete",
    value: function handleDelete(index) {
      var value = '';

      if (_isArray(this.value)) {
        value = this.value.filter(function (v, i) {
          return i !== index;
        });
      }

      this.$emit('change', value);
      this.$emit('delete', index);
    }
  }, {
    key: "filesResouces",
    get: function get() {
      return this.value ? _flatten([this.value]) : [];
    }
  }, {
    key: "isMultiple",
    get: function get() {
      return this.limit > 1;
    }
  }]);

  return UploadFormItem;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "limit", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "imagePreview", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { UploadFormItem as default };</script>
