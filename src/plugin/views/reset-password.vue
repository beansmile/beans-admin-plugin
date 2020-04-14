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

<script>
  import { Component, Vue } from 'vue-property-decorator'

  @Component
  export default class ResetPassword extends Vue {
    password = ''
    password_confirmation = ''

    async submit() {
      const { edit_url, onResetPass } = this.$appConfig.password || {};
      if (onResetPass) {
        return onResetPass({ password: this.password, password_confirmation: this.password_confirmation });
      }
      await this.$autoLoading(this.$fly.put(edit_url, {
        password: this.password,
        password_confirmation: this.password_confirmation,
        reset_password_token: this.$route.query.reset_password_token
      }));
      this.$message.success(this.$t('重置密码成功，请重新登录'))
      this.$router.replace('/login')
    }
  }
</script>
