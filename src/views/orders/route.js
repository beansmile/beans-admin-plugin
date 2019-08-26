export default {
  path: '/',
  component: {
    template: '<router-view :key="$route.fullPath" />'
  },
  children: [
    {
      path: '/orders',
      name: 'orders.index',
      component: require('./index').default,
      meta: {
        title: '列表',
        navbar: 'el-icon-document'
      }
    },
    {
      path: '/orders/:id',
      name: 'orders.show',
      component: require('./show').default,
      meta: {
        title: '详情'
      }
    },
    {
      path: '/orders/new',
      name: 'orders.new',
      component: require('./new').default,
      meta: {
        title: '新增'
      }
    },
    {
      path: '/orders/:id/edit',
      name: 'orders.edit',
      component: require('./edit').default,
      meta: {
        title: '修改'
      }
    }
  ]
}
