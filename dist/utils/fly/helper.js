import "core-js/modules/es6.string.starts-with";
import "regenerator-runtime/runtime";
import "core-js/modules/es7.array.includes";
import "core-js/modules/es6.string.includes";
import _MessageBox from "element-ui/lib/message-box";
import _Message from "element-ui/lib/message";
import "core-js/modules/es6.function.name";
import "core-js/modules/es6.regexp.replace";
import _asyncToGenerator from "@babel/runtime-corejs2/helpers/esm/asyncToGenerator";
import _get from "lodash/get";
import _snakeCase from "lodash/snakeCase";
import _forEach from "lodash/forEach";
import _omitBy from "lodash/omitBy";
import _noop from "lodash/noop";
import Vue from 'vue';
import qs from 'qs';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { i18n } from "../../i18n";
import { loadingService } from "../../services";
import decoder from "../decoder";
export function onSend(_x) {
  return _onSend.apply(this, arguments);
}

function _onSend() {
  _onSend = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(request) {
    var _Vue$appConfig$login, token_storage_key, token_header_key, token, _ref, _ref$beforeRequest, beforeRequest, body;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            showNProgress(request);
            _Vue$appConfig$login = Vue.appConfig.login, token_storage_key = _Vue$appConfig$login.token_storage_key, token_header_key = _Vue$appConfig$login.token_header_key;
            token = localStorage.getItem(token_storage_key);

            if (token) {
              request.headers[token_header_key] = localStorage.getItem(token_storage_key);
            }

            _ref = Vue.appConfig.request || {}, _ref$beforeRequest = _ref.beforeRequest, beforeRequest = _ref$beforeRequest === void 0 ? _noop : _ref$beforeRequest;
            _context.next = 7;
            return beforeRequest(request);

          case 7:
            if (request.method === 'GET' && request.body) {
              body = _omitBy(request.body, function (v, k) {
                return k.startsWith('_');
              });
              request.params = qs.stringify(body, {
                arrayFormat: 'brackets'
              });
              delete request.body;
            }

            return _context.abrupt("return", request);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _onSend.apply(this, arguments);
}

export function onSucceed(res) {
  hideNProgress(res.request);
  res['isResponse'] = true;
  res.meta = {};

  _forEach(res.headers, function (v, k) {
    v = res.headers[k] = [].concat(v)[0];

    if (/^x-/.test(k)) {
      var key = _snakeCase(k.replace(/^x-/, ''));

      res.meta[key] = decoder(v);
    }
  });

  if ('total' in res.meta) {
    res.pagination = {
      total: res.meta['total'],
      'current-page': res.meta['page'],
      'page-size': res.meta['per_page']
    };
  }

  if (res.request.return_res) {
    return res;
  } else {
    return res.pagination ? {
      data: res.data,
      pagination: res.pagination
    } : res.data;
  }
}
export function onError(err) {
  hideNProgress(err.request);

  var _get2 = _get(err, 'response.data', {}),
      error_message = _get2.error_message,
      message = _get2.message,
      messages = _get2.messages,
      error = _get2.error,
      code = _get2.code;

  err.message = error_message || message || messages || error || err.message;
  err.api_code = code;
  var app = Vue.appRouter.app;

  switch (err.status) {
    case 401:
      {
        localStorage.removeItem('access_token');

        if (app.$route.name !== 'login') {
          app.$router.replace({
            name: 'login'
          });

          _Message.info(i18n.t('请登录'));
        }

        break;
      }

    case 403:
      app.$router.replace({
        name: '403'
      });
      break;

    default:
      {
        _MessageBox.alert(err.message, {
          title: i18n.t('错误')
        });
      }
  }

  return err;
}

function useNProgress(request) {
  var loading = false;

  if (['GET', 'DELETE'].includes(request.method) && request.loading !== false) {
    loading = true;
  } else {
    loading = request.loading;
  }

  return loading;
}

function showNProgress(request) {
  if (useNProgress(request)) {
    loadingService.add();
    loadingService.state.count && NProgress.start();
  }
}

function hideNProgress(request) {
  if (useNProgress(request)) {
    loadingService.miuns();
    !loadingService.state.count && NProgress.done();
  }
}