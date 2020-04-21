<template>
  <create-doc
    title="自定义页面"
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
        prop: 'value',
        desc: '自定义页面数据',
        type: 'Array',
        optionalValue: '',
        defaultValue: '[]'
      },
      {
        prop: 'customComponents',
        desc: '自定义新的页面组件(如果自带的组件不满足需求，暂无文档，参考源码)',
        type: 'Array',
        optionalValue: '',
        defaultValue: '[]'
      },
      {
        prop: 'useComponents',
        desc: '选择要使用的组件，不传或者[]则全部使用',
        type: 'Array',
        optionalValue: '',
        defaultValue: '[]'
      },
      {
        prop: 'data',
        desc: '传给自定义组件的数据',
        type: 'Object',
        optionalValue: '',
        defaultValue: ''
      }
    ]

    events = [
      {
        name: 'change',
        desc: '页面发生变化时触发',
        args: 'change后的值'
      },
      {
        name: 'submit',
        desc: '页面保存按钮点击时触发',
        args: '当前页面值'
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
