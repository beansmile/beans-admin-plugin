export default [
  {
    title: '首页',
    icon: 'el-icon-menu',
    route: { name: 'home' },
  },
  {
    title: 'column-render',
    icon: 'el-icon-menu',
    route: { name: 'column-render' }
  },
  {
    title: 'source-page',
    icon: 'el-icon-menu',
    route: { name: 'source-page' },
    children: [
      {
        title: 'source-page',
        route: { name: 'source-page' }
      },
      {
        title: '基本示例',
        route: { name: 'topics.index' }
      },
      {
        title: '详情tab',
        route: { name: 'topics-tab.show', params: { id: '606bbf024d20cb6fa168a43c' } }
      },
      {
        title: '表单自定义',
        route: { name: 'topics-form' }
      }
    ]
  }
];
