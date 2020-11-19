import '../fonts/iconfont/iconfont.css';

export default [
  {
    title: '文本',
    name: 'text',
    icon: 'iconfont icon-TextDescription-1',
    component: require('./text').default
  },
  {
    title: '标题',
    name: 'title',
    icon: 'iconfont icon-titleicon',
    component: require('./title').default
  },
  // {
  //   title: '富文本',
  //   name: 'rich-text',
  //   icon: 'iconfont icon-fuwenben1',
  //   component: require('./rich-text').default
  // },
  {
    title: '图片',
    name: 'image',
    icon: 'iconfont icon-tupian1',
    component: require('./image').default
  },
  {
    title: '一行多图',
    name: 'multiple-image',
    icon: 'iconfont icon-tupian1',
    component: require('./multiple-image').default
  },
  {
    title: '视频',
    name: 'video',
    icon: 'iconfont icon-shipin',
    component: require('./video').default
  },
  {
    title: '轮播图',
    name: 'swiper',
    icon: 'iconfont icon-lunbotu1',
    component: require('./swiper').default
  },
  {
    title: '分割线',
    name: 'split-line',
    icon: 'iconfont icon-fengexian2',
    component: require('./split-line').default
  },
  {
    title: '留白',
    name: 'blank',
    icon: 'el-icon-files',
    component: require('./blank').default
  },
  {
    title: '左右滑动图',
    name: 'scroll-x',
    icon: 'iconfont icon-zuoyouhuadongtu',
    component: require('./scroll-x').default
  },
  {
    title: '地图',
    name: 'map',
    icon: 'iconfont icon-ditu1',
    component: require('./map').default
  },
  {
    title: '导航条',
    name: 'navbar',
    icon: 'iconfont icon-daohangtiao',
    component: require('./navbar').default
  },
  {
    title: '表单',
    name: 'form',
    icon: 'iconfont icon-biaodan',
    component: require('./form').default
  },
  {
    title: '弹窗',
    name: 'popup',
    icon: 'iconfont icon-danchuang',
    component: require('./popup').default
  }
];
