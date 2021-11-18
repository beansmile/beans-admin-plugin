<template>
  <create-doc
    title="弹窗表单"
    :attributes="attributes"
    :examples="examples"
    :slots="slots"
    :events="events"
  />
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class DialogForm extends Vue {
  attributes = [
    {
      prop: 'value',
      desc: '绑定值',
      type: 'Object',
      defaultValue: '{  }'
    },
    {
      prop: 'columns',
      desc: 'ColumnRender描述的表单Columns，见ColumnRender文档',
      type: 'Array'
    },
    {
      prop: 'title',
      desc: '弹窗标题',
      type: 'String'
    },
    {
      prop: 'submitHandler',
      desc: '触发提交handler',
      type: 'Function(data: Object)'
    },
    {
      prop: 'resetFormOnOpenDialog',
      desc: '打开弹窗时是否重置表单值',
      type: 'Boolean'
    },
    {
      prop: 'disabled',
      type: 'Boolean',
      desc: '禁用'
    }
  ];

  slots = [
    {
      name: 'default',
      desc: '触发弹窗插槽'
    }
  ];

  events = [
    {
      name: '',
      desc: '参考表单组件事件'
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
    path: '/form-dialog',
    component: DialogForm,
    name: 'form-dialog',
    meta: {
      title: '弹窗表单',
    }
  }
];
</script>
