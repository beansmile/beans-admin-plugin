<template>
  <div class="c-dynamic-nest-form">
    <div class="inputs" v-for="(resource, index) in resources" :key="index" v-show="!resource._destroy">
      <i class="el-icon-delete" @click="hasManyRemove($event, index)"></i>
      <c-source-form-item
        v-for="column in computedColumns"
        :key="column.prop"
        :column="column"
        :row="resource"
        :value="resource"
        @change="handleResourceChange($event, index)"
      />
    </div>
    <div>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="hasManyAdd">添加</el-button>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Model } from 'vue-property-decorator';
  import _ from 'lodash';

  @Component
  export default class DynamicNestForm extends Vue {
    @Model('change', { type: Array, default: () => [] }) value;
    @Prop({ type: [Array, Function], default: () => [] }) columns;
    @Prop({ type: String, default: 'id' }) addDestroyFlagFieldName; // 删除后添加_destory的数据标识

    get resources() {
      return this.value ? _.flatten([this.value]) : [];
    }

    get computedColumns() {
      if (_.isFunction(this.columns)) {
        return this.columns({ resource: this.resources })
      } else {
        return this.columns;
      }
    }

    handleResourceChange($event, index) {
      const newResources = _.cloneDeep(this.value)
      newResources.splice(index, 1, $event)
      this.$emit('change', newResources)
    }

    hasManyAdd() {
      this.$emit('change', this.value.concat({}))
    }

    hasManyRemove($event, index) {
      const newResources = _.cloneDeep(this.value)
      const current = newResources[index];
      if (current[this.addDestroyFlagFieldName]) {
        current._destroy = true
        newResources.splice(index, 1, current)
      } else {
        newResources.splice(index, 1)
      }
      this.$emit('change', newResources)
    }
  }
</script>
