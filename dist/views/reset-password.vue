<template>
  <div class="reset-password">
    <el-card class="box-card">
      <h2>{{ $t('重置密码') }}</h2>
      <el-form label-width="90px" @submit.native.prevent="submit">
        <el-form-item :label="$t('新密码')">
          <el-input v-model="password" show-password></el-input>
        </el-form-item>
        <el-form-item :label="$t('新密码确认')">
          <el-input v-model="password_confirmation" show-password></el-input>
        </el-form-item>
        <el-button type="primary" native-type="submit">{{ $t('提交') }}</el-button>
      </el-form>
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

var _class, _temp;

import { Component, Vue } from 'vue-property-decorator';

var ResetPassword = Component(_class = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(ResetPassword, _Vue);

  function ResetPassword() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ResetPassword);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ResetPassword)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.password = '';
    _this.password_confirmation = '';
    return _this;
  }

  _createClass(ResetPassword, [{
    key: "submit",
    value: function () {
      var _submit = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref, edit_url, onResetPass;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref = this.$appConfig.password || {}, edit_url = _ref.edit_url, onResetPass = _ref.onResetPass;

                if (!onResetPass) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", onResetPass({
                  password: this.password,
                  password_confirmation: this.password_confirmation
                }));

              case 3:
                _context.next = 5;
                return this.$autoLoading(this.$fly.put(edit_url, {
                  password: this.password,
                  password_confirmation: this.password_confirmation,
                  reset_password_token: this.$route.query.reset_password_token
                }));

              case 5:
                this.$message.success(this.$t('重置密码成功，请重新登录'));
                this.$router.replace('/login');

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function submit() {
        return _submit.apply(this, arguments);
      }

      return submit;
    }()
  }]);

  return ResetPassword;
}(Vue), _temp)) || _class;

export { ResetPassword as default };</script>
