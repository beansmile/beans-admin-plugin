import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        navbar: 'el-icon-s-home',
        title: '概览'
      },
      component: require('@/views/home').default
    },
    require('@/views/orders/route').default
  ]
})

export default router;
