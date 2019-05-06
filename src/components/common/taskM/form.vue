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
          action="/common/attachment/uploadFile"
          list-type="picture-card"
          :headers="headers"
          :on-preview="handlePictureCardPreview"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="FormData.taskImg" alt="" class="uploadImg">
        </el-dialog>
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
        headers:{'Content-Type':'application/json;charset=utf-8'},
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
        default:()=>[]
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
      },
      handleAvatarSuccess(file){
        console.log(file,'==]]]]');
        this.FormData.img = URL.createObjectURL(file.raw);
      },
      //上传图片限制类型
      beforeAvatarUpload(file){
        var regExp = /\w\.(JPEG|jpeg|JPG|jpg|png|gif|bmp|swf)$/
        if (file.type.match(regExp)){
          this.$message.warning({
            title: '警告',
            message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg,image/bmp，image/swf的图片'
          })
        }
        let size = file.size / 1024 / 1024 / 2
        if(size > 2) {
          this.$message.warning({
            title: '警告',
            message: '图片大小必须小于2M'
          })
        }
      },
      handlePictureCardPreview(file){
        console.log(file, '[[[[[[[[[[[[[[[[[[[[[[[[[[[[')
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
