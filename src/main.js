import Vue from 'vue'
import router from './router';
import { i18n } from './i18n';
import './theme.scss';
import './components';

import 'highlight.js/styles/github.css';
import hljs from 'highlight.js/lib/core.js';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import vuePlugin from '@highlightjs/vue-plugin';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('css', css);
Vue.use(vuePlugin);

Vue.config.productionTip = false;

Vue.use(require('@/plugin').default, {
  componentPrefix: 'bean',
});

const app = new Vue({
  router,
  i18n,
  template: '<router-view />'
}).$mount('#app')

export default app;
