<template>
  <div id="app" class="layout-app" v-if="$route.name" :data-page="$route.name">
    <template v-if="showLayout">
      <div class="c-admin-nav" :style="`background-color: ${menu['background-color']}`">
        <div class="brand">
          <img :src="$appConfig.logo" class="logo"/>
        </div>
        <c-nav-menu
          :menu="menu"
          :filter="filterRoute"
          :routes="$router.options.routes"
        />
      </div>
      <div class="admin-content">
        <header>
          <div class="box-left">
            <el-button
              size="small" icon="el-icon-arrow-left" class="btn-go-back" @click="goBack" type="primary"
              v-if="showBackButton"
            >
              返回
            </el-button>
            <h2 class="global-title">{{ $get($route, 'meta.title') }}</h2>
          </div>
          <el-button type="text" @click="handleExit">退出登录</el-button>
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
      'background-color': '#fff'
    }

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
      localStorage.removeItem('access_token');
      const requestUrl = _.get(this.$appConfig, 'logout.request_url');
      if (requestUrl) await this.$request.delete(requestUrl);
      this.$message.success('成功退出登录');
      this.$router.replace({ name: 'login' });
    }
  }
</script>
