<template>
  <create-doc
    title="图片预览"
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
        prop: 'urls',
        desc: '图片组urls（待实现）',
        type: 'Array',
        optionalValue: '',
        defaultValue: ''
      },
      {
        prop: 'current',
        desc: '当前图片src',
        type: 'Object',
        optionalValue: '',
        defaultValue: ''
      }
    ]

    events = []

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
