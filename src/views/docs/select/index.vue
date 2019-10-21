<template>
  <create-doc
    title="下拉选择"
    :attributes="attributes"
    :events="events"
    :examples="examples"
  />
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Doc extends Vue {
    attributes = [
      {
        prop: 'xRemoteSearch',
        desc: '搜索方法，返回promise<options>',
        type: 'Function',
        optionalValue: '',
        defaultValue: ''
      },
      {
        prop: 'xRemotePreload',
        desc: '初始化方法，返回promise<options>',
        type: 'Function',
        optionalValue: '',
        defaultValue: ''
      },
      {
        prop: 'options',
        desc: '初始选项',
        type: 'Array',
        optionalValue: '',
        defaultValue: ''
      },
      {
        prop: 'value/v-model',
        desc: '数据',
        type: 'String, Number, Object',
        optionalValue: '',
        defaultValue: ''
      }
    ]

    events = [
      {
        name: 'change',
        desc: '',
        args: '更新后的值'
      }
    ]

    examples = [
      {
        title: '基本用法',
        code: require('!raw-loader!./example.vue'),
        example: h => {
          const Example = require('./example.vue').default;
          return <Example h={h} />
        }
      }
    ]
  }
</script>
