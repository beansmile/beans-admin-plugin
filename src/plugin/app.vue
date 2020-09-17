<template>
  <div id="app" class="layout-app" v-if="$route.name" :data-page="$route.name">
    <template v-if="showLayout">
      <div :class="elementClass('nav')" :style="`background-color: ${menu['background-color']}`">
        <div :class="elementClass('brand')">
          <img :src="$appConfig.logo" class="logo"/>
        </div>
        <c-nav-menu
          :menu="menu"
          :filter="filterRoute"
          :routes="$router.options.routes"
          :key="menuRenderKey"
        />
        <el-button :class="elementClass('renderNavBtn')" @click="reRenderMenu">收起二级目录</el-button>
        <el-button :class="elementClass('handleCollapseNavBtn')"  @click="toggleIsCollapse"></el-button>
      </div>
      <div class="admin-content">
        <header>
          <div class="box-left">
            <el-button
              size="small" icon="el-icon-arrow-left" class="btn-go-back" @click="goBack" type="primary"
              v-if="showBackButton"
            >
              {{ $t('返回') }}
            </el-button>
            <h2 class="global-title">{{ $get($route, 'meta.title') }}</h2>
          </div>
          <div class="box-right">
            <slot name="toolbar-right" />
            <el-button type="text" @click="handleExit">{{ $t('退出登录') }}</el-button>
          </div>
        </header>
        <div class="box-view">
          <router-view :key="routerViewKey"/>
        </div>
      </div>
    </template>
    <router-view v-else :key="routerViewKey"/>
  </div>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';
  import _ from 'lodash';

  @Component
  export default class AppLayout extends Vue {

    menu = {
      mode: 'vertical',
      collapse: false,
      'background-color': '#fff'
    };
    menuRenderKey = 1;

    get showBackButton() {
      if (this.$route.name) {
        const routeArr = this.$route.name.split('.');
        return _.get(this.$route, 'meta.backBtn') !== false && routeArr.length > 1 && routeArr.pop() !== 'index';
      }
      return false;
    }

    get routerViewKey() {
      const routeName = this.$route.name;
      // 如果没有子路由加
      if (this.$router.options.routes.find(route => route.name === routeName)) {
        return this.$route.fullPath;
      } else {
        return undefined;
      }
    }

    goBack() {
      this.$router.go(-1);
    }

    filterRoute(route) {
      return route.meta && route.meta.navbar;
    }

    get showLayout() {
      const layout = _.get(this.$route, 'meta.layout');
      return layout || _.isUndefined(layout);
    }

    async handleExit() {
      const tokenKey = _.get(this, '$appConfig.login.token_storage_key') || 'access_token';
      localStorage.removeItem(tokenKey);
      const requestUrl = _.get(this.$appConfig, 'logout.request_url');
      if (requestUrl) await this.$fly.delete(requestUrl);
      this.$message.success(this.$t('成功退出登录'));
      this.$router.replace({ name: 'login' });
    }

    elementClass(name) {
      return (this.menu.collapse ? {
        nav: 'c-collapse-nav',
        brand: 'brand-collapse',
        renderNavBtn: 'render-nav-btn-collapse',
        handleCollapseNavBtn: 'handle-collapse-btn-collapse el-icon-s-unfold'
      } : {
        nav: 'c-admin-nav',
        brand: 'brand',
        renderNavBtn: 'render-nav-btn',
        handleCollapseNavBtn: 'handle-collapse-btn el-icon-s-fold'
      })[name];
    }

    toggleIsCollapse() {
      this.$set(this.menu, 'collapse', !this.menu.collapse);
    }

    reRenderMenu() {
      // key值更改后menu组件会重新渲染
      ++ this.menuRenderKey;
    }
  }
</script>
