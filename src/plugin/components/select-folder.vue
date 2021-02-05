<template>
  <el-cascader
    placeholder="/"
    :options="foldersStore.data"
    :props="propsData"
    v-on="$listeners"
    v-bind="{ ...$attrs, ...$props }"
    :value="valueFormat"
    clearable
  ></el-cascader>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator'
  import _ from 'lodash'
  import { foldersStore } from '../stores'

  @Component
  export default class SelectFolder extends Vue {
    @Prop({ type: [String, Array], default: '' }) value
    foldersStore = foldersStore

    propsData = {
      lazy: true,
      checkStrictly: true,
      lazyLoad: async function(node, resolve) {
        if (node.isLeaf) {
          return resolve()
        }
        // 如果是一次性返回整个目录结构，在请求那里通过node判断是否请求即可
        const hasChildren = _.get(node, 'children.length') > 0
        const data = await foldersStore.tryFetchData(node)
        resolve(hasChildren ? [] : data)
      }
    }

    get valueFormat() {
      const value = this.value || ''
      return typeof value === 'string' ? value.replace(/^\/|\/$/g, '').split(',') : value
    }
  }
</script>

<style lang="scss" scoped>
</style>
