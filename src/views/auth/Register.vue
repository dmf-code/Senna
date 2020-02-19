<template>
    <div class="register-container">
        <el-form :model="ruleForm" :rules="rules"
         status-icon
         ref="ruleForm" 
         label-position="left" 
         label-width="0px" 
         class="register-page">
            <h3 class="title">系统注册</h3>
            <el-form-item prop="username">
                <el-input type="text" 
                    v-model="ruleForm.username" 
                    auto-complete="off" 
                    placeholder="用户名"
                ></el-input>
            </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" 
                        v-model="ruleForm.password" 
                        auto-complete="off" 
                        placeholder="密码"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password2">
                    <el-input type="password" 
                        v-model="ruleForm.password2" 
                        auto-complete="off" 
                        placeholder="确认密码"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-row>
                        <el-col :span="4">
                            验证码：
                        </el-col>
                        <el-col :span="4">
                            <el-image></el-image>
                        </el-col>
                        <el-col :span="16">
                            <el-input></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="handleSubmit" :loading="logining">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            logining: false,
            ruleForm: {
                username: '',
                password: '',
                password2: ''
            },
            rules2: {
                username: [{required: true, message: 'please enter your account', trigger: 'blur'}],
                password: [{required: true, message: 'enter your password', trigger: 'blur'}],
                password2: [{required: true, message: 'enter your password', trigger: 'blur'}]
            },
            checked: false
        }
    },
    methods: {
        handleSubmit(event){
            this.$refs.ruleForm.validate((valid) => {
                if(valid){
                    this.logining = true;
                    this.axios.post('/register', {
                        'username': this.ruleForm.username,
                        'password': this.ruleForm.password
                    }).then(function(response) {
                       console.log(response); 
                    });
                }else{
                    console.log('error submit!');
                    return false;
                }
            })
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