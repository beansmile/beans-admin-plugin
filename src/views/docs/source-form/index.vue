<template>
  <create-doc
    title="表单"
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
        title: 'Props',
        attributes: [
          {
            prop: 'columns',
            desc: '表单项配置',
            type: 'Array',
            defaultValue: '[]'
          },
          {
            prop: 'data',
            desc: '表单值',
            type: 'Object',
            defaultValue: '{}'
          },
          {
            prop: 'showCancelButton',
            desc: '是否显示取消按钮',
            type: 'Boolean',
            defaultValue: 'false'
          }
        ]
      }
    ]

    events = [
      {
        name: 'change',
        desc: '表单发生变化时触发',
        args: 'change后的值'
      },
      {
        name: 'submit',
        desc: '表单提交时触发',
        args: '表单当前值'
      }
    ]

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
