<template>
  <bean-source-page
    :type="type"
    :columns="columns"
    :form-columns="formColumns"
    :filter-columns="filterColumns"
    :actions="actions"
    :batch-actions="batchActions"
    :form="form"
    title="tests"
    namespace=""
    resource="tests"
  />
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Test extends Vue {
  @Prop(String) type;

  // form 新建表单初始化数据（default数据）
  form = {}

  /**
   * @param {Function} h - createElement
   * @param {Object} params
   * @param {String} params.type - 页面类型 enum: ['index', 'show', 'edit', 'new']
   * @param {String} params.resource -页面RESTful api资源名
   */
  filterColumns() {
    return [];
  }

  /**
   * @param {Function} h - createElement
   * @param {Object} params
   * @param {String} params.type - 页面类型 enum: ['index', 'show', 'edit', 'new']
   * @param {String} params.resource -页面RESTful api资源名
   */
  columns() {
    return [
      {
        prop: 'id',
        label: '编号',
        width: 80,
      }
    ];
  }

  /**
   * @param {Function} h - createElement
   * @param {Object} params
   * @param {String} params.type - 页面类型 enum: ['index', 'show', 'edit', 'new']
   * @param {String} params.resource -页面RESTful api资源名
   * @param {Object} params.data - 当前表单数据
   * @param {Function} params.change - 调用此方法同步表单数据 change({ field: 'new value' })
   */
  formColumns(h, { data, change }) {
    // console.log(data);
    return [
      {
        prop: 'input',
        label: '字段1',
        // locale: true,
        // locale: {
        //   en: {
        //     renderCell: {
        //       required: false,
        //       component: 'textarea'
        //     }
        //   },
        //   zh_hk: {
        //     renderCell: {
        //       required: false,
        //       component: 'datePicker'
        //     }
        //   }
        // },
        renderCell: {
          component: 'demo-input',
          required: true,
          // on: {
          //   focus: () => {
          //     console.log('focus')
          //   }
          // },
          // scopedSlots: {
          //   slot1: ({ value }) => <h1>插槽1：{value}</h1>
          // }
        }
      },
      {
        prop: 'input2',
        label: '字段2',
        renderCell: {
          component: 'input',
          require: true,
          // on: {
          //   change(val) {
          //     change({ input: val })
          //   }
          // }
        }
      }
    ];
  }

   /**
   * @param {Object} scope -页面/表格 scope 数据
   * @param {Object} scope.row - 详情页/表格行 数据
   * @param {Object} sourcePageScope
   * @param {Function} sourcePageScope.remove - sourcePage删除方法
   * @param {Function} sourcePageScope.reload - sourcePage重新请求页面数据
   */
  actions({ row }, { remove }) {
    return [
      {
        component: 'routeButton',
        props: {
          label: '编辑',
          to: { name: 'tests.edit', params: { id: row.id } }
        }
      },
      {
        component: 'confirmButton',
        props: {
          label: '删除',
          type: 'danger',
          can: 'tests.destroy'
        },
        on: {
          confirm: () => remove(row.id)
        }
      }
    ].filter(Boolean);
  }

  /**
   * @param {Object} scope -表格 scope 数据
   * @param {Object} scope.selection - 表格已选择行数据
   * @param {Object} sourcePageScope
   * @param {Function} sourcePageScope.remove - sourcePage删除方法
   * @param {Function} sourcePageScope.reload - sourcePage重新请求页面数据
   */
  batchActions() {
  // batchActions({ selection }, { remove, reload }) {
    return [
      // () => <el-button onClick={() => console.log(selection)}>批处理({ selection.length })</el-button>
    ];
  }

}


export const route = [
  {
    path: '/tests',
    name: 'tests.index',
    component: Test,
    props: {
      type: 'index',
    }
  },
  {
    path: '/tests/new',
    name: 'tests.new',
    component: Test,
    props: {
      type: 'new',
    }
  },
  {
    path: '/tests/:id',
    name: 'tests.show',
    component: Test,
    props: {
      type: 'show',
    }
  },
  {
    path: '/tests/:id/edit',
    name: 'tests.edit',
    component: Test,
    props: {
      type: 'edit'
    }
  }
]
</script>
