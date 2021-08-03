<template>
  <bean-nav-layout
    :menus="menus"
  >
    <template #logo>
      <div>logo位置</div>
    </template>

    <template #header-content>
      <bean-lang-switcher />
    </template>
  </bean-nav-layout>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import { abilityService } from '@/plugin';

@Component
export default class Layout extends Vue {

  // https://element.eleme.cn/#/zh-CN/component/icon
  menus = [
    {
      icon: 'el-icon-s-home',
      title: '首页',
      route: { name: 'home' },
      // children: [
      //   {
      //     icon: 'el-icon-s-promotion',
      //     title: '测试',
      //     route: '/tests',
      //     children: [
      //       {
      //         icon: 'el-icon-s-promotion',
      //         title: '测试',
      //         route: '/tests',
      //       }
      //     ]
      //   }
      // ]
    },
    {
      icon: 'el-icon-s-promotion',
      title: '测试',
      route: '/tests',
    }
  ];

  mounted() {
    abilityService.rules = {
      tests: ['create', 'read', 'update', 'delete']
    };
    // console.log(abilityService.can('tests.create'))
    // console.log(abilityService.can(['tests.create', 'tests.read']))
  }
}
</script>

<style lang="scss" scoped>


</style>
