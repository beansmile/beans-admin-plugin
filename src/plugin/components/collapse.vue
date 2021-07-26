<template>
  <div class="admin-collapse">
    <div class="box-content">
      <div class="content">
        <slot />
      </div>
      <el-button v-if="(!$slots.trigger) && (!$scopedSlots.trigger)" :icon="`el-icon-arrow-${collapsed ? 'down' : 'up'}`" circle @click="collapsed = !collapsed"></el-button>
    </div>
    <div class="box-collapsed" :class="[collapsedContentClass]" v-show="!collapsed">
      <slot name="collapsed" />
    </div>
    <span @click="collapsed = !collapsed">
      <slot name="trigger" v-bind="{ collapsed }" />
    </span>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component
  export default class Collapse extends Vue {
    @Prop(String) collapsedContentClass;

    collapsed = true;
  }
</script>

<style lang="scss" scoped>
  .box-content {
    display: flex;
    align-items: flex-start;

    .content {
      flex: 1;
    }

    .el-button {
      flex-shrink: 0;
      margin-left: 15px;
    }
  }
</style>
