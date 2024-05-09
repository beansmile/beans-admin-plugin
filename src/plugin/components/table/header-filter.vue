<template>
  <el-popover width="150px">
    <!--
      sort 点击事件由 ele 控制, 我们无法控制, 只能通过阻止冒泡屏蔽其中一种触发方式, 避免与 filter 事件同时触发
      源码: https://github.com/ElemeFE/element/blob/c345bb453bf11badb4831a6a3f600c9372b3a336/packages/table/src/table-header.js#L330
      由源码得知事件分别加在两个地方, 1. 两个三角形的排序指示器; 2. 父级 th 标签上
    -->
    <div
      class="admin-table-header-filter-trigger"
      slot="reference"
      :class="{ isActive }"
      @click.stop
    >
      <slot />
      <i class="icon el-icon-arrow-down" style="cursor: pointer;"></i>
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
