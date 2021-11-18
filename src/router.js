import Vue from 'vue';
import Router from 'vue-router';
import { decodeQuery, encodeQuery } from '@/plugin/utils';

Vue.use(Router);

export const routes = [
  {
    path: '/',
    redirect: '/install'
  },
  {
    path: '',
    component: require('@/layout').default,
    children: [
      ...require('@/views/install').route,
      ...require('@/views/column-render').route,
      ...require('@/views/column-render/component-available').route,
      ...require('@/views/source-page').route,
      ...require('@/views/source-page/topics').route,
      ...require('@/views/source-page/topics-detail-tab').route,
      ...require('@/views/source-page/topics-form').route,
      ...require('@/views/config').route,
      ...require('@/views/ability').route,
      ...require('@/views/form').route,
      ...require('@/views/table').route,
      ...require('@/views/dialog-form').route,
    ]
  }
]

const router = new Router({
  mode: 'hash',
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
