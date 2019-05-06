<template>
  <div class="formbox">
    <el-form :model="formData" ref="formData" :rules="formRules" lable-width="100px" label-position="left">
      <el-form-item label="任务名称" prop="taskName">
        <el-input v-model="formData.taskName" placeholder="请输入任务名称" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="	任务描述">
        <el-input v-model="formData.taskDesc" placeholder="请输入任务描述" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="任务视频链接" prop="taskLink">
        <el-input v-model="formData.taskLink" placeholder="请输入任务视频链接" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="第一步文字介绍" >
        <el-input v-model="formData.oneText	" placeholder="请输入第一步文字介绍" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="第一步图片链接" >
        <el-input v-model="formData.oneImg	" placeholder="请输入第一步图片链接" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="第二步文字介绍" >
        <el-input v-model="formData.twoText	" placeholder="请输入第二步文字介绍" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="第二步图片链接" >
        <el-input v-model="formData.twoImg	" placeholder="请输入第二步图片链接" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="第三步文字介绍" >
        <el-input v-model="formData.thirdText	" placeholder="请输入第三步文字介绍" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="第三步图片链接" >
        <el-input v-model="formData.thirdImg	" placeholder="请输入第三步图片链接" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="任务推荐码" >
        <el-input v-model="formData.taskCode" placeholder="任务推荐码" type="text" ></el-input>
      </el-form-item>
      <el-form-item align="right">
        <el-button type="primary" @click="submit('true')" v-if="FormData.edit">保存</el-button>
        <el-button @click="submit('false')" v-else>确定</el-button>
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
          taskName:'', //	string	是	任务名称
          taskDesc:'', //	string	否	任务描述
          taskLink:'', //	string	是	任务视频链接
          oneText	:'', //string	否	第一步文字介绍
          oneImg:'', //	string	否	第一步图片链接
          twoText	:'', //string	否	第二步文字介绍
          twoImg:'', //	string	否	第二步图片链接
          thirdTex:'', //t	string	否	第三步文字介绍
          thirdImg:'', //	string	否	第三部图片链接
          taskCode:'', //	string	否	任务推荐码
          channelName:'',	//渠道名称
          inviteCode:'',	//	邀请码
          password:'',		//密码
        },
        formRules:{
          taskName:{required:true, message:'任务名称不能为空',trigger: 'blur'}, //	渠道账号
          taskLink:{required:true, message:'任务视频链接不能为空',trigger: 'blur'},	//渠道名称
        }
      }
    },
    props:{
      FormData:{
        type:Object,
        default:()=>{}
      }
    },
    created(){

    },
    methods:{
      submit(val){
        this.formData = Object.assign(this.formData,{
          type:val,
          data:this.formData
        })
        this.$refs.formData.validate(valid =>{
          if (valid){
            this.$emit('update',this.formData)
          }else{
            return
          }
        })
      }
    },
    watch:{
      FormData(val){
        this.formData = val.data
      }
    }
  }
</script>
<style scoped lang="less">
  .formbox{
    margin-top:20px;
  }
</style>
