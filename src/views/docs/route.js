export default {
  path: '/docs',
  component: {
    template: '<router-view :key="$route.fullPath" />'
  },
  children: [
    {
      path: '/clipboard',
      name: 'doc.clipboard',
      component: require('./clipboard').default,
      meta: {
        title: 'clipboard',
        navbar: 'el-icon-document'
      }
    },
    {
      path: '/dropdown-button',
      name: 'doc.dropdown-button',
      component: require('./dropdown-button').default,
      meta: {
        title: 'dropdown-button',
        navbar: 'el-icon-document'
      }
    },
    {
      path: '/dynamic-nest-form',
      name: 'doc.dynamic-nest-form',
      component: require('./dynamic-nest-form').default,
      meta: {
        title: 'dynamic-nest-form',
        navbar: 'el-icon-document'
      }
    }
  ]
}
