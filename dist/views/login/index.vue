<template>
  <div class="page-login">
    <div class="background"><Background /></div>
    <el-card id="wrap_box_card">
      <p class="page-title">{{ $appConfig.name }}{{ $t('登录') }}</p>
      <el-card class="box-card" :body-style="{ padding: '0px' }">
        <el-col :span="15" class="input-row">
          <el-row class="img-row">
            <el-image :src="require('@/assets/logo.png')" fit="contain" style="width: 200px; height: 30px"></el-image>
          </el-row>

          <el-row>
            <el-form ref="form" @submit.native.prevent="login">
              <el-input v-model="email" :placeholder="$t('输入邮箱')" size="medium"></el-input>

              <div style="margin: 20px 0;"></div>
              <el-input v-model="password" show-password :placeholder="$t('输入密码')" size="medium"></el-input>

              <div style="margin: 20px 0;"></div>
              <el-row justify="center" size="medium">
                <el-button type="primary" native-type="submit" class="submit-btn">{{ $t('登录') }}</el-button>
              </el-row>
              <el-row justify="end" size="medium" style="margin-top: 5px;">
                <a v-if="showForgetPass" @click="onSendVerificationCode" style="cursor: pointer">{{ $t('忘记密码？') }}</a>
              </el-row>
            </el-form>
          </el-row>
        </el-col>
        <el-col :span="9" class="sidebar">
          <Sidebar /><p class="slogan">Welcome</p>
        </el-col>
      </el-card>
    </el-card>
  </div>
</template>

<script>import "core-js/modules/es6.regexp.replace";
import "regenerator-runtime/runtime";
import _asyncToGenerator from "@babel/runtime-corejs2/helpers/esm/asyncToGenerator";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";
import _get from "lodash/get";

var _dec, _class, _temp;

import { Vue, Component } from 'vue-property-decorator';
import { permissionService } from "../../services";
import Sidebar from "./components/welcome";
import Background from "./components/background";
var Login = (_dec = Component({
  components: {
    Sidebar: Sidebar,
    Background: Background
  }
}), _dec(_class = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(Login, _Vue);

  function Login() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Login);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Login)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.email = '';
    _this.password = '';
    return _this;
  }

  _createClass(Login, [{
    key: "mounted",
    value: function mounted() {
      // 重新登录获取新的权限表
      permissionService.destroyPermission();
    }
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref, request_url, navigateTo, token_storage_key, _ref2, access_token, token, admin_user;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref = _get(this, '$appConfig.login') || {}, request_url = _ref.request_url, navigateTo = _ref.navigateTo, token_storage_key = _ref.token_storage_key;

                if (!request_url) {
                  _context.next = 12;
                  break;
                }

                _context.next = 4;
                return this.$autoLoading(this.$fly.post(request_url, {
                  email: this.email,
                  password: this.password
                }));

              case 4:
                _ref2 = _context.sent;
                access_token = _ref2.access_token;
                token = _ref2.token;
                admin_user = _ref2.admin_user;
                localStorage.setItem(token_storage_key, access_token || token || '');

                if (admin_user) {
                  this.$root.currentUser = admin_user;
                }

                this.$message.success(this.$t('登录成功'));
                this.$router.replace(navigateTo);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login() {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "onSendVerificationCode",
    value: function () {
      var _onSendVerificationCode = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _ref3, onSendVerificationCode, forgot_url, _ref4, value, _ref5, message;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref3 = this.$appConfig.password || {}, onSendVerificationCode = _ref3.onSendVerificationCode, forgot_url = _ref3.forgot_url;

                if (!onSendVerificationCode) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", onSendVerificationCode({
                  email: this.email
                }));

              case 3:
                _context2.next = 5;
                return this.$prompt(this.$t('请输入邮箱'), this.$t('提示'), {
                  confirmButtonText: this.$t('确定'),
                  cancelButtonText: this.$t('取消'),
                  inputValue: this.email || void 0,
                  inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                  inputErrorMessage: this.$t('邮箱格式不正确')
                });

              case 5:
                _ref4 = _context2.sent;
                value = _ref4.value;
                _context2.next = 9;
                return this.$autoLoading(this.$fly.post(forgot_url, {
                  email: value
                }));

              case 9:
                _ref5 = _context2.sent;
                message = _ref5.message;
                this.$message.success(message);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onSendVerificationCode() {
        return _onSendVerificationCode.apply(this, arguments);
      }

      return onSendVerificationCode;
    }()
  }, {
    key: "showForgetPass",
    get: function get() {
      var _ref6 = this.$appConfig.password || {},
          onSendVerificationCode = _ref6.onSendVerificationCode,
          forgot_url = _ref6.forgot_url;

      return !!(onSendVerificationCode || forgot_url);
    }
  }]);

  return Login;
}(Vue), _temp)) || _class);
export { Login as default };</script>
