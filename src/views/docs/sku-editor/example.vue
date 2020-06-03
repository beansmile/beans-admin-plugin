<template>
  <c-sku-editor
    title="sku信息"
    v-model="skus"
    :sku-properties="skuProperties"
    :sku-columns="skuColumns"
    @add-property="handleAddProperty"
    @add-property-value="handleAddPropertyValue"
    @edit-property-text="handleEditPropertyText"
  />
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Example extends Vue {
    skuProperties = [
      {
        text: '重量',
        value: 1,
        children: [
          {
            text: '500g',
            value: 1
          },
          {
            text: '1000g',
            value: 2
          }
        ]
      },
      {
        text: '容量',
        value: 2,
        children: [
          {
            text: '30ml',
            value: 1
          }
        ]
      },
      {
        text: '功能',
        value: 3,
        children: [
          {
            text: '淡化色斑',
            value: 1
          },
          {
            text: '去皱纹',
            value: 2
          }
        ]
      }
    ];


    skus = [
      {
        id: 1,
        properties: '1:1;3:2',
        code: '323333',
        price: 100,
        qty: 10,
        weight: 10
      }
    ];

    skuColumns = [
      {
        prop: 'code',
        label: '货号',
        form: {
          component: 'input'
        }
      },
      {
        prop: 'price',
        label: '价格',
        form: {
          component: 'inputNumber'
        }
      },
      {
        prop: 'qty',
        label: '库存',
        form: {
          component: 'inputNumber'
        }
      },
      {
        prop: 'weight',
        label: '重量',
        form: {
          component: 'inputNumber'
        }
      }
    ];

    handleAddProperty(text) {
      this.skuProperties.push({
        id: 10,
        text,
        children: []
      });
    }

    handleAddPropertyValue({ value, id }) {
      const index = this.skuProperties.findIndex(item => String(item.value) === String(id));
      this.skuProperties[index].children.push({ id: 'xxx', text: value })
    }

    handleEditPropertyText({ value, id }) {
      console.log(value, id)
    }
  }
</script>
