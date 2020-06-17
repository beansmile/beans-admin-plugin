export default {
  path: '/docs',
  component: {
    template: '<router-view :key="$route.fullPath" />'
  },
  children: [
    {
      path: '/config',
      name: 'doc.config',
      component: require('./config').default,
      meta: {
        title: '配置',
        navbar: 'el-icon-document'
      }
    },
    {
      path: '/source-filter',
      name: 'doc.sourceFilter',
      component: require('./source-filter').default,
      meta: {
        title: '筛选',
        navbar: 'el-icon-document'
      }
    },
    {
      path: '/source-form',
      name: 'doc.sourceForm',
      component: require('./source-form').default,
      meta: {
        title: '表单',
        navbar: 'el-icon-document'
      }
    },
    {
      path: '/source-form-item',
      name: 'doc.sourceFormItem',
      component: require('./source-form-item').default,
      meta: {
        title: '表单项',
        navbar: 'el-icon-document'
      }
    },
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
      path: '/static-nest-form',
      name: 'doc.static-nest-form',
      component: require('./static-nest-form').default,
      meta: {
        title: 'static-nest-form',
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
    },
    {
      path: '/page-editor',
      name: 'doc.pageEdidtor',
      component: require('./page-editor').default,
      meta: {
        title: 'page-editor',
        navbar: 'el-icon-document'
      }
    },
    {
      path: '/list-select',
      name: 'doc.listSelect',
      component: require('./list-select').default,
      meta: {
        title: 'list-select',
        navbar: 'el-icon-document'
      }
    },
    {
      path: '/sku-editor',
      name: 'doc.skuEditor',
      component: require('./sku-editor').default,
      meta: {
        title: 'sku编辑',
        navbar: 'el-icon-document'
      }
    }
  ]
}
