export default [
  {
    title: '安装',
    icon: 'el-icon-menu',
    route: { name: 'install' },
  },
  {
    title: '全局配置',
    icon: 'el-icon-menu',
    route: { name: 'config' }
  },
  {
    title: 'column-render',
    icon: 'el-icon-menu',
    children: [
      {
        title: 'column-render',
        route: { name: 'column-render' }
      },
      {
        title: '内置组件',
        route: { name: 'column-render.available-components' }
      }
    ],
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
