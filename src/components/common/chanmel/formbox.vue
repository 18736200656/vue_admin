<template>
  <div class="formbox">
    <el-form :model="formData" ref="formData" :rules="formRules" lable-width="100px" label-position="left">
      <el-form-item label="渠道账号" prop="channelLoginName">
        <el-input v-model="formData.channelLoginName" placeholder="请输入渠道账号" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="渠道名称" prop="channelName">
        <el-input v-model="formData.channelName" placeholder="请输入渠道名称" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="邀请码" prop="inviteCode">
        <el-input v-model="formData.inviteCode" placeholder="请输入邀请码" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" placeholder="请输入密码" type="password" ></el-input>
      </el-form-item>
      <el-form-item align="right">
        <el-button type="primary" @click="submit('true')">确 定</el-button>
        <!--<el-button @click="submit('false')">取 消</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'formbox',
    data() {
      return {
        formData:{
          channelLoginName:'', //	渠道账号
          channelName:'',	//渠道名称
          inviteCode:'',	//	邀请码
          password:'',		//密码
        },
        formRules:{
          channelLoginName:{required:true, message:'渠道账号不能为空',trigger: 'blur'}, //	渠道账号
          channelName:{required:true, message:'渠道名称不能为空',trigger: 'blur'},	//渠道名称
          inviteCode:{required:true, message:'邀请码不能为空',trigger: 'blur'},	//	邀请码
          password:{required:true, message:'状态不能为空',trigger: 'change'},		//状态
        }
      }
    },
    props:{
      FormData:{
        type:Array,
        default:()=>{}
      }
    },
    created(){

    },
    methods:{
      submit(val){
        this.$refs.formData.validate(valid =>{
          if (valid){
            this.$emit('update',this.formData)
          }else{
            return
          }
        })
      }
    }
  }
</script>
<style scoped lang="less">
  .formbox{
    margin-top:20px;
  }
</style>
