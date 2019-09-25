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
      path: '/preview-image',
      name: 'doc.preview-image',
      component: require('./preview-image').default,
      meta: {
        title: 'preview-image',
        navbar: 'el-icon-document'
      }
    }
  ]
}
