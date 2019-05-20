<template>
  <div class="formbox">
    <el-form :model="formdata" ref="formdata" :rules="formRules" lable-width="100px" label-position="left">
      <el-form-item label="广告ID" prop="id" v-if="FormData.edit">
        <el-input v-model="formdata.id" placeholder="请输入广告ID" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="商品图片" class="upload_img" prop="imgUrl">
        <!-- <el-upload
          class="avatar-uploader"
          action="/common/attachment/uploadFile"
          :show-file-list="false"
          :on-remove="removeImg"
          :on-success="handleAvatarSuccess">
          <img v-if="formdata.imgUrl" :src="formdata.imgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->
        <upload-img :value="formdata.imgUrl" @input="uploadImg"></upload-img> 
      </el-form-item>
      <el-form-item label="点击链接">
        <el-input v-model="formdata.clickUrl" placeholder="请输入点击链接" type="text" ></el-input>
      </el-form-item>
      <el-form-item align="right">
        <el-button type="primary" @click="submit('true')" v-if="FormData.edit">确 定</el-button>
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
      FormData:{
        type:Object,
        default:()=>{}
      }
    },
    created(){
      
    },
    methods:{
      submit(val){
        if(this.FormData.edit){
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
        // let imgs = URL.createObjectURL(file.raw);
        console.log(res,file,'----图谱按')
          var result = file.response; 
          if(result.code==1){
            this.formdata.imgUrl = result.data.path
          }else{
            this.$message.error(result.msg);
          }
        // if(res.code==1){
        //   this.formdata.imgUrl = res.data.path
        //   // this.removeImg()
        // }else{ 
        //   this.$message.error(res.msg);
        // }
      },
      //重置
      reset(){
        this.$refs.formdata.resetFields();
      },
      //
      removeImg(file,fileList){
        console.log(file,fileList,'移除图片')
        // this.formdata.imgUrl =''
      },
      //上传若
      uploadImg(val){
        this.formdata.imgUrl = val
      }
    },
    watch:{
      FormData(val){
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
