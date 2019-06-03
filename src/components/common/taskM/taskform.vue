<template>
  <div class="formbox">
    <el-form :model="formData" ref="taskform" :rules="formRules" lable-width="100px" label-position="left">
      <el-form-item label="淘宝用户名称" :prop="taskFormData.edit ? '' :'userId'"  v-if="!taskFormData.edit">
        <el-select v-model="formData.userId" placeholder="请选择淘宝用户名称" >
           <el-option :label="item.taobaoName" :value="item.id" v-for="item in formData.userList" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务名称" :prop="taskFormData.edit ? '' :'taskId'"  v-if="!taskFormData.edit">
          <el-select v-model="formData.taskId" placeholder="请选择任务名称">
            <el-option :label="item.taskName" :value="item.id" v-for="item in formData.taskList" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="任务截图" class="upload_img">
        <!-- <el-upload
          class="avatar-uploader"
          action="/common/attachment/uploadFile"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="formData.taskImg" :src="formData.taskImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->
        <uploadImg :value="formData.taskImg" :title="'上传图片'" @input="updateImg"></uploadImg>
      </el-form-item>
      <el-form-item align="right">
        <el-button type="primary" @click="submit(true)" v-if="taskFormData.edit">保存</el-button>
        <el-button @click="submit(false)" v-else>确 定</el-button>
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
          taskImg:'', //		string	是	任务截
        },
        formRules:{
          taskId:{required:true, message:'任务ID不能为空',trigger: 'blur'}, //	任务ID
          userId:{required:true, message:'用户ID不能为空',trigger: 'blur'},	//用户ID
          taskImg:[{required:true, message:'任务截图不能为空',trigger: 'change'}]	//	任务截图
        },
      }
    },
    props:{
      taskFormData:{
        type:Object,
        default:()=>{}
      }
    },
    created(){
      this.formData =  this.taskFormData.data  
    },
     methods:{
      updateImg(val){
        this.formData.taskImg = val
      },
      submit(val){
        this.formData.type= val;
        delete this.formData.taskList
        delete this.formData.userList
        this.$refs.taskform.validate(valid =>{
          if (valid){
            this.$emit('updateTask',this.formData)
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
       //重置
      reset(){
        this.$refs.taskform.resetFields();
      }
    },
    watch:{
      taskFormData(val){
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
