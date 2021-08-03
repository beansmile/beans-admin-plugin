import Vue from 'vue';
import Router from 'vue-router';
import { decodeQuery, encodeQuery } from '@/plugin/utils';

Vue.use(Router);

export const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '',
    component: require('@/layout').default,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          can: []
        },
        component: require('@/views/home').default,
      },
      ...require('@/views/tests').route
    ]
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.VUE_APP_ROUTER_BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  parseQuery (query) {
    return decodeQuery(query);
  },
  stringifyQuery (query) {
    return encodeQuery(query);
  }
});

export default router
