<template>
  <create-doc
    title="静态表单"
    :attributes="attributes"
    :events="events"
    :examples="examples"
  />
</template>>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Doc extends Vue {
    attributes= [
      {
        prop: 'value/v-model',
        desc: '表单数据',
        type: 'Object',
        optionalValue: '',
        defaultValue: '{}'
      },
      {
        prop: 'columns',
        desc: '', // TODO doc
        type: 'Object',
        optionalValue: '传函数回调参数{ resource: 当前表单数据 }',
        defaultValue: '[]'
      },
      {
        prop: 'collapsible',
        desc: '是否使用折叠方式',
        type: 'Boolean',
        optionalValue: 'true/false',
        defaultValue: 'false'
      }
    ]

    events = [
      {
        name: 'change',
        desc: '表单值发生变化时触发',
        args: 'change后的值'
      }
    ]

    examples = [
      {
        title: '基本用法',
        code: require('!raw-loader!./example.vue').default,
        example: h => {
          const Example = require('./example.vue').default;
          return <Example h={h} />
        }
      }
    ]
  }
</script>
