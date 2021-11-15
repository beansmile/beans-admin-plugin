<template>
  <bean-source-page
    resource="topics"
    type="new"
    title="Topics"
    :formColumns="formColumns"
    :onFormSubmit="onFormSubmit"
  />
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import _ from 'lodash';

const TABS = {
  ask: '问答',
  share: '分享',
  job: '招聘',
  good: '精华'
}

const CustomInput = {
  template: `
    <div>
      <p>CustomInput</p>
      <el-input :value="value" @input="$emit('change', $event)" />
    </div>
  `,
  props: {
    value: {
      type: String,
      default: ''
    }
  },
}

@Component
export default class TopicsForm extends Vue {

  formColumns(h, { data, change }) {
    return [
      {
        prop: 'title',
        label: '标题',
        renderCell: {
          component: 'input',
          required: true
        }
      },
      {
        prop: 'tab',
        label: '主题分类',
        minWidth: 120,
        renderCell: {
          component: 'select',
          required: true,
          props: {
            options: _.map(TABS, (label, value) => ({
              label,
              value
            }))
          },
          on: {
            change(value) {
              // 修改title字段
              change({ title: `[${value}]${data.title || ''}` })
            }
          }
        }
      },
      {
        prop: 'customInput',
        label: '自定义组件',
        renderCell: {
          // 组件接收value props, 有一个change事件
          component: (h, context) => <CustomInput {...context} />
        }
      }
    ]
  }

  onFormSubmit({ data }) {
    alert(JSON.stringify(data, null, 2));
  }
}

export const route = [
  {
    path: '/topics-form',
    name: 'topics-form',
    component: TopicsForm
  },
]
</script>

