<template>
  <create-doc
    title="筛选栏"
    :attributes="attributes"
    :events="events"
    :examples="examples"
  >
    筛选时会改变页面路由参数，通过路由参数改变重新渲染页面获取新数据
  </create-doc>
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
            prop: 'filter',
            desc: '筛选项',
            type: 'Array',
            defaultValue: '[]'
          }
        ]
      }
    ]

    events = []

    examples = [
      {
        title: '用法',
        code: require('!raw-loader!./example.vue').default,
        example: h => {
          const Example = require('./example.vue').default;
          return <Example h={h} />
        }
      }
    ]

  }
</script>
