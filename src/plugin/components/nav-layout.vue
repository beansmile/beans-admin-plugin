<template>
  <div class="vadmin-nav-layout">
    <div class="box-sidebar" :class="{ collapsed }">
      <div class="box-logo">
        <router-link to="/">
          <img :src="logoUrl" class="logo" v-if="logoUrl" />
          <slot name="logo" v-if="!collapsed" />
        </router-link>
      </div>
      <div class="box-menu">
        <NavMenu :menus="menus" v-model="collapsed" v-bind="$attrs" />
      </div>
    </div>
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
          <slot name="header-title" />
        </div>
        <slot />
        <div class="content">
          <slot name="header-content" />
        </div>
      </div>
      <div class="page-content">
        <router-view :key="$route.fullPath" />
      </div>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import NavMenu from './nav-menu';

  @Component({
    components: {
      NavMenu
    }
  })
  export default class NavLayout extends Vue {
    @Prop({ type: Array, default: () => ([]) }) menus;
    @Prop({ type: Boolean }) showBack;
    @Prop({ type: String }) logoUrl;
    collapsed = false;
  }
</script>
