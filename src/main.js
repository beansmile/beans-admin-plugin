import Vue from 'vue'
import router from './router';
import './theme.scss';

Vue.config.productionTip = false;

Vue.use(require('@/plugin').default, {});

const app = new Vue({
  router,
  template: '<router-view />'
}).$mount('#app')

export default app;
