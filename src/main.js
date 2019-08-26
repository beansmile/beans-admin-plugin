import Vue from 'vue'
import router from './router';
import BeansAdminPlugin, { AppLayout } from './plugin';

Vue.config.productionTip = false

Vue.use(BeansAdminPlugin, { router });

new Vue({
  router,
  render: h => h(AppLayout),
}).$mount('#app')
