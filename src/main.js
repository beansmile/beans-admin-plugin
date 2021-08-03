import Vue from 'vue'
import router from './router';
import { i18n } from './i18n';
import './theme.scss';
import './components';

Vue.config.productionTip = false;

Vue.use(require('@/plugin').default, {
  componentPrefix: 'bean',
  i18n: {
    localeStorageKey: 'demo-locale-key',
    locales: {
      zh_cn: '简体中文',
      en: 'English',
      zh_hk: '繁體中文'
    }
  }
});

const app = new Vue({
  router,
  i18n,
  template: '<router-view />'
}).$mount('#app')

export default app;
