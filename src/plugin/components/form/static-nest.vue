<template>
  <div class="admin-static-nest-form">
    <div class="static-nest-form-group" v-if="show">
      <AdminForm
        v-bind="$attrs"
        :value="resource"
        :columns="computedColumns"
        @change="handleChange"
      >
        <template v-slot:action>
          <span />
        </template>
      </AdminForm>
    </div>
    <div>
      <el-button type="primary" @click="toggleShow" v-if="collapsible">{{ toggleButtonText }}</el-button>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator';
  import AdminForm from './index';
  import _ from 'lodash';

  @Component({
    components: {
      AdminForm
    }
  })
  export default class StaticNestForm extends Vue {
    @Model('change', { type: Object, default: () => {} }) value;
    @Prop({ type: [Array, Function], default: () => [] }) columns;
    @Prop({ type: Boolean, default: false }) collapsible;

    show = false;

    get toggleButtonText() {
      return this.show ? this.$t('bean.actionCollapse') : this.$t('bean.actionExpand');
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
