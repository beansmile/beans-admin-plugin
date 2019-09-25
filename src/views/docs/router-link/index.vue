<template>
  <!-- TODO permissionService 文档-->
  <create-doc
    title="带权限判断的router-link，需要配置permissionService，文档暂无"
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
        prop: 'replace',
        desc: (h) => {
          return <a h={h} target="_blank" href="https://router.vuejs.org/zh/api/#router-link-props">等于Vue Router router-link Props replace</a>
        },
        type: 'Boolean',
        optionalValue: '',
        defaultValue: 'false'
      },
      {
        prop: 'keepNode',
        desc: '没权限时是否保留节点，无权限时点击此节点会提示无权限',
        type: 'Boolean',
        optionalValue: '',
        defaultValue: 'true'
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
