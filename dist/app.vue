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

<script>import "core-js/modules/es6.array.find";
import "core-js/modules/es6.regexp.split";
import "core-js/modules/es6.function.name";
import "core-js/modules/es6.regexp.replace";
import "regenerator-runtime/runtime";
import _asyncToGenerator from "@babel/runtime-corejs2/helpers/esm/asyncToGenerator";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";
import _isUndefined from "lodash/isUndefined";
import _get from "lodash/get";

var _class, _temp;

import { Vue, Component } from 'vue-property-decorator';

var AppLayout = Component(_class = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(AppLayout, _Vue);

  function AppLayout() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AppLayout);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AppLayout)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.menu = {
      mode: 'vertical',
      collapse: false,
      'background-color': '#fff'
    };
    return _this;
  }

  _createClass(AppLayout, [{
    key: "goBack",
    value: function goBack() {
      this.$router.go(-1);
    }
  }, {
    key: "filterRoute",
    value: function filterRoute(route) {
      return route.meta && route.meta.navbar;
    }
  }, {
    key: "handleExit",
    value: function () {
      var _handleExit = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var tokenKey, requestUrl;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                tokenKey = _get(this, '$appConfig.login.token_storage_key') || 'access_token';
                localStorage.removeItem(tokenKey);
                requestUrl = _get(this.$appConfig, 'logout.request_url');

                if (!requestUrl) {
                  _context.next = 6;
                  break;
                }

                _context.next = 6;
                return this.$fly.delete(requestUrl);

              case 6:
                this.$message.success(this.$t('成功退出登录'));
                this.$router.replace({
                  name: 'login'
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleExit() {
        return _handleExit.apply(this, arguments);
      }

      return handleExit;
    }()
  }, {
    key: "toggleIsCollapse",
    value: function toggleIsCollapse() {
      this.$set(this.menu, 'collapse', !this.menu.collapse);
    }
  }, {
    key: "reRenderMenu",
    value: function () {
      var _reRenderMenu = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var elMenu;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                elMenu = _get(this.$refs, 'navMenu.$refs.menu');

                if (elMenu) {
                  // https://github.com/ElemeFE/element/blob/dev/packages/menu/src/menu.vue#L285
                  elMenu.openedMenus = [];
                  elMenu.initOpenedMenu();
                }

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function reRenderMenu() {
        return _reRenderMenu.apply(this, arguments);
      }

      return reRenderMenu;
    }()
  }, {
    key: "showBackButton",
    get: function get() {
      if (this.$route.name) {
        var routeArr = this.$route.name.split('.');
        return _get(this.$route, 'meta.backBtn') !== false && routeArr.length > 1 && routeArr.pop() !== 'index';
      }

      return false;
    }
  }, {
    key: "routerViewKey",
    get: function get() {
      var routeName = this.$route.name; // 如果没有子路由加

      if (this.$router.options.routes.find(function (route) {
        return route.name === routeName;
      })) {
        return this.$route.fullPath;
      } else {
        return undefined;
      }
    }
  }, {
    key: "showLayout",
    get: function get() {
      var layout = _get(this.$route, 'meta.layout');

      return layout || _isUndefined(layout);
    }
  }]);

  return AppLayout;
}(Vue), _temp)) || _class;

export { AppLayout as default };</script>
