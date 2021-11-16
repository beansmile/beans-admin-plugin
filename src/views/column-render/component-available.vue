<template>
  <create-doc
    title="内置组件"
    :attributes="attributes"
    :examples="examples"
  />
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class ComponentAvaliable extends Vue {
  attributes = [
    {
      title: 'moment',
      attributes: [
        {
          prop: 'value',
          desc: '绑定值',
          type: 'String | Number | Object | Date'
        },
        {
          prop: 'format',
          desc: '格式',
          type: 'String',
          defaultValue: 'YYYY-MM-DD'
        }
      ]
    },
    {
      title: 'date',
      attributes: [
        {
          prop: 'value',
          desc: '绑定值',
          type: 'String | Number | Object | Date'
        }
      ]
    },
    {
      title: 'time',
      attributes: [
        {
          prop: 'value',
          desc: '绑定值',
          type: 'String | Number | Object | Date'
        }
      ]
    },
    {
      title: 'textarea',
      attributes: [
        {
          prop: 'value',
          desc: '绑定值',
          type: 'String'
        },
        {
          prop: 'type',
          desc: '类型',
          type: 'String',
          optionalValue: 'text，textarea 和其他 原生 input 的 type 值',
          defaultValue: 'textarea'
        },
        {
          prop: 'rows',
          desc: '输入框行数，只对 type="textarea" 有效',
          type: 'String',
          defaultValue: 'textarea'
        },
        {
          prop: '其他prop',
          desc: 'https://element.eleme.cn/#/zh-CN/component/input'
        }
      ]
    },
    {
      title: 'uncontrolledTextarea',
      attributes: [
        {
          prop: 'value',
          desc: '绑定值',
          type: 'String'
        },
        {
          prop: 'rows',
          desc: '输入框行数，只对 type="textarea" 有效',
          type: 'String',
          defaultValue: 'textarea'
        },
        {
          prop: '',
          desc: 'https://element.eleme.cn/#/zh-CN/component/input'
        }
      ]
    },
    {
      title: 'datePicker',
      attributes: [
        {
          prop: 'value',
          desc: '绑定值',
          type: 'Date(DatePicker) | Array(DateRangePicker)'
        },
        {
          prop: '',
          desc: 'https://element.eleme.cn/#/zh-CN/component/date-picker#attributes',
        },
      ]
    },
    {
      title: 'DateTimePicker',
      attributes: [
        {
          prop: 'value',
          desc: '绑定值',
          type: 'Date(DatePicker) | Array(DateRangePicker)'
        },
        {
          prop: 'type',
          desc: '显示类型',
          type: 'String',
          defaultValue: 'datetime',
          optionalValue: 'year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange',
        },
        {
          prop: '',
          desc: 'https://element.eleme.cn/#/zh-CN/component/date-picker#attributes',
        },
      ]
    },
    {
      title: 'html',
      attributes: [
        {
          prop: 'value',
          desc: '绑定值',
          type: 'String'
        }
      ]
    },
    {
      title: 'bool',
      attributes: [
        {
          prop: 'value',
          desc: '绑定值',
          type: 'Boolean'
        }
      ]
    },
    {
      title: 'radioGroup',
      attributes: [
        {
          prop: 'value',
          desc: '绑定值',
          type: 'String | Number | Boolean'
        },
        {
          prop: 'options',
          desc: '选项([{ value: Any, label: String }])',
          type: 'Array'
        }
      ]
    },
    {
      title: 'storageAttachment',
      attributes: [
        {
          prop: 'value',
          desc: '绑定值',
          type: 'Object | Array<Object>'
        },
        {
          prop: 'style',
          desc: '样式',
          type: 'Object',
        },
        {
          prop: 'width',
          desc: '宽',
          type: 'String',
        },
        {
          prop: 'height',
          desc: '高',
          type: 'String',
        },
        {
          prop: 'borderRadius',
          desc: '圆角',
          type: 'String | Number',
          defaultValue: 0
        },
        {
          prop: 'className',
          desc: '容器 class',
          type: 'String'
        },
        {
          prop: 'fit',
          desc: '确定图片如何适应容器框，同原生 object-fit',
          type: 'String',
          optionalValue: 'fill | contain | cover | none | scale-down'
        },
        {
          prop: '',
          desc: '其他props https://element.eleme.cn/#/zh-CN/component/image#attributes',
        }
      ]
    },
    {
      title: 'button',
      attributes: [
        {
          prop: 'buttonName',
          desc: 'button文案',
          type: 'String',
          defaultValue: '链接'
        },
        {
          prop: '',
          desc: '其他prop 见Link组件文档'
          // TODO: 文档链接
        }
      ]
    },
    {
      title: 'confirmButton',
      attributes: [
        {
          prop: 'buttonName',
          desc: 'button文案',
          type: 'String',
          defaultValue: '删除'
        },
        {
          prop: 'buttonType',
          desc: 'button类型',
          type: 'String',
          defaultValue: 'danger',
          optionalValue: 'primary | success | warning | danger | text | link'
        },
        {
          prop: 'can',
          desc: '权限判断 AbilityService.can(can)',
          type: 'String | Array'
          // TODO: 文档链接
        },
        {
          prop: 'title',
          desc: '确认文案',
          type: 'String',
          defaultValue: '确定 {buttonName}？'
        },
        {
          prop: 'confirm-button-text',
          desc: '确定按钮文案',
          type: 'String',
          defaultValue: '确定'
        },
        {
          prop: 'cancel-button-text',
          desc: '取消按钮文案',
          type: 'String',
          defaultValue: '取消'
        },
        {
          prop: '',
          desc: '其他prop https://element.eleme.cn/#/zh-CN/component/popconfirm#attributes'
        }
      ],
      events: [
        {
          name: 'confirm',
          desc: '点击确认按钮时触发',
          args: ''
        },
        {
          name: 'cancel',
          desc: '点击取消按钮时触发',
          args: ''
        }
      ]
    },
    {
      title: 'dialogFormButton',
      attributes: [
        {
          prop: 'buttonName',
          desc: '触发弹窗button文案',
          type: 'String',
          defaultValue: '删除'
        },
        {
          prop: 'triggerButtonProps',
          desc: '触发弹窗按钮props https://element.eleme.cn/#/zh-CN/component/button#attributes',
          type: 'Object',
          defaultValue: '{ type: "primary" }'
        },
        {
          prop: '',
          desc: '其他prop见 dialogForm文档',
          type: 'Object',
          // TODO: 文档链接
        }
      ]
    },
    {
      title: 'mail',
      attributes: [
        {
          prop: 'value',
          desc: '绑定值',
          type: 'String'
        }
      ]
    },
    {
      title: 'importButton',
      attributes: [
        {
          prop: 'can',
          desc: '权限判断 AbilityService.can(can)',
          type: 'String | Array'
          // TODO: 文档链接
        },
        {
          prop: '',
          desc: '其他ImportButton prop ',
          // TODO: 文档链接
          type: ''
        }
      ]
    },
    {
      title: 'nestForm',
      attributes: [
        {
          prop: '',
          desc: '见nestForm文档',
          // TODO: 文档链接
          type: ''
        }
      ]
    },
    {
      title: 'staticNestForm',
      attributes: [
        {
          prop: '',
          desc: '见staticNestForm文档',
          // TODO: 文档链接
          type: ''
        }
      ]
    },
    {
      title: 'select',
      attributes: [
        {
          prop: '',
          desc: '见select文档',
          // TODO: 文档链接
          type: ''
        }
      ]
    },
    {
      title: 'table',
      attributes: [
        {
          prop: '',
          desc: '见table文档',
          // TODO: 文档链接
          type: ''
        }
      ]
    },
    {
      title: 'upload',
      attributes: [
        {
          prop: '',
          desc: '见upload文档',
          // TODO: 文档链接
          type: ''
        }
      ]
    },
    {
      title: 'editor',
      attributes: [
        {
          prop: '',
          desc: '见editor文档',
          // TODO: 文档链接
          type: ''
        }
      ]
    },
    {
      title: 'listSelect',
      attributes: [
        {
          prop: '',
          desc: '见listSelect文档',
          // TODO: 文档链接
          type: ''
        }
      ]
    },
    {
      title: 'pageEditor',
      attributes: [
        {
          prop: '',
          desc: '见pageEditor文档',
          // TODO: 文档链接
          type: ''
        }
      ]
    },
    {
      title: 'uncontrolledInput',
      attributes: [
        {
          prop: '',
          desc: '见uncontrolledInput文档',
          // TODO: 文档链接
          type: ''
        }
      ]
    },
    {
      title: 'resourceRender',
      attributes: [
        {
          prop: '',
          desc: '见resourceRender文档',
          // TODO: 文档链接
          type: ''
        }
      ]
    },
    {
      title: 'skuEditor',
      attributes: [
        {
          prop: '',
          desc: '见skuEditor文档',
          // TODO: 文档链接
          type: ''
        }
      ]
    },
    {
      title: 'dropdownButton',
      attributes: [
        {
          prop: '',
          desc: '见dropdownButton文档',
          // TODO: 文档链接
          type: ''
        }
      ]
    },
    {
      title: 'list',
      attributes: [
        {
          prop: '',
          desc: '见list文档',
          // TODO: 文档链接
          type: ''
        }
      ]
    }
  ];
  examples = [];
}

export const route = [
  {
    path: '/column-render/available-components',
    name: 'column-render.available-components',
    component: ComponentAvaliable,
    meta: { title: '内置组件' }
  }
]
</script>
