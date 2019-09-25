<template>
  <create-doc
    title="权限控制"
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
        prop: 'permisson',
        desc: '需要的权限，需要配置permissionService，文档暂无', //TODO
        type: 'String, Array',
        optionalValue: '',
        defaultValue: ''
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
