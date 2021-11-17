<template>
  <create-doc
    title="表格"
    :examples="examples"
    :attributes="attributes"
    :events="events"
    :slots="slots"
  />
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Table extends Vue {
  attributes = [
    {
      title: '表格 props',
      attributes: [
        {
          prop: 'value',
          desc: '绑定值',
          type: 'Array',
          defaultValue: '[ ]'
        },
        {
          prop: 'columns',
          desc: 'ColumnRender描述的columns',
          type: 'Array',
          defaultValue: '[ ]'
        },
        {
          prop: 'actions',
          desc: 'ColumnRender描述的追加在表格最后一列的操作项',
          type: 'Array | Function',
          defaultValue: ''
        },
        {
          prop: 'actionColumnProps',
          desc: '最后一列操作列column props',
          type: 'Object',
          defaultValue: '{ }'
        },
        {
          prop: '',
          desc: '其他prop参考 https://element.eleme.cn/#/zh-CN/component/table#table-attributes'
        }
      ]
    }
  ];
  slots = [];
  events = [
    {
      name: '',
      desc: '事件参考这里 https://element.eleme.cn/2.14/#/zh-CN/component/table#table-events'
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
    path: '/table',
    component: Table,
    name: 'table',
    meta: {
      title: '表格',
    }
  }
]
</script>
