<template>
  <create-doc
    title="表单"
    :examples="examples"
    :attributes="attributes"
    :events="events"
    :slots="slots"
  />
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Form extends Vue {
  attributes = [
    {
      title: '',
      attributes: [
        {
          prop: 'value/v-model',
          desc: '绑定值',
          type: 'Object'
        },
        {
          prop: 'columns',
          desc: 'ColumnRender描述的columns',
          type: 'Array',
          defaultValue: '[ ]'
        },
        {
          prop: 'loading',
          desc: '加载中状态',
          type: 'Boolean',
        }
      ],
    }
  ];
  slots = [
    {
      name: 'header',
      desc: '表单头部插槽'
    },
    {
      name: 'action',
      desc: '底部操作按钮插槽，参数({ submit: Function, clear: Function, reset: Function })'
    }
  ];
  events = [
    {
      name: 'change',
      desc: '表单值变化触发',
      args: '表单值'
    },
    {
      name: 'submit',
      desc: '提交表单触发',
      args: '表单值'
    }
  ];
  examples = [
    {
      example: require('./example.vue').default,
      code: require('!raw-loader!./example.vue').default
    }
  ];
}

export const route = [
  {
    path: '/form',
    component: Form,
    name: 'form',
    meta: {
      title: '表单',
    }
  }
]
</script>
