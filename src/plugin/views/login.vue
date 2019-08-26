<template>
  <el-card class="box-card">
    <h2>{{ $appConfig.name }}</h2>
    <el-form ref="form" label-width="80px" @submit.native.prevent="login">
      <el-form-item label="邮箱">
        <el-input v-model="email"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="password" show-password></el-input>
      </el-form-item>
      <el-button type="primary" native-type="submit">登录</el-button>
    </el-form>
  </el-card>
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
      await this.$request.post(request_url, { email: this.email, password: this.password });
      this.$message.success('登录成功');
      this.$router.replace(navigateTo);
    }
  }
}
</script>

<style lang="less" scoped>
  .box-card {
    width: 500px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
</style>
