<template>
  <div class="formbox">
    <el-form :model="formData" ref="formData" :rules="formRules" lable-width="100px" label-position="left">
      <el-form-item label="任务ID" prop="channelLoginName">
        <el-input v-model="formData.taskId" placeholder="请输入任务ID" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="用户ID" prop="channelName">
        <el-input v-model="formData.userId" placeholder="请输入用户ID" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="任务截图" prop="taskImg" class="upload_img">
        <el-upload
          class="avatar-uploader"
          action="/common/attachment/uploadFile"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="formData.taskImg" :src="formData.taskImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item align="right">
        <el-button type="primary" @click="submit('true')" v-if="FormData.edit">保存</el-button>
        <el-button @click="submit('false')" v-else>确 定</el-button>
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
          taskId:'', //		long	是	任务ID
          userId:'', //		long	是	用户ID
          taskImg:'', //		string	是	任务截图
        },
        formRules:{
          taskId:{required:true, message:'任务ID不能为空',trigger: 'blur'}, //	任务ID
          userId:{required:true, message:'用户ID不能为空',trigger: 'blur'},	//用户ID
          taskImg:{required:true, message:'任务截图不能为空',trigger: 'change'},	//	任务截图
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
          type:val
        })
        this.$refs.formData.validate(valid =>{
          if (valid){
            this.$emit('update',this.formData)
          }else{
            return
          }
        })
      },
      //上传图片
      handleAvatarSuccess(res,file){
        if(res.code==1){
          this.formData.taskImg = res.data.path
        }else{
          this.$message.error(res.msg);
        }
      },
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 18px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>
