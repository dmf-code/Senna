<template>
  <div class="register-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      status-icon
      ref="ruleForm"
      label-position="left"
      label-width="0px"
      class="register-page"
    >
      <h3 class="title">系统注册</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="password2">
        <el-input
          type="password"
          v-model="ruleForm.password2"
          auto-complete="off"
          placeholder="确认密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="4">验证码：</el-col>
          <el-col :span="8">
            <el-image @click="getVerifyCode" :src="this.verify_code"></el-image>
          </el-col>
          <el-col :span="12">
            <el-input v-model="verify_value" placeholder="请输入验证码"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getVerifyCode();
  },
  data() {
    return {
      logining: false,
      captcha_id: "",
      verify_code: "",
      verify_value: "",
      ruleForm: {
        username: "",
        password: "",
        password2: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "please enter your account",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "enter your password", trigger: "blur" }
        ],
        password2: [
          { required: true, message: "enter your password", trigger: "blur" }
        ]
      },
      checked: false
    };
  },
  methods: {
    handleSubmit(event) {
      this.$refs.ruleForm.validate(valid => {
        if (valid && this.ruleForm.password == this.ruleForm.password2) {
          this.logining = true;
          this.axios
            .post("/api/register", {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              Id: this.captcha_id,
              VerifyValue: this.verify_value
            })
            .then(res => {
              if (res.data.status == true) {
                this.$message({ message: "注册成功", type: "success" });
                this.$router.push({ path: "/", name: "home" });
              } else {
                this.$message.error("注册失败");
              }
            });
          this.logining = false;
        } else {
        }
      });
    },
    getVerifyCode() {
      let me = this;
      this.axios
        .post("/api/getCaptcha", {
          CaptchaType: "string"
        })
        .then(function(response) {
          me.verify_code = response.data.data;
          me.captcha_id = response.data.captchaId;
        });
    }
  }
};
</script>

<style scoped>
.register-container {
  width: 100%;
  height: 100%;
}
.register-page {
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