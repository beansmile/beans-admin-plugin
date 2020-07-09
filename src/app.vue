<template>
  <div id="app">
    <bean-nav-layout :menus="menus" />
  </div>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class App extends Vue {
    menus = [
      {
        title: '页面layout',
        route: { name: 'doc.nav-layout' },
        icon: 'el-icon-document'
      },
      {
        title: '导航栏',
        route: { name: 'doc.nav-menu' },
        icon: 'el-icon-s-operation'
      }
    ]
  }
</script>
