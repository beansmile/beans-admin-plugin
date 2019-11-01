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
    },
    {
      path: '/link-button',
      name: 'doc.link-button',
      component: require('./link-button').default,
      meta: {
        title: 'link-button',
        navbar: 'el-icon-document'
      }
    },
    {
      path: '/permission',
      name: 'doc.permission',
      component: require('./permission').default,
      meta: {
        title: 'permission',
        navbar: 'el-icon-document'
      }
    },
    {
      path: '/router-link',
      name: 'doc.router-link',
      component: require('./router-link').default,
      meta: {
        title: 'router-link',
        navbar: 'el-icon-document'
      }
    },
    {
      path: '/select',
      name: 'doc.select',
      component: require('./select').default,
      meta: {
        title: 'select',
        navbar: 'el-icon-document'
      }
    }
  ]
}
