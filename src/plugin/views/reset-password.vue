<template>
  <div class="reset-password">
    <el-card class="box-card">
      <h2>Reset Password</h2>
      <el-form label-width="90px" @submit.native.prevent="submit">
        <el-form-item label="New Password">
          <el-input v-model="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="New Password Confrimation">
          <el-input v-model="password_confirmation" show-password></el-input>
        </el-form-item>
        <el-button type="primary" native-type="submit">Submit</el-button>
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
      this.$message.success('Reset password successfully, please login.')
      this.$router.replace('/login')
    }
  }
</script>
