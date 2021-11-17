<template>
  <create-doc
    title="权限"
    :examples="examples"
    :attributes="attributes"
  >
    <highlightjs autodetect code="
      // 初始化
      // 一般在Admin登陆成功之后从后台取权限数据初始化
      import { abilityService } from 'beans-admin-plugin';
      abilityService.rules = {
        users: ['read', 'create', 'update', 'destroy'],
        adminUsers: ['read', 'create', 'update', 'destroy']
      };

      // 判断权限
      abilityService.can('users.read') // true
      abilityService.can('users.readAll') // false
      abilityService.can(['users.read', 'users.create']) // true
      abilityService.can(['users.read', 'users.readAll']) // false
    "/>
  </create-doc>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Ability extends Vue {

  attributes = [
    {
      title: 'ability组件',
      attributes: [
        {
          prop: 'can',
          desc: '权限',
          type: 'String | Array'
        }
      ]
    }
  ]

  examples = [
    {
      title: '',
      code: require('!raw-loader!./example.vue').default
    }
  ]
}

export const route = [
  {
    path: '/ability',
    name: 'ability',
    component: Ability,
    meta: { title: '权限' }
  }
]
</script>
