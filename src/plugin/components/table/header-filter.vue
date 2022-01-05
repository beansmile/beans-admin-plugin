<template>
  <el-popover width="150px">
    <div class="admin-table-header-filter-trigger" slot="reference" :class="{ isActive }">
      <slot />
      <i class="icon el-icon-arrow-down"></i>
    </div>
    <AdminFilter
      class="admin-table-header-filter"
      :value="value"
      :columns="columns"
      :inline="false"
      label-position="top"
      v-on="$listeners"
      v-bind="$attrs"
      size="mini"
    />
  </el-popover>
</template>

<script>
import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import AdminFilter from '../form/filter';
import _ from 'lodash';

@Component({
  components: {
    AdminFilter
  }
})
export default class AdminTableHeaderFilter extends Vue {
  @Model('change', { type: Object, default: () => ({}) }) value;
  @Prop({ type: Array, default: () => [] }) columns;

  get isActive() {
    return !!this.columns.find(item => {
      if (item.prop && _.has(this.value, item.prop)) {
        const val = this.value[item.prop];
        if (_.isPlainObject(val)) {
          return !_.isEmpty(val);
        }
        if (_.isArray(val)) {
          return val.length > 0;
        }
        return val !== undefined && val !== null && val !== '';
      }
      return false;
    });
  }
}
</script>
