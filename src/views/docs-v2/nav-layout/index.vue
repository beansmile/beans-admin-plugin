<template>
  <create-doc
    title="页面layout"
    :attributes="attributes"
    :examples="examples"
    :events="events"
    :slots="slots"
    :portals="portals"
  />
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Doc extends Vue {
    attributes = [
      {
        title: 'Props',
        attributes: [
          {
            prop: 'menus',
            desc: '菜单',
            type: 'Array',
            optionalValue: '-',
            defaultValue: '/'
          },
          {
            prop: 'showBack',
            desc: '是否显示返回按钮',
            type: 'Boolean',
            optionalValue: '-',
            defaultValue: 'false'
          }
        ]
      },
    ]

    events = [
      {
        name: 'back',
        desc: '点击返回按钮触发',
        args: '-'
      }
    ]

    examples = [
      {
        title: '基础用法',
        code: require('!raw-loader!./example.vue').default,
        example: h => {
          const Example = require('./example.vue').default;
          return <Example h={h} />
        }
      }
    ]

    slots = [
      {
        name: 'default',
        desc: '位于title右边'
      }
    ]

    portals = [
      {
        name: 'nav-layout-title',
        desc: '标题位置'
      },
      {
        name: 'nav-layout-content',
        desc: '标题右边，default slot右边'
      }
    ]
  }
</script>
