<template>
  <div class="admin-nav-layout">
    <el-drawer
      title="导航"
      :visible.sync="drawerMenuOpen"
      direction="ltr"
      modal-append-to-body
      size="200px"
      custom-class="admin-nav-layout-menu-drawer"
    >
      <NavMenu disableCollapse :menus="menus" v-model="collapsed" v-bind="$attrs" />
    </el-drawer>

    <el-container>
      <el-aside class="nav-layout-aside hidden-xs-only" width="auto">
        <div class="nav-layout-aside-box-logo" v-if="!collapsed">
          <router-link to="/">
            <img :src="logoUrl" class="logo" v-if="logoUrl" />
            <slot name="logo" />
          </router-link>
        </div>
        <div class="nav-layout-aside-box-menu">
          <NavMenu :menus="menus" v-model="collapsed" v-bind="$attrs" />
        </div>
      </el-aside>
      <el-container>
        <el-header class="nav-layout-header">
          <el-button type="default" size="mini" icon="el-icon-s-unfold" class="hidden-sm-and-up" @click="drawerMenuOpen = !drawerMenuOpen"></el-button>

          <el-button
            v-if="showBack"
            class="nav-layout-header-btn-back"
            type="text"
            icon="el-icon-back"
            @click="$emit('back')"
          >
          {{ $t('bean.actionNavBack') }}
          </el-button>
          <div class="nav-layout-header-title">
            <slot name="header-title" />
          </div>
          <slot />
          <div class="nav-layout-header-content">
            <slot name="header-content" />
          </div>
        </el-header>
        <el-main>
          <router-view :key="routerViewKey" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import NavMenu from './nav-menu';
  import qs from 'qs';

  @Component({
    components: {
      NavMenu
    }
  })
  export default class NavLayout extends Vue {
    @Prop({ type: Array, default: () => ([]) }) menus;
    @Prop({ type: Boolean }) showBack;
    @Prop({ type: String }) logoUrl;
    @Prop({ type: Boolean }) initCollapsed;

    drawerMenuOpen = false;
    collapsed = false;

    created() {
      this.collapsed = this.initCollapsed;
    }

    get routerViewKey() {
      const { path, query } = this.$route;
      return `${path}?${qs.stringify(query)}`;
    }
  }
</script>
