<template>
  <div id="app" class="layout-app" v-if="$route.name" :data-page="$route.name">
    <template v-if="showLayout">
      <div class="c-admin-nav" :class="{ collapsed: menu.collapse }" :style="`background-color: ${menu['background-color']}`">
        <div class="brand">
          <img :src="$appConfig.logo" class="logo"/>
        </div>
        <c-nav-menu
          :menu="menu"
          :filter="filterRoute"
          :routes="$router.options.routes"
          ref="navMenu"
        />
        <el-tooltip class="item" effect="light" :content="$t('收起除当前页面之外的所有二级目录')" placement="top-end">
          <el-button class="render-nav-btn" @click="reRenderMenu">{{ $t('收起二级目录') }}</el-button>
        </el-tooltip>
        <el-button class="handle-collapse-btn" :class="[menu.collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"  @click="toggleIsCollapse"></el-button>
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

    toggleIsCollapse() {
      this.$set(this.menu, 'collapse', !this.menu.collapse);
    }

    async reRenderMenu() {
      const elMenu = _.get(this.$refs, 'navMenu.$refs.menu');
      if (elMenu) {
        // https://github.com/ElemeFE/element/blob/dev/packages/menu/src/menu.vue#L285
        elMenu.openedMenus = [];
        elMenu.initOpenedMenu();
      }
    }
  }
</script>
