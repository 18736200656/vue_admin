<template>
  <div class="form">
    <el-form :model="formData" ref="formbox" :rules="formRules" lable-width="100px" label-position="left">
      <el-form-item label="任务ID" prop="taskId">
        <el-input v-model="formData.taskId" placeholder="请输入任务ID" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="用户ID" prop="userId">
        <el-input v-model="formData.userId" placeholder="请输入用户ID" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="任务截图" prop="taskImg" class="upload_img">
        <!-- <el-upload
          class="avatar-uploader"
          action="/common/attachment/uploadFile"
          :show-file-list="false"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess">
          <img v-if="formData.taskImg" :src="formData.taskImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->
        <uploadImg :value="formData.taskImg" :title="'上传图片'" @input="updateImg"></uploadImg>
      </el-form-item>
      <el-form-item align="right">
        <el-button type="primary" @click="submit(true)" v-if="userFormData.edit">保存</el-button>
        <el-button @click="submit(false)" v-else>确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'form',
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
          taskImg:{required:true, message:'任务截图不能为空',trigger: 'input'},	//	任务截图
        }
      }
    },
    props:{
      userFormData:{
        type:Object,
        default:()=>{}
      }
    },
    created(){
      this.formdata = this.userFormData.data
    },
     methods:{
      updateImg(val){
        this.formData.taskImg = val
      },
      submit(val){
        this.formData.type =val;
        console.log(this.formData,'==--form')
        this.$refs.formbox.validate(valid =>{
          if (valid){
            console.log(this.formData,'===this.formData ---form')
            this.$emit('updatelist',this.formData)
          }else{
            return
          }
        })
      },
      //上传图片
      handleAvatarSuccess(res,file){
        console.log(res,file,'===用戶')
        if(res.code==1){
          this.formData.taskImg = res.data.path
        }else{
          this.$message.error(res.msg);
        }
      },
      //成功后移除
      handleRemove(file, fileList) {
        console.log(file, fileList,'===移除');
      },
      //重置
      reset(){
        this.$refs.formbox.resetFields();
      }
    },
    watch:{
      userFormData(val){
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
