<template>
  <create-doc
    title="source-page"
    :attributes="attributes"
    :examples="examples"
    :events="events"
  />
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class SourcePage extends Vue {
  attributes = [
    {
      prop: 'type',
      desc: '页面类型',
      type: 'String',
      optionalValue: 'index, new, edit, show',
      defaultValue: ''
    },
    {
      prop: 'title',
      desc: '页面标题',
      type: 'String | Object',
      optionalValue: '',
      defaultValue: ''
    },
    {
      prop: 'namespace',
      desc: 'namespace + resource 作为请求参数',
      type: 'String',
    },
    {
      prop: 'resource',
      desc: '资源名',
      type: 'String',
    },
    {
      prop: 'columns',
      desc: 'columnRender组件描述的列表和详情columns',
      type: 'Array | Function',
    },
    {
      prop: 'tabs',
      desc: '详情页tabs',
      type: 'Array',
    },
    {
      prop: 'formColumns',
      desc: 'columnRender组件描述的表单columns',
      type: 'Array | Function',
    },
    {
      prop: 'filterColumns',
      desc: 'columnRender组件描述的筛选栏columns',
      type: 'Array | Function',
    },
    {
      prop: 'actionButtons',
      desc: 'columnRender组件描述的操作按钮(是否可以新建，可以去详情)',
      type: 'Array',
      optionalValue: '["new", "show"]',
      defaultValue: '["new", "show"]'
    },
    {
      prop: 'exportProps',
      desc: '导出操作组件Props',
      type: 'Object',
    },
    {
      prop: 'exportProps',
      desc: '导出操作组件Props',
      type: 'Object',
    },
    {
      prop: 'importProps',
      desc: '导入操作组件Props',
      type: 'Object',
    },
    {
      prop: 'actions',
      desc: 'columnRender组件描述的单个操作按钮',
      type: 'Array | Function',
    },
    {
      prop: 'batchActions',
      desc: 'columnRender组件描述的批量操作按钮',
      type: 'Object | Function',
    },
    {
      prop: 'tableEvents',
      desc: 'element table组件事件',
      type: 'Object',
      optionalValue: '',
      defaultValue: '{}'
    },
    {
      prop: 'tableProps',
      desc: 'element table组件props',
      type: 'Object',
      optionalValue: '',
      defaultValue: '{}'
    },
    {
      prop: 'beforeSubmit',
      desc: '表单页提交前hook，需要返回需要提交的表单值',
      type: 'Function({ data, originData, state, type, resource, namespace })',
      optionalValue: '',
      defaultValue: ''
    },
    {
      prop: 'afterSubmit',
      desc: '表单页提交成功后hook',
      type: 'Function({ data, originData, state, type, resource, namespace }, result)',
      optionalValue: '',
      defaultValue: ''
    },
    {
      prop: 'onFormSubmit',
      desc: '表单提交hook',
      type: 'Function({ data, originData, state, type, resource, namespace })',
      optionalValue: '',
      defaultValue: ''
    },
    {
      prop: 'onFetchData',
      desc: '组件触发请求时hook',
      type: 'Function({ resource, type, namespace })',
      optionalValue: '',
      defaultValue: ''
    },
    {
      prop: 'onDelete',
      desc: '组件触发删除请求时hook',
      type: 'Function({ id, type, resource, namespace })',
      optionalValue: '',
      defaultValue: ''
    },
    {
      prop: 'afterDelete',
      desc: '组件触发删除请求时hook',
      type: 'Function({ id, type, resource, namespace })',
      optionalValue: '',
      defaultValue: ''
    },
    {
      prop: 'form',
      desc: '新建表单默认值（传onFetchData后会失效，需要在onFetchData处理默认值）',
      type: 'Object',
      optionalValue: '',
      defaultValue: '{}'
    },
    {
      prop: 'actionColumnProps',
      desc: '表单操作column props',
      type: 'Object',
      optionalValue: '',
      defaultValue: ''
    },
    {
      prop: 'collapseFilter',
      desc: '是否折叠筛选栏',
      type: 'Boolean',
      optionalValue: '',
      defaultValue: ''
    },
  ];
  events = [];
  examples = [
    {
      title: '基本示例',
      code: require('!raw-loader!./topics.vue').default
    },
    {
      title: '详情tab',
      code: require('!raw-loader!./topics-detail-tab.vue').default
    },
    {
      title: '表单自定义',
      code: require('!raw-loader!./topics-form.vue').default
    }
  ];
}

export const route = [
  {
    path: '/source-page',
    name: 'source-page',
    component: SourcePage,
    meta: { title: 'SourcePage' }
  }
];
</script>
