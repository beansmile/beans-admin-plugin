<template>
  <div class="c-static-nest-form">
    <div class="inputs" v-if="canShow">
      <c-source-form-item
        v-for="column in computedColumns"
        :key="column.prop"
        :column="column"
        :row="value"
        :value="value"
        @change="handleChange"
      />
    </div>
    <div>
      <el-button type="primary" @click="toggleShow" v-if="collapsible">{{toggleButtonText}}</el-button>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Model } from 'vue-property-decorator';
  import _ from 'lodash';

  @Component
  export default class StaticNestForm extends Vue {
    @Model('change', { type: Object, default: () => {} }) value;
    @Prop({ type: [Array, Function], default: () => [] }) columns;
    @Prop({ type: Boolean, default: false }) collapsible;

    show = false;
    toggleButtonText = '展开编辑';

    get canShow() {
      return this.collapsible ? this.show : true;
    }

    get resources() {
      return this.value ? _.flatten([this.value]) : [];
    }

    get computedColumns() {
      if (_.isFunction(this.columns)) {
        return this.columns({ resource: this.resources });
      } else {
        return this.columns;
      }
    }

    handleChange(data) {
      this.$emit('change', data)
    }

    toggleShow() {
      this.show = !this.show;
      this.toggleButtonText = this.toggleButtonText === '展开编辑' ? '收起' : '展开编辑';
    }
  }
</script>
