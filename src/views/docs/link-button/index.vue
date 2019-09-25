<template>
  <create-doc
    title="链接按钮"
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
        prop: 'to',
        desc: (h) => {
          return <a h={h} target="_blank" href="https://router.vuejs.org/zh/api/#router-link-props">等于Vue Router router-link Props to</a>
        },
        type: 'Object, String',
        optionalValue: '',
        defaultValue: ''
      },
      {
        prop: 'linkProps',
        desc: (h) => {
          return <a h={h} target="_blank" href="https://router.vuejs.org/zh/api/#router-link-props">查看Vue Router router-link Props</a>
        },
        type: 'Object',
        optionalValue: '',
        defaultValue: ''
      },
      {
        prop: 'buttonProps',
        desc: (h) => {
          return <a h={h} target="_blank" href="https://element.eleme.cn/#/zh-CN/component/button">查看element-ui-button</a>
        },
        type: 'Object',
        optionalValue: '',
        defaultValue: '{ type: "text" }'
      }
    ]

    events = []

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
