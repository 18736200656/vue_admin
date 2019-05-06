<template>
  <div class="login2">
    <div class="login_wrap">
      <div class="login_title">后台管理系统</div>
      <div class="form_box">
        <el-form :inline="true" class="login_form" size="large"
                 :model="loginForm" :rules="loginRules" ref="loginForm">
          <el-form-item prop="name">
            <el-input type="text" placeholder="请输入用户名"
                      prefixIcon="el-icon-user-solid"
                      v-model="loginForm.name"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="请输入密码"
                      prefixIcon="el-icon-lock"
                      v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <img src="../../assets/login/login_btn.png" alt="" @click="loginBtn" class="login_btn">
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'login2',
    data() {
      return {
        loginForm:{
          name:'',
          password:'',
        },
//        loginRules: {
//          name: [
//            {required: true, message: '请输入手机号', trigger: 'blur'},
//            {max: 11, message: '请输入11位数字', trigger: 'blur'},
//            {validator: this.ValidatePhone, trigger: 'blur'}
//          ],
//          password :[
//             {required: true, message: '请输入密码', trigger: 'blur'},
//             {min:6,max: 20, message: '请输入6-20位字符', trigger: 'blur'},
//             {validator: this.ValidatePassword, trigger: 'blur'}
//          ],
//        }
      }
    },
    methods:{
      ValidatePhone(rule, value, callback){
        var regExp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$/;
        if(!regExp.test(value)){
          callback(new Error('请输入正确的手机号码'))
        }
      },
      ValidatePassword (rule, value, callback) {
        if (value.match(/^\d{6,}$/)) {
          callback(new Error('不能使用纯数字的密码'))
        } else if (!value.match(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{6,20}$/)) {
          callback(new Error('请输入6-20位字符'))
        } else {
          callback()
        }
      },
      loginBtn(){
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            let data = {
              loginName: this.loginForm.name,
              password: this.loginForm.password
            }
            this.$api.adminLogin(data).then(res => {
              if(res.code=='1'){
                window.sessionStorage.setItem('token',res.data.token);
                window.sessionStorage.setItem('userInfo',JSON.stringify(res.data))
                this.$router.push({
                  name:'Home',
                  params:{
                    loginName:res.data.loginName,
                    loginNickName:res.data.loginNickName,
                    isDeleted:res.data.isDeleted,
                    id:res.data.id
                  }
                });

              }else{
                this.$message.error(res.msg)
              }
            }).catch(err => {
              this.$message.error(err)
              return Promise.reject(err);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      keydown(e){
        e = e || window.event;
        var code =e.keyCode || e.which;
          if(code=='13'){
            this.loginBtn()
          }
      }
    },
    created(){
      document.addEventListener('keydown',this.keydown,false)
    },
    beforeDestroy(){
      document.removeEventListener('keydown',this.keydown,false)
    }
  }
</script>
<style scoped lang="less">
  .login2{
    position: fixed;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    background: url("../../assets/login/login_bg.png") no-repeat center;
    background-size: cover;
  }
  .login_wrap{
    top:50%;
    margin-top:-200px;
    width: 100%;
    height:400px;
    position: absolute;
    background: url("../../assets/login/login_bg2.png") no-repeat center;
    background-size: 100% 100%;
    text-align: center;
  }
  .login_title{
    margin-top: 70px;
    font-size: 80px;
    color: #fff;
    font-family: 'SourceHanSanCN Regular';
  }
  .form_box{
    margin-top: 60px;
  }
  .login_btn{
    cursor: pointer;
    width: 35px;
    height:35px;
    vertical-align: middle;
  }
  .el-form-item__content .el-form-item__error::after{
    font-size: 16px!important;
    font-weight: bold;
    top: 5px !important;
  }
</style>
<style lang="less">
  .login_form{
    /*.el-form-item__content{
      .el-input{
        width: 100%;
      }
    }*/
    .el-form-item__content .el-form-item__error::after{
      font-size: 16px!important;
      font-weight: bold;
      top: 5px !important;
    }
  }
</style>
