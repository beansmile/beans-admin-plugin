<template>
  <c-list-select
    :on-load="onLoad"
    :on-filter="onFilter"
    :render-label="renderLabel"
    :filter-columns="filterColumns"
    label="label"
    track-by="id"
    v-model="value"
    sort
  />
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Example extends Vue {
    value = []

    filterColumns = [
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
    ]

    renderLabel(h, { item, penel, index }) {
      return <div style="color: red">{item.label}，penel: { penel }，index: { index }</div>
    }

    onLoad() {
      return new Array(20).fill(20).map((item, index) => {
        return {
          label: 'text' + index,
          id: index
        }
      });
    }

    onFilter(params) {
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
</script>
