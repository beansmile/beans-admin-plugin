import _ from 'lodash';
import {
  Form,
  Button,
  Card,
  FormItem,
  Input,
  Row,
  Image,
  Col,
  Pagination,
  Tooltip,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Dialog,
  Tabs,
  TabPane,
  CheckboxGroup,
  Alert,
  Table,
  TableColumn,
  OptionGroup,
  Option,
  Select,
  Menu,
  MenuItem,
  Submenu,
  Tag,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxButton,
  InputNumber,
  Switch,
  DatePicker,
  TimePicker,
  ColorPicker,
  Cascader,
  Loading,
  MessageBox, Notification, Message,
  Carousel, CarouselItem,
  Popover,
  Drawer,
} from 'element-ui';
import PortalVue from 'portal-vue'
import ElementLocale from 'element-ui/lib/locale'
import './components';
import { i18n } from './i18n';
import * as Utils from './utils';
import { permissionService } from './services';

function initRouter(router) {
  router.beforeEach(async (to, from, next) => {
    const needLogin = _.get(to, 'meta.auth') !== false;
    const checkPermission = () => {
      const permissionRule = _.get(to, 'meta.permission');
      if (permissionService.hasPermission(permissionRule)) {
        next();
      } else {
        next('403');
      }
    }
    if (needLogin) {
      if (permissionService.inited) {
        checkPermission();
      } else {
        await Utils.autoLoading(permissionService.init());
        checkPermission();
      }
    } else {
      next();
    }
  });

  const willAddRoutes = [
    {
      path: '/login',
      name: 'login',
      component: require('./views/login/index').default,
      meta: {
        auth: false,
        layout: false
      }
    },
    {
      path: '/reset_password',
      name: 'reset_password',
      component: require('./views/reset-password').default,
      meta: {
        auth: false,
        layout: false
      }
    },
    {
      path: '/500',
      name: '500',
      component: require('./views/500').default,
      meta: {
        title: i18n.t('服务器异常')
      },
    },
    {
      path: '/403',
      name: '403',
      component: require('./views/403').default,
      meta: {
        title: i18n.t('无访问权限')
      },
    },
    {
      path: '*',
      name: '404',
      component: require('./views/404').default,
      meta: {
        title: i18n.t('页面找不到')
      }
    }
  ].filter(addRoute => !router.options.routes.find(route => route.name === addRoute.name))

  router.addRoutes(willAddRoutes);

}

const config = {
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
    withCredentials: true,
    beforeRequest: () => {}
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
    navigateTo: { name: 'home' }
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
    edit_url: '',
  },
  ckeditor: {
    editorConfig: new Function,
    contentsCss: [],
  },
}

export default function install(Vue, options = {}) {
  ElementLocale.i18n((key, value) => i18n.t(key, value))
  Vue.use(Form).use(Button).use(Card).use(FormItem).use(Input).use(Row).use(Image).use(Col)
    .use(Pagination).use(Tooltip).use(Dropdown).use(DropdownMenu).use(DropdownItem)
    .use(Dialog).use(Tabs).use(TabPane).use(Checkbox).use(CheckboxGroup).use(Alert).use(Table)
    .use(TableColumn).use(OptionGroup).use(Option).use(Select).use(MenuItem).use(Submenu).use(Tag)
    .use(RadioGroup).use(Radio).use(CheckboxButton).use(InputNumber).use(Menu)
    .use(Switch).use(DatePicker).use(TimePicker).use(ColorPicker).use(Cascader).use(Carousel).use(CarouselItem)
    .use(Popover)
    .use(Drawer)
    .use(PortalVue)

  Vue.use(Loading.directive);

  Vue.prototype.$loading = Loading.service;
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
  Vue.prototype.$notify = Notification;
  Vue.prototype.$message = Message;
  const router = options.router;
  router && initRouter(router);
  _.merge(config, options.config);

  Vue.appRouter = router;
  Vue.appConfig = config;
  Vue.prototype.$appConfig = config;
  Vue.prototype.$get = _.get;
  _.merge(Utils.fly.config, config.request)

  _.forEach(Utils, (value, key) => Vue.prototype[`$${key}`] = value);
}

export * from './utils';
export * from './services';
export { createSourceFormDialog } from './components/source-form';
export { default as AppLayout } from './app';
