<template>
  <bean-nav-menu :menus="menus" disableCollapse />
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class App extends Vue {
    menus = [
      {
        title: '导航一',
        route: { },
        icon: 'el-icon-location'
      },
      {
        title: '导航二',
        icon: {
          template: '<i class="el-icon-location"></i>'
        },
        children: [
          {
            title: '导航二-1',
            route: {}
          },
          {
            title: '导航二-2',
            route: {},
            children: [
              {
                title: '导航二-2-1'
              }
            ]
          }
        ]
      }
    ]

  }
</script>
