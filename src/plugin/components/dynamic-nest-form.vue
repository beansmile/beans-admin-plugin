<template>
  <div class="c-dynamic-nest-form">
    <div class="inputs" v-for="(resource, index) in resources" :key="index" v-show="!resource._destroy">
      <i class="el-icon-delete" @click="hasManyRemove($event, index)"></i>
      <c-source-form-item
        v-for="column in resource.columns"
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
    @Prop({ type: Object, default: () => ({}) }) options;

    cascadeColumn = false

    created() {
      const columns = _.get(this.options, 'columns', [])
      this.cascadeColumn = _.isFunction(columns);
    }

    computeColumns(resource) {
      const columns = this.options.columns;
      if (this.cascadeColumn) {
        return columns({ resource: resource })
      } else {
        return columns;
      }
    }

    get resources() {
      const objects = this.value ? _.flatten([this.value]) : [];
      return _.map(objects, (object) => {
        object.columns = this.computeColumns(object)
        return object;
      });
    }

    handleResourceChange($event, index) {
      this.value.splice(index, 1, $event)
      const newResources = _.cloneDeep(this.value)
      newResources.splice(index, 1, $event)
      this.$emit('change', newResources)
    }

    hasManyAdd() {
      const object = { 'id': null };
      _.map(this.options.columns, (column) => {
        object[column.prop] = _.get(column.form, 'props', {}).defaultValue || ''
      })
      this.$emit('change', this.value.concat(object))
    }

    hasManyRemove($event, index) {
      const newResources = _.cloneDeep(this.value)
      const current = newResources[index];
      if (current.id) {
        current._destroy = true
        this.$set(this.value, index, current)
        newResources.splice(index, 1, current)
      } else {
        this.value.splice(index, 1)
        newResources.splice(index, 1)
      }
      this.$emit('change', newResources)
    }
  }
</script>
