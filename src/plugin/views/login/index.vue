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

<script>
  import { Vue, Component } from 'vue-property-decorator';
  import { permissionService } from '../../services';
  import _ from 'lodash';
  import Sidebar from './components/welcome';
  import Background from './components/background';

  @Component({ components: { Sidebar, Background } })
  export default class Login extends Vue {
    email = '';
    password = '';

    mounted() {
      const { token_storage_key, navigateTo } = _.get(this, '$appConfig.login') || {};
      if (localStorage.getItem(token_storage_key)) {
        this.$router.replace(navigateTo);
        return;
      }
      // 重新登录获取新的权限表
      permissionService.destroyPermission();
    }

    async login() {
      const { request_url, navigateTo, token_storage_key } = _.get(this, '$appConfig.login') || {};
      if (request_url) {
        const { access_token, token, admin_user } = await this.$autoLoading(this.$fly.post(request_url, {
          email: this.email,
          password: this.password
        }));
        localStorage.setItem(token_storage_key, access_token || token || '');
        if (admin_user) {
          this.$root.currentUser = admin_user;
        }
        this.$message.success(this.$t('登录成功'));
        this.$router.replace(navigateTo);
      }
    }

    get showForgetPass() {
      const { onSendVerificationCode, forgot_url } = this.$appConfig.password || {};
      return !!(onSendVerificationCode || forgot_url);
    }

    async onSendVerificationCode() {
      const { onSendVerificationCode, forgot_url } = this.$appConfig.password || {};
      if (onSendVerificationCode) {
        return onSendVerificationCode({ email: this.email });
      }
      const { value } = await this.$prompt(this.$t('请输入邮箱'), this.$t('提示'), {
        confirmButtonText: this.$t('确定'),
        cancelButtonText: this.$t('取消'),
        inputValue: this.email || void 0,
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: this.$t('邮箱格式不正确'),
      })
      const { message } = await this.$autoLoading(this.$fly.post(forgot_url, { email: value }));
      this.$message.success(message)
    }
  }
</script>
