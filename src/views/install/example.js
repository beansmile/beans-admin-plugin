import Vue from 'vue';
import { i18n } from './i18n';
import BeansAdminPlugin from 'beans-admin-plugin';
import './theme.scss';

const config = {}; // 查看全局配置文档

Vue.use(BeansAdminPlugin, config);

new Vue({
  i18n,
  // router
}).$mount('#app');
