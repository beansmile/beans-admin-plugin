<template>
  <div class="page-login">
    <el-card class="box-card">
      <h2>{{ $appConfig.name }}</h2>
      <el-form ref="form" label-width="80px" @submit.native.prevent="login">
        <el-form-item label="邮箱">
          <el-input v-model="email"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="password" show-password></el-input>
          <a @click="sendEmail" style="cursor: pointer;">忘记密码？</a>
        </el-form-item>
        <el-button type="primary" native-type="submit">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';
  import { permissionService } from '../services';
  import _ from 'lodash';

  @Component
  export default class Login extends Vue {

    email = '';
    password = '';

    mounted() {
      // 重新登录获取新的权限表
      permissionService.destroyPermission();
    }

    async login() {
      const { request_url, navigateTo } = _.get(this, '$appConfig.login') || {};
      if (request_url) {
        const { access_token, admin_user } = await this.$autoLoading(this.$request.post(request_url, { email: this.email, password: this.password }));
        localStorage.setItem('access_token', access_token)
        this.$root.currentUser = admin_user
        this.$message.success('登录成功');
        this.$router.replace(navigateTo);
      }
    }

    async sendEmail() {
      const { value } = await this.$prompt('请输入邮箱', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: this.email || void 0,
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确',
      })
      const { message } = await this.$autoLoading(this.$request.post(_.get(this.$appConfig, 'password.forgot_url'), { email: value }));
      this.$message.success(message)
    }
  }
</script>
