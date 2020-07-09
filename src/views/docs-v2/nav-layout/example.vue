<template>
  <div>
    <bean-nav-layout
      :menus="menus"
      show-back
      @back="handleBack"
    />
    <portal to="nav-layout-content">
      <span style="color: red; margin-left: 20px;">nav-layout-content</span>
    </portal>
  </div>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Example extends Vue {
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

    handleBack() {
      console.log('back');
    }

  }
</script>
