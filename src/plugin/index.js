import _ from 'lodash';
import ElementUI from 'element-ui';
import './components';
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
      component: require('./views/login').default,
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
        title: '服务器异常'
      },
    },
    {
      path: '/403',
      name: '403',
      component: require('./views/403').default,
      meta: {
        title: '无访问权限'
      },
    },
    {
      path: '*',
      name: '404',
      component: require('./views/404').default,
      meta: {
        title: '页面找不到'
      }
    }
  ].filter(addRoute => router.options.routes.find(route => route.name !== addRoute.name))

  router.addRoutes(willAddRoutes);

}

const config = {
  name: '后台管理',
  logo: '',
  request: {
    baseURL: '/admin_api/v1',
    timeout: 30000,
    withCredentials: true
  },
  upload: {
    useHttps: false,
    meta_url: '/qiniu_meta',
    upload_url: 'https://upload-z2.qiniup.com',
    customUpload: undefined // function
  },
  login: {
    request_url: '',
    navigateTo: { name: 'home' }
  },
  logout: {
    request_url: ''
  },
  permission: {
    request_url: ''
  },
  password: {
    forgot_url: '',
    edit_url: '',
  },
}

export default function install(Vue, options = {}) {
  Vue.use(ElementUI);
  const router = options.router;
  router && initRouter(router);
  _.merge(config, options.config);

  Vue.appRouter = router;
  Vue.appConfig = config;
  Vue.prototype.$appConfig = config;
  Vue.prototype.$get = _.get;

  _.forEach(Utils, (value, key) => Vue.prototype[`$${key}`] = value);
}

export * from './utils';
export * from './services';
export { createSourceFormDialog } from './components/source-form';
export { default as AppLayout } from './app';
