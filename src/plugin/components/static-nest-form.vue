<template>
  <div class="c-static-nest-form">
    <div class="inputs" v-if="show">
      <c-source-form-item
        v-for="column in computedColumns"
        :key="column.prop"
        :column="column"
        :row="resource"
        :value="resource"
        @change="handleChange"
      />
    </div>
    <div>
      <el-button type="primary" @click="toggleShow" v-if="collapsible">{{ toggleButtonText }}</el-button>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator';
  import _ from 'lodash';

  @Component
  export default class StaticNestForm extends Vue {
    @Model('change', { type: Object, default: () => {} }) value;
    @Prop({ type: [Array, Function], default: () => [] }) columns;
    @Prop({ type: Boolean, default: false }) collapsible;

    show = false;

    get toggleButtonText() {
      return this.show ? this.$t('收起') : this.$t('展开编辑');
    }

    get resource() {
      return this.value || {};
    }

    get computedColumns() {
      if (_.isFunction(this.columns)) {
        return this.columns({ resource: this.resource });
      } else {
        return this.columns;
      }
    }

    handleChange(data) {
      this.$emit('change', data);
    }

    toggleShow() {
      this.show = !this.show;
    }

    @Watch('collapsible', { immediate: true })
    onCollapsibleChange(collapsible) {
      this.show = !collapsible;
    }
  }
</script>
