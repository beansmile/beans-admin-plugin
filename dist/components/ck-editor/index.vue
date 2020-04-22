<template>
  <div class="ckeditor-view">
    <textarea :id="instanceId"></textarea>
  </div>
</template>

<script>import "regenerator-runtime/runtime";
import _asyncToGenerator from "@babel/runtime-corejs2/helpers/esm/asyncToGenerator";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.regexp.replace";
import _initializerDefineProperty from "@babel/runtime-corejs2/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime-corejs2/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime-corejs2/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

import { Component, Vue, Model, Prop, Watch } from 'vue-property-decorator';
import { randomString, upload, autoLoading } from "../../utils";
import setConfig from "./config";
import 'ckeditor/ckeditor';

require.context('!file-loader?context=node_modules&name=[path][name].[ext]!ckeditor', true, /\.(js|css|png|html)$/);

var CKEDITOR = window.CKEDITOR;
setConfig(CKEDITOR.config);
var CKEditor = (_dec = Model('change', {
  type: String,
  default: ''
}), _dec2 = Prop({
  type: String,
  default: function _default() {
    return 'ck_' + randomString();
  }
}), _dec3 = Prop(Object), _dec4 = Prop({
  type: Function,
  default: new Function()
}), _dec5 = Watch('value'), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(CKEditor, _Vue);

  function CKEditor() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CKEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CKEditor)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "instanceId", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "config", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "onLoad", _descriptor4, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(CKEditor, [{
    key: "created",
    value: function created() {
      var editorConfig = Vue.prototype.$appConfig.ckeditor.editorConfig;

      if (!editorConfig.used) {
        editorConfig(CKEDITOR.config);
        editorConfig.used = true;
      }
    }
  }, {
    key: "mounted",
    value: function mounted() {
      var _this2 = this;

      var _Vue$prototype$$appCo = Vue.prototype.$appConfig.ckeditor,
          contentsCss = _Vue$prototype$$appCo.contentsCss,
          _Vue$prototype$$appCo2 = _Vue$prototype$$appCo.fileUploadRequest,
          fileUploadRequest = _Vue$prototype$$appCo2 === void 0 ? this.fileUploadRequest : _Vue$prototype$$appCo2,
          _Vue$prototype$$appCo3 = _Vue$prototype$$appCo.fileUploadResponse,
          fileUploadResponse = _Vue$prototype$$appCo3 === void 0 ? this.fileUploadResponse : _Vue$prototype$$appCo3;
      var config = Object.assign({
        customConfig: ''
      }, this.config);
      document.getElementById(this.instanceId).value = this.value;
      this.editor = CKEDITOR.replace(this.instanceId, config);
      contentsCss.forEach(function (link) {
        return _this2.editor.addContentsCss(link);
      });
      this.editor.on('loaded', function (e) {
        _this2.onLoad(e);

        _this2.editor.on('change', function (e) {
          _this2.$emit('change', e.editor.getData());
        });

        _this2.editor.on('fileUploadRequest', fileUploadRequest);

        _this2.editor.on('fileUploadResponse', fileUploadResponse);
      });
    }
  }, {
    key: "watchValue",
    value: function watchValue() {
      if (this.editor.getData() !== this.value) this.editor.setData(this.value);
    }
  }, {
    key: "fileUploadRequest",
    value: function () {
      var _fileUploadRequest = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(evt) {
        var _Vue$prototype$$appCo4, fakeUploadUrl, fileLoader, xhr;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _Vue$prototype$$appCo4 = Vue.prototype.$appConfig.ckeditor.fakeUploadUrl, fakeUploadUrl = _Vue$prototype$$appCo4 === void 0 ? location.origin : _Vue$prototype$$appCo4; // Prevented the default behavior.

                evt.stop();
                fileLoader = evt.data.fileLoader;
                xhr = fileLoader.xhr;
                _context.next = 6;
                return autoLoading(upload(fileLoader.file));

              case 6:
                xhr.$uploadResult = _context.sent;
                xhr.open('get', fakeUploadUrl, true);
                xhr.send();

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function fileUploadRequest(_x) {
        return _fileUploadRequest.apply(this, arguments);
      }

      return fileUploadRequest;
    }()
  }, {
    key: "fileUploadResponse",
    value: function () {
      var _fileUploadResponse = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(evt) {
        var data, xhr;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // Prevent the default response handler.
                evt.stop(); // Get XHR and response.

                data = evt.data;
                xhr = data.fileLoader.xhr;
                data.url = xhr.$uploadResult;

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function fileUploadResponse(_x2) {
        return _fileUploadResponse.apply(this, arguments);
      }

      return fileUploadResponse;
    }()
  }]);

  return CKEditor;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "instanceId", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "config", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "onLoad", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "watchValue", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "watchValue"), _class2.prototype)), _class2)) || _class);
export { CKEditor as default };</script>
