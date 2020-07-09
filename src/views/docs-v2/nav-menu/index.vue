<template>
  <create-doc
    title="导航栏"
    :attributes="attributes"
    :examples="examples"
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
            prop: 'disableCollapse',
            desc: '不显示折叠按钮',
            type: 'Boolean',
            optionalValue: '-',
            defaultValue: 'false'
          }
        ]
      },
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
  }
</script>
