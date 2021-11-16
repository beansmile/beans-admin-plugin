<template>
  <create-doc
    title="安装"
    :examples="examples"
  >
    <highlightjs autodetect code="yarn add https://github.com/beansmile/beans-admin-plugin.git#v3.1" />
    <highlightjs autodetect code="yarn add element-ui@2.15.2" />
    <highlightjs autodetect code="yarn add vue-i18n@8.2.1" />
    <highlightjs autodetect code="yarn generate {资源名}  #快速创建页面" />
  </create-doc>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Install extends Vue {
  examples = [
    {
      code: require('!raw-loader!./webpack.config.js').default,
      title: 'webpack.config.js'
    },
    {
      code: require('!raw-loader!./example.js').default,
      title: 'main.js'
    },
    {
      code: require('!raw-loader!./i18n.js').default,
      title: 'i18n.js'
    },
    {
      code: require('!raw-loader!./theme.scss').default,
      title: 'theme.scss'
    }
  ];
}

export const route = [
  {
    path: '/install',
    name: 'install',
    component: Install,
    meta: { title: '安装' }
  },
];
</script>
