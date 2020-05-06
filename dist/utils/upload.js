import "core-js/modules/es6.function.name";
import "regenerator-runtime/runtime";
import _asyncToGenerator from "@babel/runtime-corejs2/helpers/esm/asyncToGenerator";
import _isFunction from "lodash/isFunction";
import Vue from 'vue';
import fly from "./fly";
import { randomFileName } from "./random";
export default function upload(_x) {
  return _upload.apply(this, arguments);
}

function _upload() {
  _upload = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(file) {
    var include_res,
        uploadOptions,
        _Vue$appConfig$upload,
        meta_url,
        customUpload,
        useHttps,
        qiniuMeta,
        bucket_domain,
        token,
        _qiniuMeta$upload_url,
        upload_url,
        formData,
        res,
        url,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            include_res = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
            uploadOptions = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            _Vue$appConfig$upload = Vue.appConfig.upload, meta_url = _Vue$appConfig$upload.meta_url, customUpload = _Vue$appConfig$upload.customUpload, useHttps = _Vue$appConfig$upload.useHttps;

            if (!_isFunction(customUpload)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", customUpload(file, include_res, uploadOptions));

          case 5:
            _context.next = 7;
            return fly.get(meta_url, null, {
              loading: false
            });

          case 7:
            qiniuMeta = _context.sent;
            bucket_domain = qiniuMeta.bucket_domain, token = qiniuMeta.token, _qiniuMeta$upload_url = qiniuMeta.upload_url, upload_url = _qiniuMeta$upload_url === void 0 ? Vue.appConfig.upload.upload_url : _qiniuMeta$upload_url;
            formData = new FormData();
            formData.append('file', file);
            formData.append('token', token);
            formData.append('key', randomFileName(file.name));
            _context.next = 15;
            return fly.post(upload_url, formData, {
              baseURL: '',
              withCredentials: false,
              loading: false,
              return_res: true
            });

          case 15:
            res = _context.sent;
            url = "".concat(useHttps ? 'https' : 'http', "://").concat(bucket_domain, "/").concat(res.data.key);
            return _context.abrupt("return", include_res ? [url, res] : url);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _upload.apply(this, arguments);
}