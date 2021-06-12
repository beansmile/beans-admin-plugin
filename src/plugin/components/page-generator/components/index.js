import '../fonts/iconfont/iconfont.css';

export default ({ $t } = {}) => [
  {
    title: $t('bean.pageGenerator.text'),
    name: 'text',
    icon: 'iconfont icon-TextDescription-1',
    component: require('./text').default
  },
  {
    title: $t('bean.pageGenerator.title'),
    name: 'title',
    icon: 'iconfont icon-titleicon',
    component: require('./title').default
  },
  // {
  //   title: $t('bean.pageGenerator.richText'),
  //   name: 'rich-text',
  //   icon: 'iconfont icon-fuwenben1',
  //   component: require('./rich-text').default
  // },
  {
    title: $t('bean.pageGenerator.image'),
    name: 'image',
    icon: 'iconfont icon-tupian1',
    component: require('./image').default
  },
  {
    title: $t('bean.pageGenerator.imageHotArea'),
    name: 'image-area',
    icon: 'iconfont icon-tupian1',
    component: require('./image-area').default
  },
  {
    title: $t('bean.pageGenerator.multipleImage'),
    name: 'multiple-image',
    icon: 'iconfont icon-tupian1',
    component: require('./multiple-image').default
  },
  {
    title: $t('bean.pageGenerator.video'),
    name: 'video',
    icon: 'iconfont icon-shipin',
    component: require('./video').default
  },
  {
    title: $t('bean.pageGenerator.swiper'),
    name: 'swiper',
    icon: 'iconfont icon-lunbotu1',
    component: require('./swiper').default
  },
  {
    title: $t('bean.pageGenerator.splitLine'),
    name: 'split-line',
    icon: 'iconfont icon-fengexian2',
    component: require('./split-line').default
  },
  {
    title: $t('bean.pageGenerator.blank'),
    name: 'blank',
    icon: 'el-icon-files',
    component: require('./blank').default
  },
  {
    title: $t('bean.pageGenerator.scrollX'),
    name: 'scroll-x',
    icon: 'iconfont icon-zuoyouhuadongtu',
    component: require('./scroll-x').default
  },
  {
    title: $t('bean.pageGenerator.map'),
    name: 'map',
    icon: 'iconfont icon-ditu1',
    component: require('./map').default
  },
  {
    title: $t('bean.pageGenerator.navbar'),
    name: 'navbar',
    icon: 'iconfont icon-daohangtiao',
    component: require('./navbar').default
  },
  {
    title: $t('bean.pageGenerator.form'),
    name: 'form',
    icon: 'iconfont icon-biaodan',
    component: require('./form').default
  },
  {
    title: $t('bean.pageGenerator.popup'),
    name: 'popup',
    global: true,
    icon: 'iconfont icon-danchuang',
    component: require('./popup').default
  },
  {
    title: $t('bean.pageGenerator.fixedButton'),
    name: 'fixed-button',
    global: true,
    icon: 'el-icon-paperclip',
    component: require('./fixed-button').default
  }
];
