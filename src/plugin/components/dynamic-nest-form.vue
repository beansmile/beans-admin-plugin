<template>
  <div class="c-dynamic-nest-form">
    <div class="inputs" v-for="(resource, index) in resources" :key="index" v-show="!resource._destroy">

      <el-button size="mini" circle class="btn-remove" icon="el-icon-delete" @click="hasManyRemove($event, index)"></el-button>

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
      <el-button type="primary" size="small" icon="el-icon-plus" @click="hasManyAdd">{{ $t('添加') }}</el-button>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator';
  import _ from 'lodash';

  @Component
  export default class DynamicNestForm extends Vue {
    @Model('change', { type: Array, default: () => [] }) value;
    @Prop({ type: [Array, Function], default: () => [] }) columns;
    @Prop({ type: String, default: 'id' }) addDestroyFlagFieldName; // 删除后添加_destory的数据标识

    form = []

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

    @Watch('value')
    onValueChange(val) {
      this.form = val || [];
    }

    syncChange = _.debounce((component) => {
      component.$emit('change', component.form);
    }, 100);

    handleResourceChange($event, index) {
      this.$set(this.form, index, $event);
      this.syncChange(this);
    }

    hasManyAdd() {
      this.form.push({});
      this.syncChange(this);
    }

    hasManyRemove($event, index) {
      const current = this.form[index];
      if (current[this.addDestroyFlagFieldName]) {
        current._destroy = true
        this.form.splice(index, 1, current)
      } else {
        this.form.splice(index, 1)
      }
      this.syncChange(this);
    }
  }
</script>
