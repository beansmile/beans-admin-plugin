<template>
  <create-doc
    title="column-render"
    :attributes="attributes"
    :examples="examples"
    :events="events"
  />
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ColumnRender extends Vue {
  attributes = [
    {
      prop: 'renderCell',
      desc: '渲染参数',
      type: 'String | Function | Object'
    },
    {
      prop: 'renderCell.can',
      desc: '权限判断',
      type: 'String | Array',
      // TODO: 文档链接
    },
    {
      prop: 'renderCell.hint',
      desc: '表单项提示，仅表单可用',
      type: 'String',
    },
    {
      prop: 'renderCell.rules',
      desc: '表单项验证，仅表单可用',
      type: 'Array',
      // TODO: 文档链接
    },
    {
      prop: 'renderCell.required',
      desc: '表单项是否验证必填，仅表单可用',
      type: 'Boolean',
      // TODO: 文档链接
    },
    {
      prop: 'renderCell.component',
      desc: '组件/组件名',
      type: 'String | Function | Object',
      optionalValue: '',
      defaultValue: ''
    },
    {
      prop: 'renderCell.props',
      desc: '渲染component的props',
      type: 'Object',
      optionalValue: '',
      defaultValue: ''
    },
    {
      prop: 'renderCell.class',
      desc: '字符串、对象或字符串和对象组成的数组。与 `v-bind:class` 的 API 相同',
      type: 'String | Object | Array',
      optionalValue: '',
      defaultValue: ''
    },
    {
      prop: 'renderCell.style',
      desc: '字符串、对象，或对象组成的数组。与 `v-bind:style` 的 API 相同',
      type: 'String | Object | Array',
      optionalValue: '',
      defaultValue: ''
    },
    {
      prop: 'renderCell.attrs',
      desc: '普通的 HTML attribute',
      type: 'Object',
      optionalValue: '',
      defaultValue: ''
    },
    {
      prop: 'renderCell.domProps',
      desc: 'DOM property',
      type: 'Object',
      optionalValue: '',
      defaultValue: ''
    },
    {
      prop: 'renderCell.on',
      desc: '事件监听器',
      type: 'Object',
      optionalValue: '',
      defaultValue: ''
    },
    {
      prop: 'renderCell.nativeOn',
      desc: '仅用于组件，用于监听原生事件，而不是组件内部使用',
      type: 'Object',
      optionalValue: '',
      defaultValue: ''
    },
    {
      prop: 'renderCell.directives',
      desc: '自定义指令',
      type: 'Object',
      optionalValue: '',
      defaultValue: ''
    },
    {
      prop: 'renderCell.scopedSlots',
      desc: '作用域插槽',
      type: 'Object',
      optionalValue: '',
      defaultValue: ''
    },
    {
      prop: 'renderCell.slot',
      desc: '插槽',
      type: 'Object',
      optionalValue: '',
      defaultValue: ''
    },
    {
      prop: 'renderCell.key',
      desc: 'key',
      type: 'String',
      optionalValue: '',
      defaultValue: ''
    },
    {
      prop: 'renderCell.ref',
      desc: 'ref',
      type: 'String',
      optionalValue: '',
      defaultValue: ''
    },
    {
      prop: 'renderCell.refInFor',
      desc: '如果你在渲染函数中给多个元素都应用了相同的 ref 名, 那么 `$refs.myRef` 会变成一个数组。',
      type: 'Boolean',
      optionalValue: '',
      defaultValue: ''
    }
  ];
  examples = [
    {
      title: 'html标签/已注册的组件',
      example: require('./tag.vue').default,
      code: require('!raw-loader!./tag.vue').default
    },
    {
      title: '自定义渲染',
      example: require('./custom.vue').default,
      code: require('!raw-loader!./custom.vue').default
    }
  ];
  events = [];
}

export const route = [
  {
    path: '/column-render',
    name: 'column-render',
    component: ColumnRender,
    meta: { title: 'ColumnRender' }
  }
];
</script>
