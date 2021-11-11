<template>
  <div class="admin-collapse">
    <div class="box-content">
      <div class="content">
        <slot />
      </div>
      <el-button v-if="showCtrl" :icon="`el-icon-arrow-${collapsed ? 'down' : 'up'}`" circle @click="collapsed = !collapsed"></el-button>
    </div>
    <div class="box-collapsed" :class="[collapsedContentClass]" v-show="!collapsed">
      <slot name="collapsed" />
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';

  @Component
  export default class Collapse extends Vue {
    @Prop(String) collapsedContentClass;
    @Prop({ type: Boolean }) initValue;
    @Prop({ type: Boolean }) showController;
    collapsed = true;
    showCtrl = true;

    created() {
      this.showCtrl = Boolean(_.isUndefined(this.showController) ? _.get(this.$vadminConfig, 'collapse.showController') : this.showController);
      if (this.showCtrl) {
        const initValue = _.isUndefined(this.initValue) ? _.get(this.$vadminConfig, 'collapse.initValue') : this.initValue;
        this.collapsed = _.isUndefined(initValue) ? true : initValue;
      } else {
        // 不显示collapse，则展开
        this.collapsed = false;
      }
    }
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
