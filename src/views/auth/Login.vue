<template>
  <div class="login-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      status-icon
      ref="ruleForm"
      label-position="left"
      label-width="0px"
      class="login-page"
    >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          auto-complete="off"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-checkbox style="width: 100%" v-model="checked" class="rememberme"
        >记住密码</el-checkbox
      >
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%"
          @click="handleSubmit"
          :loading="logining"
          >登录</el-button
        >
      </el-form-item>
      <div style="width: 100%; text-align: left; font-size: 5px">
        <el-link href="/register">未注册账号？前往注册</el-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import dynamicRouter from "@/router/backend";
export default {
  data() {
    return {
      logining: false,
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "please enter your account",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "enter your password", trigger: "blur" },
        ],
      },
      checked: false,
    };
  },
  methods: {
    handleSubmit(event) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.logining = true;
          this.$api.frontend
            .login({
              username: this.ruleForm.username,
              password: this.ruleForm.password,
            })
            .then((res) => {
              if (res.data.code == 0) {
                this.$store.commit("login", res.data.data);
                dynamicRouter();
                this.$message({ message: "登录成功", type: "success" });
                console.log(this.$router);
                this.$router.push({ path: "/admin/dashboard" });
              } else {
                this.$message.error("登录失败");
              }
            });
          this.logining = false;
        } else {
          this.$message.error("登录失败");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 8em auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>