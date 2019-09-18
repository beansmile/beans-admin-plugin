import _ from 'lodash';

export default function createColumns({ actionColumn } = {}) {
  return [
    {
      prop: 'id',
      label: '编号'
    },
    {
      prop: 'created_at',
      label: '创建时间',
      renderCell: 'time',
      form: {
        component: 'dateTimePicker'
      }
    },
    {
      prop: 'updated_at',
      label: '更新时间',
      renderCell: 'date',
      form: {
        component: 'datePicker'
      }
    },
    {
      prop: 'order_date',
      label: '下单时间',
      renderCell(h, { row }) {
        return <time style="color: red;">{row.order_date}</time>
      }
    },
    {
      prop: 'shop_status',
      label: '状态'
    },
    {
      prop: 'amount',
      label: '金额',
      renderCell: 'currency'
    },
    {
      prop: 'pay_amount',
      label: '实际支付',
      renderCell: 'currency'
    },
    {
      prop: 'cost_integral',
      label: '使用积分'
    },
    {
      prop: 'promotion_name',
      label: '优惠券'
    },
    {
      prop: 'buyer_account',
      label: '下单用户'
    },
    _.merge({
      prop: 'action',
      label: '操作',
      fixed: 'right',
      edit: true,
      detail: true,
      delete: {
        handler: (scope) => console.log(scope)
      },
      extraAction: (h, scope) => {
        return [
          {
            text: '发货',
            handler: () => console.log(scope)
          },
          {
            text: '关闭订单',
            handler: () => console.log(scope)
          }
        ]
      }
    }, actionColumn)
  ]
}

export const formColumn = [
  {
    prop: 'radioGroup',
    label: '单选',
    form: {
      component: 'radioGroup',
      props: {
        radios: [
          {
            label: 'radio1',
            title: 'radio1'
          },
          {
            label: 'radio2',
            title: 'radio2'
          }
        ]
      }
    }
  },
  {
    prop: 'checkboxGroup',
    label: '多选',
    form: {
      component: 'checkboxGroup',
      props: {
        checkboxs: [
          {
            label: 'checkboxGroup1',
            title: 'checkboxGroup1'
          },
          {
            label: 'checkboxGroup2',
            title: 'checkboxGroup2'
          }
        ]
      }
    }
  },
  {
    prop: 'input',
    label: '输入框',
    form: {
      component: 'input',
    }
  },
  {
    prop: 'inputNumber',
    label: '数字输入框',
    form: {
      component: 'inputNumber',
    }
  },
  {
    prop: 'select',
    label: '下拉选框',
    form: {
      component: 'select',
      props: {
        options: [
          {
            label: 'select1',
            value: 'select1'
          },
          {
            label: 'select2',
            value: 'select2'
          }
        ]
      }
    }
  },
  {
    prop: 'switch',
    label: '开关',
    form: {
      component: 'switch'
    }
  },
  {
    prop: 'datePicker',
    label: '日期选择',
    form: {
      component: 'datePicker'
    }
  },
  {
    prop: 'dateTimePicker',
    label: '日期时间选择',
    form: {
      component: 'dateTimePicker'
    }
  },
  {
    prop: 'colorPicker',
    label: '颜色选择',
    form: {
      component: 'colorPicker'
    }
  },
  {
    prop: 'upload',
    label: '上传',
    form: {
      component: 'upload'
    }
  },
  {
    prop: 'editor',
    label: '富文本编辑器',
    form: {
      component: 'editor'
    }
  },
  {
    prop: 'nestForm',
    label: 'nestForm',
    form: {
      component: 'nestForm',
      props: {
        columns: [
          {
            prop: 'input',
            label: '输入框',
            form: {
              component: 'input'
            }
          }
        ]
      }
    }
  }
]
