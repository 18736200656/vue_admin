<template>
    <div class="form_container">
        <div class="manage_tip">
            <!-- <div class="logo">
                <img src="../assets/logo.png" alt="">
            </div> -->
            <span class="title">在线后台管理系统</span>
            <div class="form-group">
                <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="80px">
                    <el-form-item prop="phone" label="手机号：">
                        <el-input v-model="loginForm.phone" placeholder="请输入手机号" maxlength="11"></el-input>
                    </el-form-item>
                     <el-form-item prop="captcha" label="图形码：" align="left">
                        <el-input v-model="loginForm.captcha" placeholder="输入图像验证码" style="width:140px;"></el-input>
                        <div @click="refreshCode"><s-identify :identifyCode="identifyCode"></s-identify> </div>
                    </el-form-item>
                    <el-form-item prop="password" label="密码：">
                        <el-input v-model="loginForm.password" type="password" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-button class="submit_btn" type="primary" @click="submitForm()">登录</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import SIdentify from '../common/identify'
    export default {
        name:'Login',
        data() {
            return {
                identifyCodes: "1234567890abcdefghijklmnopqrstuvwxyz",
                identifyCode: "1234",
                loginForm: {
                    phone: '',
                    password: '',
                    captcha: ''
                },
                loginRules: {
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {max: 11, message: '请输入11位数字', trigger: 'blur'},
                        {validator: this.ValidatePhone, trigger: 'blur'}
                    ],
                    password :[
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min:6,max: 20, message: '请输入6-20位字符', trigger: 'blur'},
                        {validator: this.ValidatePassword, trigger: 'blur'}
                    ],
                    captcha: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                        {max: 4, message: '请输入4位数字', trigger: 'blur'},
                        {validator: this.ValidateCaptcha, trigger: 'blur'},
                       
                    ]
                },
                sys_error: '',
                validate: false
            }
        },
        mounted(){
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        methods: {
            ValidatePhone(rule, value, callback){
                var regExp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$/;
                if(!regExp.test(value)){
                    callback(new Error('请输入正确的手机号码'))
                }
            },
            ValidateCaptcha(rule, value, callback){
                if(value!=this.identifyCode){
                    callback(new Error('验证码输入错误'))
                }
            },
            ValidatePassword (rule, value, callback) {
                if (value.match(/^\d{6,}$/)) {
                callback(new Error('不能使用纯数字的密码'))
                } else if (/^([a-z0-9\.\@\!\#\$\%\^\&\*\(\)\-\+]){6,20}$/i == false) {
                callback(new Error('请输入6-20位数字、字母和特殊字符（仅限!@#$%^&*()-+）'))
                } else {
                callback()
                }

            },
            submitForm(){
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        let data = {
                            phone: this.loginForm.phone,
                            password: this.loginForm.password
                        }
                        if(this.validate) data.validate = this.loginForm.validate
                        this.loginByEmail(data).then(res => {
                            if(res.data.login){
                                this.$router.push('home')
                            } else{
                                this.sys_error = res.data.message
                                this.validate = res.data.validate
                            }
                        }).catch(err => {
                            this.sys_error = err.response.data
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            refreshCode() {
                console.log(1)
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                    ];
                }
                console.log(this.identifyCode);
            }
        },
        components:{
            SIdentify
        }

    }
</script>

<style scoped>
.form_container {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../../assets/bg.jpg) no-repeat center center;
    background-size: 100% 100%;
    z-index:10;
}
.manage_tip {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 25%;
  left: 50%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  margin-left: -185px;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}

.form-group {
  margin-top: 20px;
  background-color: white;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccccc;
}
.submit_btn {
  width: 100%;
}
.info{
	float: right;
	font-size: 14px;
	color: #606266;
}
a{
	text-decoration: none;
}
</style>

