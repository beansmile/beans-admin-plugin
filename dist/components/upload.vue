<template>
  <div class="c-upload" v-loading="loading">
    <el-row class="btn-group">
      <el-button type="primary" class="btn-choose-file" :disabled="this.table.data.length >= limit">
        {{ $t('选择文件') }}
        <!-- safari不触发input事件 -->
        <input type="file" @change="handleFileChange" :accept="accept" :multiple="limit > 1" />
      </el-button>
      <el-button type="warning" @click="handleUploadAll" :disabled="!canUploadData.length">{{ $t('全部上传') }}</el-button>
      <el-button type="danger" @click="handleDeleteAll" :disabled="!table.data.length">{{ $t('全部移除') }}</el-button>
    </el-row>

    <el-alert show-icon type="warning" :title="alert_title" :closable="false"></el-alert>

    <c-source-table :table="table" :columns="columns" />

    <el-row class="btn-group">
      <el-button type="primary" @click="onSubmit">{{ $t('确定') }}</el-button>
      <el-button v-if="showCancelButton" @click="$emit('cancel')">{{ $t('取消') }}</el-button>
    </el-row>
  </div>
</template>

<script>import "core-js/modules/es7.object.get-own-property-descriptors";
import "core-js/modules/es6.object.keys";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.string.iterator";
import _slicedToArray from "@babel/runtime-corejs2/helpers/esm/slicedToArray";
import "core-js/modules/es6.string.starts-with";
import _toConsumableArray from "@babel/runtime-corejs2/helpers/esm/toConsumableArray";
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
import "regenerator-runtime/runtime";
import _asyncToGenerator from "@babel/runtime-corejs2/helpers/esm/asyncToGenerator";
import _defineProperty from "@babel/runtime-corejs2/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime-corejs2/helpers/esm/objectWithoutProperties";
import _get from "lodash/get";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { Vue, Component, Prop } from 'vue-property-decorator';
import { i18n } from "../i18n";
import { createDialog, getImageInfo, upload as _upload } from "../utils";
var Upload = (_dec = Prop({
  type: Number,
  default: 1
}), _dec2 = Prop({
  type: String,
  default: 'image/*'
}), _dec3 = Prop({
  type: Number,
  default: 3
}), _dec4 = Prop({
  type: String,
  default: ''
}), _dec5 = Prop({
  type: Boolean,
  default: true
}), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(Upload, _Vue);

  function Upload() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Upload);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Upload)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "limit", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "accept", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "size", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "tip", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "showCancelButton", _descriptor5, _assertThisInitialized(_this));

    _this.loading = false;
    _this.table = {
      data: [],
      'max-height': undefined
    };
    _this.columns = [{
      prop: 'file.name',
      label: i18n.t('文件名')
    }, {
      prop: 'file.size',
      label: i18n.t('文件大小'),
      renderCell: function renderCell(h, _ref3) {
        var row = _ref3.row;
        return (_get(row, 'file.size') / 1024 / 1024).toFixed(2) + 'M';
      }
    }, {
      prop: 'file.type',
      label: i18n.t('文件类型')
    }, {
      prop: 'src',
      label: i18n.t('上传完成'),
      renderCell: 'bool'
    }, {
      prop: 'action',
      label: i18n.t('操作'),
      width: 200,
      renderCell: function renderCell(h, scope) {
        return h("div", {
          "class": "btn-group"
        }, [h("el-button", {
          "attrs": {
            "type": "danger",
            "size": "mini"
          },
          "on": {
            "click": function click() {
              return _this.handleDelete(scope);
            }
          }
        }, [i18n.t('移除')])]);
      }
    }];
    return _this;
  }

  _createClass(Upload, [{
    key: "onSubmit",
    value: function () {
      var _onSubmit = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.canUploadData.length) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this.handleUploadAll();

              case 3:
                _context2.next = 5;
                return this.table.data.filter(function (item) {
                  return item.src;
                });

              case 5:
                data = _context2.sent;
                this.$emit('submit', data.map(function (item) {
                  return item.src;
                }));
                this.$emit('change', JSON.parse(JSON.stringify(data)));

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onSubmit() {
        return _onSubmit.apply(this, arguments);
      }

      return onSubmit;
    }()
  }, {
    key: "handleFileChange",
    value: function handleFileChange(e) {
      var _this2 = this,
          _this$table$data;

      var files = e.target.files;

      var checkSize = function checkSize(file) {
        return file.size <= _this2.size * 1024 * 1024;
      };

      if (files.length + this.table.data.length > this.limit) {
        this.$message.error(this.$t('最多可上传n个文件', this));
        return;
      }

      var fileDataFiltered = _toConsumableArray(files).filter(checkSize).map(function (file) {
        return {
          file: file,
          src: ''
        };
      });

      if (fileDataFiltered.length !== files.length) {
        this.$message.info(i18n.t('已过滤不符合要求的文件'));
      }

      (_this$table$data = this.table.data).push.apply(_this$table$data, _toConsumableArray(fileDataFiltered));

      e.target.value = '';
    }
  }, {
    key: "upload",
    value: function upload(file) {
      return _upload(file, false, this.$attrs);
    }
  }, {
    key: "handleUpload",
    value: function () {
      var _handleUpload = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(row, index) {
        var _this3 = this;

        var setImagInfo, _ref5, _ref6, fileUrl;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                setImagInfo =
                /*#__PURE__*/
                function () {
                  var _ref4 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee3(file) {
                    var res;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            if (!file.type.startsWith('image')) {
                              _context3.next = 11;
                              break;
                            }

                            _context3.prev = 1;
                            _context3.next = 4;
                            return getImageInfo(URL.createObjectURL(file));

                          case 4:
                            res = _context3.sent;

                            _this3.$set(_this3.table.data[index], 'width', res.width);

                            _this3.$set(_this3.table.data[index], 'height', res.height); // eslint-disable-next-line no-empty


                            _context3.next = 11;
                            break;

                          case 9:
                            _context3.prev = 9;
                            _context3.t0 = _context3["catch"](1);

                          case 11:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3, null, [[1, 9]]);
                  }));

                  return function setImagInfo(_x4) {
                    return _ref4.apply(this, arguments);
                  };
                }();

                _context4.next = 3;
                return Promise.all([this.upload(row.file), setImagInfo(row.file)]);

              case 3:
                _ref5 = _context4.sent;
                _ref6 = _slicedToArray(_ref5, 1);
                fileUrl = _ref6[0];
                this.$set(this.table.data[index], 'src', fileUrl);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function handleUpload(_x2, _x3) {
        return _handleUpload.apply(this, arguments);
      }

      return handleUpload;
    }()
  }, {
    key: "handleUploadAll",
    value: function () {
      var _handleUploadAll = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.loading = true;
                _context5.prev = 1;
                _context5.next = 4;
                return Promise.all(this.table.data.map(function (row, index) {
                  return !row.src && _this4.handleUpload(row, index);
                }));

              case 4:
                _context5.prev = 4;
                this.loading = false;
                return _context5.finish(4);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1,, 4, 7]]);
      }));

      function handleUploadAll() {
        return _handleUploadAll.apply(this, arguments);
      }

      return handleUploadAll;
    }()
  }, {
    key: "handleDelete",
    value: function handleDelete(scope) {
      this.$delete(this.table.data, scope.$index);
    }
  }, {
    key: "handleDeleteAll",
    value: function handleDeleteAll() {
      this.$set(this.table, 'data', []);
    }
  }, {
    key: "alert_title",
    get: function get() {
      return this.$t('上传提示', this) + (this.tip ? '，' + this.tip : '');
    }
  }, {
    key: "canUploadData",
    get: function get() {
      return this.table.data.filter(function (item) {
        return !item.src;
      });
    }
  }]);

  return Upload;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "limit", [_dec], {
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
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "tip", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "showCancelButton", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Upload as default };
export var createUploadDialog = function createUploadDialog(h) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? i18n.t('弹窗') : _ref$title,
      limit = _ref.limit,
      accept = _ref.accept,
      size = _ref.size,
      onConfirm = _ref.onConfirm,
      onClose = _ref.onClose,
      opts = _objectWithoutProperties(_ref, ["title", "limit", "accept", "size", "onConfirm", "onClose"]);

  var uploadComponent = h(Upload, {
    "attrs": {
      "limit": limit,
      "accept": accept,
      "size": size
    }
  });
  var slots = {
    default: uploadComponent
  };

  var props = _objectSpread({
    title: title,
    top: '0'
  }, opts, {
    customClass: "upload-dialog ".concat(opts.customClass || '')
  });

  var events = {
    close: function close(instance) {
      instance.visible = false;
      onClose && onClose();
    },
    opened: function opened(instance) {
      var componentInstance = uploadComponent.componentInstance;
      componentInstance.$on('cancel', function () {
        instance.visible = false;
        onClose && onClose();
      });
      componentInstance.$on('submit',
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(data) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!onConfirm) {
                    _context.next = 3;
                    break;
                  }

                  _context.next = 3;
                  return onConfirm(data);

                case 3:
                  instance.visible = false;

                case 4:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  };
  return createDialog({
    slots: slots,
    props: props,
    events: events
  });
};</script>
