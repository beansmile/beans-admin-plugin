import _ from 'lodash';

export default function createColumns({ actionColumn } = {}) {
  return [
    {
      prop: 'id',
      label: '编号',
      clipboard: true
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
      renderCell: 'currency',
      clipboard: true
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
    prop: 'list-select',
    label: '选择列表',
    form: {
      component: 'listSelect',
      required: true,
      props: {
        trackBy: 'id',
        label: 'label',
        renderLabel: (h, { item, penel, index }) => <div style="color: red">{item.label}，penel: { penel }，index: { index }</div>,
        filterColumns: [
          {
            prop: 'keyword',
            label: '搜索产品',
            form: {
              component: 'input',
              props: {
                placeholder: '搜索'
              }
            }
          }
        ],
        onLoad: () => {
          return new Array(20).fill(20).map((item, index) => {
            return {
              label: 'text' + index,
              id: index
            }
          });
        },
        onFilter: (params) => {
          console.log(params);
          return new Promise(resolve => {
            setTimeout(() => {
              const data = new Array(10).fill(20).map((item, index) => {
                return {
                  label: 'textFilter' + index,
                  id: index
                }
              });
              resolve(data);
            }, 2000)
          })
        }
      }
    }
  },
  {
    prop: 'cascader',
    label: '级联选择器',
    form: {
      component: 'cascader',
      props: {
        clearable: true,
        props: {
          checkStrictly: true
        },
        options: [
          {
            label: '人气美妆',
            value: 1,
            children: [
              {
                label: '口红',
                value: 2
              },
              {
                label: '口红1',
                value: 3
              }
            ]
          },
          {
            label: '人气美妆2',
            value: 2,
            children: [
              {
                label: '口红',
                value: 4
              },
              {
                label: '口红1',
                value: 5
              }
            ]
          }
        ]
      }
    }
  },
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
      events: {
        change: (val) => console.log(val)
      },
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
      component: 'upload',
      props: {
        limit: 3,
        cropper: {
          width: 100,
          height: 100,
        }
      }
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
    label: '动态表单',
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
  },
  {
    prop: 'staticNestForm',
    label: '静态表单',
    form: {
      component: 'staticNestForm',
      props: {
        columns: [
          {
            prop: 'staticInput',
            label: '输入框',
            form: {
              component: 'input'
            }
          }
        ],
        collapsible: true
      }
    }
  }
]
