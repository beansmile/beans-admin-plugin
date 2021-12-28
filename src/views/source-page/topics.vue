<template>
  <bean-source-page
    resource="topics"
    :type="type"
    title="Topics"
    :columns="columns"
    :filterColumns="filterColumns"
    :scopeColumns="scopeColumns"
    :formColumns="formColumns"
    :onFetchData="onFetchData"
    :actions="actions"
    :batchActions="batchActions"
    :exportProps="exportProps"
    :importProps="importProps"
  />
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator';
import _ from 'lodash';

const TABS = {
  ask: '问答',
  share: '分享',
  job: '招聘',
  good: '精华'
}

@Component
export default class Topics extends Vue {
  @Prop(String) type;

  form = {};

  filterColumns = [
    {
      prop: 'tab',
      label: '主题分类',
      renderCell: {
        component: 'select',
        props: {
          options: _.map(TABS, (label, value) => ({ label, value })),
          clearable: true
        }
      }
    }
  ]

  scopeColumns = [
    {
      prop: 'tab',
      label: '主题分类',
      renderCell: {
        component: 'radioGroup',
        props: {
          options: _.map(TABS, (label, value) => ({ label, value }))
        }
      }
    }
  ]

  columns = [
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
  ];

  formColumns = [
    {
      prop: 'title',
      label: '标题',
      renderCell: {
        required: true,
        component: 'input',
        rules: [
          {
            type: 'string',
            min: 4,
            max: 20,
            message: '长度4 - 20'
          },
          // {
          //   type: 'string',
          //   pattern: /^[A-Za-z]+$/,
          //   message: '只能填写英文大小写字母'
          // }
        ]
      }
    },
    {
      prop: 'tab',
      label: '主题分类',
      renderCell: {
        component: 'select',
        required: true,
        props: {
          options: _.map(TABS, (label, value) => ({ label, value })),
        }
      }
    },
    {
      prop: 'content',
      label: '内容',
      renderCell: 'editor'
    }
  ]

  exportProps = {
    buttonText: '导出主题',
    url: '/export'
  }

  importProps = {
    buttonText: '导入主题',
    url: '/import'
  }

  async onFetchData({ type }) {
    const limit = this.$route.query.per_page || 10;
    const page = this.$route.query.page || 1;
    const baseURL = 'https://cnodejs.org/api/v1';
    if (type === 'index') {
      const { data } = await this.$request.get('/topics', { ...this.$route.query, limit, page }, { baseURL });
      return {
        data,
        pagination: {
          total: 100,
          pageSize: limit,
          currentPage: page
        }
      }
    }
    if (this.type === 'edit' || this.type === 'show') {
      const { data } = await this.$request.get(`/topic/${this.$route.params.id}`, {}, { baseURL });
      return { data };
    }
    if (this.type === 'new') {
      return {
        data: this.form
      }
    }

  }

  batchActions({ selection }) {
    return [
      {
        component: () => <el-button onClick={() => alert('批量操作')} disabled={ selection.length === 0 }>批量操作</el-button>
      }
    ]
  }

  actions({ row }) {
    return [
      {
        component: 'routeButton',
        props: {
          to: { name: 'topics.edit', params: { id: row.id } },
          type: 'primary',
          label: '编辑'
        }
      },
      {
        component: 'confirmButton',
        props: {
          label: '删除',
          type: 'danger',
        },
        on: {
          confirm: () => {
            alert('删除');
          }
        }
      },
      {
        component: () => <el-button type="warning" onClick={() => alert('其他操作')}>其他操作</el-button>
      }
    ];
  }
}

export const route = [
  {
    path: '/topics',
    name: 'topics.index',
    component: Topics,
    props: {
      type: 'index',
    }
  },
  {
    path: '/topics/new',
    name: 'topics.new',
    component: Topics,
    props: {
      type: 'new',
    }
  },
  {
    path: '/topics/:id',
    name: 'topics.show',
    component: Topics,
    props: {
      type: 'show',
    }
  },
  {
    path: '/topics/:id/edit',
    name: 'topics.edit',
    component: Topics,
    props: {
      type: 'edit'
    }
  }
];
</script>
