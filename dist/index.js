import _Message from "element-ui/lib/message";
import _Notification from "element-ui/lib/notification";
import _MessageBox from "element-ui/lib/message-box";
import _Loading from "element-ui/lib/loading";
import _Form from "element-ui/lib/form";
import _Button from "element-ui/lib/button";
import _Card from "element-ui/lib/card";
import _FormItem from "element-ui/lib/form-item";
import _Input from "element-ui/lib/input";
import _Row from "element-ui/lib/row";
import _Image from "element-ui/lib/image";
import _Col from "element-ui/lib/col";
import _Pagination from "element-ui/lib/pagination";
import _Tooltip from "element-ui/lib/tooltip";
import _Dropdown from "element-ui/lib/dropdown";
import _DropdownMenu from "element-ui/lib/dropdown-menu";
import _DropdownItem from "element-ui/lib/dropdown-item";
import _Dialog from "element-ui/lib/dialog";
import _Tabs from "element-ui/lib/tabs";
import _TabPane from "element-ui/lib/tab-pane";
import _Checkbox from "element-ui/lib/checkbox";
import _CheckboxGroup from "element-ui/lib/checkbox-group";
import _Alert from "element-ui/lib/alert";
import _Table from "element-ui/lib/table";
import _TableColumn from "element-ui/lib/table-column";
import _OptionGroup from "element-ui/lib/option-group";
import _Option from "element-ui/lib/option";
import _Select from "element-ui/lib/select";
import _MenuItem from "element-ui/lib/menu-item";
import _Submenu from "element-ui/lib/submenu";
import _Tag from "element-ui/lib/tag";
import _RadioGroup from "element-ui/lib/radio-group";
import _Radio from "element-ui/lib/radio";
import _CheckboxButton from "element-ui/lib/checkbox-button";
import _InputNumber from "element-ui/lib/input-number";
import _Menu from "element-ui/lib/menu";
import _Switch from "element-ui/lib/switch";
import _DatePicker from "element-ui/lib/date-picker";
import _TimePicker from "element-ui/lib/time-picker";
import _ColorPicker from "element-ui/lib/color-picker";
import _Cascader from "element-ui/lib/cascader";
import _Carousel from "element-ui/lib/carousel";
import _CarouselItem from "element-ui/lib/carousel-item";
import _Popover from "element-ui/lib/popover";
import "core-js/modules/es6.function.name";
import "core-js/modules/es6.array.find";
import "regenerator-runtime/runtime";
import _asyncToGenerator from "@babel/runtime-corejs2/helpers/esm/asyncToGenerator";
import _forEach from "lodash/forEach";
import _merge from "lodash/merge";
import _get from "lodash/get";
import ElementLocale from 'element-ui/lib/locale';
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
  ElementLocale.i18n(function (key, value) {
    return i18n.t(key, value);
  });
  Vue.use(_Form).use(_Button).use(_Card).use(_FormItem).use(_Input).use(_Row).use(_Image).use(_Col).use(_Pagination).use(_Tooltip).use(_Dropdown).use(_DropdownMenu).use(_DropdownItem).use(_Dialog).use(_Tabs).use(_TabPane).use(_Checkbox).use(_CheckboxGroup).use(_Alert).use(_Table).use(_TableColumn).use(_OptionGroup).use(_Option).use(_Select).use(_MenuItem).use(_Submenu).use(_Tag).use(_RadioGroup).use(_Radio).use(_CheckboxButton).use(_InputNumber).use(_Menu).use(_Switch).use(_DatePicker).use(_TimePicker).use(_ColorPicker).use(_Cascader).use(_Carousel).use(_CarouselItem).use(_Popover);
  Vue.use(_Loading.directive);
  Vue.prototype.$loading = _Loading.service;
  Vue.prototype.$msgbox = _MessageBox;
  Vue.prototype.$alert = _MessageBox.alert;
  Vue.prototype.$confirm = _MessageBox.confirm;
  Vue.prototype.$prompt = _MessageBox.prompt;
  Vue.prototype.$notify = _Notification;
  Vue.prototype.$message = _Message;
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