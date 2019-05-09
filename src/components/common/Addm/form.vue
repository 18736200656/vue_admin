<template>
  <div class="formbox">
    <el-form :model="formdata" ref="formdata" :rules="formRules" lable-width="100px" label-position="left">
      <el-form-item label="广告ID" prop="id" v-if="channelData.edit">
        <el-input v-model="formdata.id" placeholder="请输入广告ID" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="商品图片" class="upload_img" prop="imgUrl">
        <el-upload
          action="/common/attachment/uploadFile"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="formdata.imgUrl" :src="formdata.imgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="点击链接">
        <el-input v-model="formdata.clickUrl" placeholder="请输入点击链接" type="text" ></el-input>
      </el-form-item>
      <el-form-item align="right">
        <el-button type="primary" @click="submit('true')" v-if="channelData.edit">确 定</el-button>
        <el-button type="primary" @click="submit('false')" v-else>保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'formbox',
    data() {
      return {
        formdata:{
          id:'', //	string	
          imgUrl:'', //		string
          clickUrl:'', //		long	
        },
        formRules:{
          imgUrl:{required:true, message:'广告链接不能为空',trigger: 'change'},	//广告链接
        },
        id:{required:true, message:'广告ID不能为空',trigger: 'blur'}, //		广告ID
        dialogVisible:false,
      }
    },
    props:{
      channelData:{
        type:Object,
        default:()=>{}
      }
    },
    created(){
      
    },
    methods:{
      submit(val){
        if(this.channelData.edit){
          this.formRules= Object.assign(this.formRules,{id:this.id})
        }
        this.formdata=Object.assign(this.formdata,{
          type:val
        });
        this.$refs.formdata.validate(valid =>{
          if (valid){
            this.$emit('update',this.formdata)
          }else{
            return
          }
        })
      },
      //上传图片
     handleAvatarSuccess(res,file){
        if(res.code==1){
          this.formdata.imgUrl = res.data.path
        }else{
          this.$message.error(res.msg);
        }
      },
    },
    watch:{
      channelData(val){
        this.formdata = val.data;
      }
    }
  }
</script>
<style scoped lang="less">
  .formbox{
    margin-top:20px;
  }
  
</style>
<style>
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
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
