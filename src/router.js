import Vue from 'vue';
import Router from 'vue-router';
import { decodeQuery, encodeQuery } from './plugin';

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.VUE_APP_ROUTER_BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/nav-menu',
      component: {
        template: '<router-view></router-view>'
      },
      children: require('@/views/docs-v2/route').default
    }
  ],
  parseQuery (query) {
    return decodeQuery(query);
  },
  stringifyQuery (query) {
    return encodeQuery(query);
  }
})

export default router;
