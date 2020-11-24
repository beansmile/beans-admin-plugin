<template>
  <div class="admin-collapse">
    <div class="box-content">
      <div class="content">
        <slot />
      </div>
      <el-button :icon="`el-icon-arrow-${collapsed ? 'down' : 'up'}`" circle @click="collapsed = !collapsed"></el-button>
    </div>
    <div class="box-collapsed" v-show="!collapsed">
      <slot name="collapsed" />
    </div>
  </div>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Collapse extends Vue {
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
