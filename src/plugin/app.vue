<template>
  <div id="app" v-if="$route.name" :data-page="$route.name">
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
      localStorage.removeItem('access_token')
      const requestUrl = _.get(this.$appConfig, 'logout.request_url');
      if (requestUrl) {
        await this.$request.delete(requestUrl);
        this.$message.success('成功退出登录');
        this.$router.replace({ name: 'login' });
      }
    }
  }
</script>

<style lang="less" scoped>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100vh;
    overflow: auto;
    line-height: 1.4;
    display: flex;
  }

  .admin-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
      border-bottom: 1px solid #EBEEF5;
      padding: 10px 30px;

      .box-left {
        display: flex;
        align-items: center;

        .btn-go-back {
          margin-right: 20px;
        }
      }

      .global-title {
        margin: 0;
        font-size: 18px;
      }
    }

    .box-view {
      flex: 1;
      overflow-y: auto;
    }
  }

  .c-admin-nav {
    width: 220px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    border-right: 1px solid #EBEEF5;

    .brand {
      padding: 34px 20px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .logo {
        width: 90%;
      }
    }

    .el-menu {
      border-right: 0;
      flex: 1;
      overflow-y: scroll;
    }
  }
</style>
