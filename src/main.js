import Vue from 'vue'
import router from './router';
import { i18n } from './i18n';
import './theme.scss';

Vue.config.productionTip = false;

Vue.use(require('@/plugin').default, {});

const app = new Vue({
  router,
  i18n,
  template: '<router-view />'
}).$mount('#app')

export default app;
