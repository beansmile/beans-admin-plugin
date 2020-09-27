import config from './config';
import _ from 'lodash';
import PortalVue from 'portal-vue';
import { abilitiesPlugin } from '@casl/vue';
import installElement from './element';
import { request, fly, autoLoading } from './utils';
import { abilityService } from './services';

export default function install(Vue, options = {}) {
  installElement(Vue);
  Vue.use(PortalVue);
  Vue.use(abilitiesPlugin, abilityService.ability);

  const pluginConfig = _.merge({}, config, options);
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
