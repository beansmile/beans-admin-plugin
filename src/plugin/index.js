import config from './config';
import _ from 'lodash';
import PortalVue from 'portal-vue';
import installElement from './element';
import { request, fly, autoLoading } from './utils';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

export default function install(Vue, options = {}) {
  installElement(Vue);
  Vue.use(PortalVue);
  Vue.use(mavonEditor);

  const pluginConfig = _.merge({}, config, options);
  // 筛选出来locales里面有值的
  _.set(pluginConfig, 'i18n.locales', _.pickBy(_.get(pluginConfig, 'i18n.locales', {}), label => !!label));

  Vue.vadminConfig = Vue[pluginConfig.globalConfigKey] = Vue.prototype.$vadminConfig = Vue.prototype[`$${pluginConfig.globalConfigKey}`] = pluginConfig;
  require('./components').install(Vue, pluginConfig);

  _.merge(require('./utils').fly.config, pluginConfig.request);

  Vue.prototype.$request = request;
  Vue.prototype.$fly = fly;
  Vue.prototype.$autoLoading = autoLoading;
  Vue.prototype.$get = _.get;

  Vue.config.errorHandler = (err) => {
    if (!_.get(err, 'message', '').includes('please transfer a valid prop path to form item')) {
      throw err;
    }
  }
}

export * from './services';
export * from './utils';
export { default as locale } from './locale';
