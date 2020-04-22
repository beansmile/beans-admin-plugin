import "core-js/modules/es6.function.name";
import "core-js/modules/es6.array.find";
import "regenerator-runtime/runtime";
import _asyncToGenerator from "@babel/runtime-corejs2/helpers/esm/asyncToGenerator";
import _forEach from "lodash/forEach";
import _merge from "lodash/merge";
import _get from "lodash/get";
import ElementUI from 'element-ui';
import "./components";
import { i18n } from "./i18n";
import * as Utils from "./utils";
import { permissionService } from "./services";

function initRouter(router) {
  router.beforeEach(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(to, from, next) {
      var needLogin, checkPermission;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              needLogin = _get(to, 'meta.auth') !== false;

              checkPermission = function checkPermission() {
                var permissionRule = _get(to, 'meta.permission');

                if (permissionService.hasPermission(permissionRule)) {
                  next();
                } else {
                  next('403');
                }
              };

              if (!needLogin) {
                _context.next = 12;
                break;
              }

              if (!permissionService.inited) {
                _context.next = 7;
                break;
              }

              checkPermission();
              _context.next = 10;
              break;

            case 7:
              _context.next = 9;
              return Utils.autoLoading(permissionService.init());

            case 9:
              checkPermission();

            case 10:
              _context.next = 13;
              break;

            case 12:
              next();

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  var willAddRoutes = [{
    path: '/login',
    name: 'login',
    component: require("./views/login/index").default,
    meta: {
      auth: false,
      layout: false
    }
  }, {
    path: '/reset_password',
    name: 'reset_password',
    component: require("./views/reset-password").default,
    meta: {
      auth: false,
      layout: false
    }
  }, {
    path: '/500',
    name: '500',
    component: require("./views/500").default,
    meta: {
      title: i18n.t('服务器异常')
    }
  }, {
    path: '/403',
    name: '403',
    component: require("./views/403").default,
    meta: {
      title: i18n.t('无访问权限')
    }
  }, {
    path: '*',
    name: '404',
    component: require("./views/404").default,
    meta: {
      title: i18n.t('页面找不到')
    }
  }].filter(function (addRoute) {
    return !router.options.routes.find(function (route) {
      return route.name === addRoute.name;
    });
  });
  router.addRoutes(willAddRoutes);
}

var config = {
  name: i18n.t('后台管理'),
  logo: '',
  table: {
    sort: {
      ascending: 'asc',
      descending: 'desc'
    }
  },
  request: {
    baseURL: '/admin_api/v1',
    timeout: 30000,
    withCredentials: true
  },
  upload: {
    useHttps: true,
    meta_url: '/qiniu_meta',
    upload_url: 'https://upload-z2.qiniup.com',
    customUpload: undefined // function

  },
  login: {
    token_storage_key: 'access_token',
    token_header_key: 'Authorization',
    request_url: '',
    navigateTo: {
      name: 'home'
    }
  },
  logout: {
    request_url: ''
  },
  permission: {
    request_url: '',
    getPermissionMap: null
  },
  password: {
    onSendVerificationCode: null,
    onResetPass: null,
    forgot_url: '',
    edit_url: ''
  },
  ckeditor: {
    editorConfig: new Function(),
    contentsCss: []
  }
};
export default function install(Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Vue.use(ElementUI, options.elementUIConfig);
  var router = options.router;
  router && initRouter(router);

  _merge(config, options.config);

  Vue.appRouter = router;
  Vue.appConfig = config;
  Vue.prototype.$appConfig = config;
  Vue.prototype.$get = _get;

  _merge(Utils.fly.config, config.request);

  _forEach(Utils, function (value, key) {
    return Vue.prototype["$".concat(key)] = value;
  });
}
export * from "./utils";
export * from "./services";
export { createSourceFormDialog } from "./components/source-form";
export { default as AppLayout } from "./app";