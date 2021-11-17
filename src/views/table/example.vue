<template>
  <bean-table
    :columns="columns"
    :value="value"
    :actions="actions"
    :actionColumnProps="actionColumnProps"
    @cell-click="handleCellClick"
  />
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Example extends Vue {
  value = [
    {
      id: 1,
      province: '北京市',
      city: '北京市',
      district: '东城区',
      created_at: '2021-11-17 11:33:04',
      updated_at: '2021-11-17 11:33:04',
    },
    {
      id: 2,
      province: '广东省',
      city: '广州市',
      district: '海珠区',
      created_at: '2021-11-17 11:33:04',
      updated_at: '2021-11-17 11:33:04'
    }
  ];

  columns = [
    // 其他prop 参考 https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes
    {
      prop: 'province',
      label: '省',
    },
    {
      prop: 'city',
      label: '市',
    },
    {
      prop: 'district',
      label: '区'
    },
    {
      prop: 'created_at',
      label: '创建于',
      renderCell: 'time',
      minWidth: 100,
    },
    {
      prop: 'updated_at',
      label: '更新于',
      minWidth: 150,
      renderCell: (h, { props: { value } }) => {
        return <span>时间:{value}</span>
      }
    }
  ]

  actionColumnProps = {
    label: '操作列',
    // 其他prop 参考 https://element.eleme.cn/#/zh-CN/component/table#table-column-attributes
  }

  actions(scope) {
    return [
      {
        component: 'confirmButton',
        props: {
          label: `删除${scope.row.province}`,
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
    ]
  }

  handleCellClick() {
    alert('cell click');
  }

}
</script>
