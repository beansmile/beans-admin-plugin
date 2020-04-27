// TODO 重构下面的组件，有些数据同步方式不太对

export default [
  {
    title: '图片',
    name: 'custom-image',
    component: require('./image').default
  },
  {
    title: '视频',
    name: 'custom-video',
    component: require('./video').default
  },
  {
    title: '轮播图',
    name: 'custom-swiper',
    component: require('./swiper').default
  },
  {
    title: '横向滚动',
    name: 'custom-scroll-x',
    component: require('./scroll-x').default
  },
  {
    title: '客服',
    name: 'custom-contact-service',
    component: require('./contact-service').default
  },
  {
    title: '商品列表',
    name: 'custom-product-list',
    component: require('./product-list').default
  },
  {
    title: '占位块',
    name: 'custom-block',
    component: require('./block').default
  },
  {
    title: '文本',
    name: 'custom-text',
    component: require('./text').default
  },
  {
    title: '通知栏',
    name: 'custom-notice-bar',
    component: require('./notice-bar').default
  },
];
