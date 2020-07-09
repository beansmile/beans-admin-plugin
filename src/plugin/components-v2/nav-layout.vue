<template>
  <div class="bean-nav-layout">
    <bean-nav-menu :menus="menus" />
    <div class="layout-content">
      <div class="page-header">
        <el-button
          v-if="showBack"
          class="btn-back"
          type="text"
          icon="el-icon-back"
          @click="$emit('back')"
        >返回</el-button>
        <div class="page-title">
          <portal-target name="nav-layout-title"></portal-target>
        </div>
        <slot />
        <div class="content">
          <portal-target name="nav-layout-content"></portal-target>
        </div>
      </div>
      <div class="page-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component
  export default class NavLayout extends Vue {
    @Prop({ type: Array, default: () => ([]) }) menus;
    @Prop({ type: Boolean }) showBack;
  }
</script>
