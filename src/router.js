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
      redirect: '/install'
    },
    require('@/views/orders/route').default,
    require('@/views/docs/route').default
  ],
  parseQuery (query) {
    return decodeQuery(query);
  },
  stringifyQuery (query) {
    return encodeQuery(query);
  }
})

export default router;
