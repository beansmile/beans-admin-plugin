import Vue from 'vue'
import i18n from './i18n-import'
import BeansAdminPlugin, { AppLayout } from './plugin';
import router from './router';
import './theme.scss';
import './components';

Vue.config.productionTip = false

Vue.use(BeansAdminPlugin, { router });

new Vue({
  router, i18n,
  render: h => h(AppLayout),
}).$mount('#app')
