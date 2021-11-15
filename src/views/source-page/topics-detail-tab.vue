<template>
  <bean-source-page
    resource="topics"
    type="show"
    title="Topics"
    :tabs="tabs"
    :onFetchData="onFetchData"
    :actions="actions"
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

@Component
export default class TopicsDetail extends Vue {

  async onFetchData() {
    const baseURL = 'https://cnodejs.org/api/v1';
    const { data } = await this.$request.get(`/topic/${this.$route.params.id}`, {}, { baseURL });
    return { data };
  }

  tabs = [
    {
      label: '基本信息',
      columns: [
      {
        prop: 'id',
        label: 'ID',
        minWidth: 120
      },
      {
        prop: 'title',
        label: '标题',
        minWidth: 150
      },
      {
        prop: 'tab',
        label: '主题分类',
        minWidth: 120,
        renderCell: (h, { props: { value } }) => {
          return <el-tag>{ TABS[value] }</el-tag>
        }
      },
      {
        prop: 'visit_count',
        label: '访问量',
        minWidth: 100
      },
      {
        prop: 'reply_count',
        label: '回复数',
        minWidth: 100
      },
      {
        prop: 'author.avatar_url',
        label: '作者头像',
        renderCell: (h, { props: { value } }) => {
          return <el-image src={value} />
        },
        minWidth: 100
      },
      {
        prop: 'author',
        label: '作者名称',
        minWidth: 120,
        renderCell: (h, { props: { scope } }) => {
          return <span>{_.get(scope.row, 'author.loginname')}</span>
        },
      },
      {
        prop: 'good',
        label: '精华',
        renderCell: 'bool',
        minWidth: 80
      },
      {
        prop: 'top',
        label: '置顶',
        renderCell: 'bool',
        minWidth: 80
      },
      {
        prop: 'create_at',
        label: '创建于',
        renderCell: 'time',
        minWidth: 150
      },
      {
        prop: 'last_reply_at',
        label: '最后评论于',
        renderCell: 'time',
        minWidth: 150
      },
      ]
    },
    {
      label: 'tab1',
      renderCell: (h, value) => {
        return <pre>{JSON.stringify(value, null, 2)}</pre>
      }
    }
  ];

  actions() {
    return [];
  }
}

export const route = [
  {
    path: '/topics-tab/:id',
    name: 'topics-tab.show',
    component: TopicsDetail
  },
]
</script>

