<template>
  <div class="c-upload-single">
    <slot :disabled="disabled" :loading="!showCropper && loading" />
    <input
      :disabled="disabled"
      type="file"
      @change="handleFileChange"
      :accept="accept"
    />

    <el-dialog
      v-if="renderCropper"
      custom-class="upload-single-dialog"
      fullscreen
      :visible="showCropper"
      append-to-body
      title="图片裁剪"
      @close="showCropper = false"
      @closed="handleDialogClosed"
    >
      <c-image-cropper
        v-bind="cropper"
        :img="img"
        :loading="loading"
        @change="handleUpload"
      />
    </el-dialog>
  </div>
</template>

<script>import "core-js/modules/es7.object.get-own-property-descriptors";
import "core-js/modules/es6.object.keys";
import _defineProperty from "@babel/runtime-corejs2/helpers/esm/defineProperty";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.string.iterator";
import _slicedToArray from "@babel/runtime-corejs2/helpers/esm/slicedToArray";
import "core-js/modules/es6.string.starts-with";
import "core-js/modules/es6.function.name";
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

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Vue, Component, Prop } from 'vue-property-decorator';
import { upload, getImageInfo as _getImageInfo } from "../utils";
var UploadSingle = (_dec = Prop({
  type: Boolean
}), _dec2 = Prop({
  type: String,
  default: 'image/*'
}), _dec3 = Prop({
  type: Number,
  default: 3
}), _dec4 = Prop({
  type: Object
}), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(UploadSingle, _Vue);

  function UploadSingle() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, UploadSingle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(UploadSingle)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "disabled", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "accept", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "size", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "cropper", _descriptor4, _assertThisInitialized(_this));

    _this.loading = false;
    _this.renderCropper = true;
    _this.showCropper = false;
    _this.img = '';
    _this.fileName = '';
    _this.fileType = '';
    return _this;
  }

  _createClass(UploadSingle, [{
    key: "handleDialogClosed",
    value: function handleDialogClosed() {
      var _this2 = this;

      this.renderCropper = false;
      this.$nextTick(function () {
        return _this2.renderCropper = true;
      });
    }
  }, {
    key: "handleFileChange",
    value: function () {
      var _handleFileChange = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(e) {
        var file, _ref, width, height, avaliableOffset, offset;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                file = e.target.files[0]; // 相同文件change事件不会触发

                e.target.value = '';
                this.fileName = file.name;
                this.fileType = file.type;

                if (!(file.size > this.size * 1024 * 1024)) {
                  _context.next = 7;
                  break;
                }

                this.$message.error("\u6587\u4EF6\u6700\u5927 ".concat(this.size, "M"));
                return _context.abrupt("return");

              case 7:
                if (!(file.type.startsWith('image') && this.cropper && this.cropper.width && this.cropper.height)) {
                  _context.next = 22;
                  break;
                }

                this.loading = true;
                _context.next = 11;
                return this.getImageInfo(file);

              case 11:
                _ref = _context.sent;
                width = _ref.width;
                height = _ref.height;
                this.loading = false;

                if (!(width && height)) {
                  _context.next = 22;
                  break;
                }

                // 可接受的误差
                avaliableOffset = 2;
                offset = Math.floor(Math.abs(this.cropper.width / this.cropper.height - width / height) * 100); // 误差比较大弹出裁剪框，否则直接上传

                if (!(offset > avaliableOffset)) {
                  _context.next = 22;
                  break;
                }

                this.img = URL.createObjectURL(file);
                this.showCropper = true;
                return _context.abrupt("return");

              case 22:
                this.handleUpload(file);

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleFileChange(_x) {
        return _handleFileChange.apply(this, arguments);
      }

      return handleFileChange;
    }()
  }, {
    key: "getImageInfo",
    value: function () {
      var _getImageInfo2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(file) {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!file.type.startsWith('image')) {
                  _context2.next = 13;
                  break;
                }

                _context2.prev = 1;
                _context2.next = 4;
                return _getImageInfo(URL.createObjectURL(file));

              case 4:
                res = _context2.sent;
                return _context2.abrupt("return", res);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", {});

              case 11:
                _context2.next = 14;
                break;

              case 13:
                return _context2.abrupt("return", {});

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 8]]);
      }));

      function getImageInfo(_x2) {
        return _getImageInfo2.apply(this, arguments);
      }

      return getImageInfo;
    }()
  }, {
    key: "handleUpload",
    value: function () {
      var _handleUpload = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(blob) {
        var file, _ref2, _ref3, fileUrl, imageInfo;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.loading = true;
                file = blob.slice();

                if (!file.name) {
                  file.name = this.fileName;
                }

                if (!file.type) {
                  file.type = this.fileType;
                }

                _context3.prev = 4;
                _context3.next = 7;
                return Promise.all([upload(file, false, this.$attrs), this.getImageInfo(file)]);

              case 7:
                _ref2 = _context3.sent;
                _ref3 = _slicedToArray(_ref2, 2);
                fileUrl = _ref3[0];
                imageInfo = _ref3[1];
                this.$emit('change', [_objectSpread({
                  src: fileUrl
                }, imageInfo)]);
                this.$emit('success', fileUrl);
                this.showCropper = false;

              case 14:
                _context3.prev = 14;
                this.loading = false;
                return _context3.finish(14);

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4,, 14, 17]]);
      }));

      function handleUpload(_x3) {
        return _handleUpload.apply(this, arguments);
      }

      return handleUpload;
    }()
  }]);

  return UploadSingle;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "accept", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "size", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "cropper", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { UploadSingle as default };</script>
