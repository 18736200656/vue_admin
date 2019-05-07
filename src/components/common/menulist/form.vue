<template>
  <div class="formbox">
    <el-form :model="formdata" ref="formdata" :rules="formRules" lable-width="100px" label-position="left">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="formdata.name" placeholder="请输入渠道账号" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="别名">
        <el-input v-model="formdata.alias" placeholder="请输入渠道名称" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="上级分类ID">
        <el-input v-model="formdata.parentId" placeholder="请输入邀请码" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="分类级别" prop="level">
        <el-input v-model="formdata.level" placeholder="请输入密码" type="password" ></el-input>
      </el-form-item>
      <!-- <el-form-item label="商品图片" class="upload_img">
        <el-upload
          action="/common/attachment/uploadFile"
          list-type="picture-card"
          :headers="{'Content-Type':'application/json;charset=utf-8 '}"
          :on-preview="handlePictureCardPreview"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="formData.img" alt="" class="uploadImg">
        </el-dialog>
      </el-form-item> -->
      <el-form-item label="商品图片" class="upload_img">
        <el-upload
          action="/common/attachment/uploadFile"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="formdata.img" :src="formdata.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

      </el-form-item>
      
      <el-form-item label="分类排序">
        <el-input v-model="formdata.sort" placeholder="请输入密码" type="password" ></el-input>
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
        headers:{'Content-Type':'application/json;charset=utf-8 '},
        formdata:{
          name:'', //	string	是	分类名称
          alias:'', //		string	否	别名
          parentId:'', //		long	否	上级分类ID
          level:'', //		int	是	分类级别
          img:'', //		string	否	分类图片
          sort:'', //		int	否	分类排序
        },
        formRules:{
          name:{required:true, message:'分类名称不能为空',trigger: 'blur'}, //	渠道账号
          level:{required:true, message:'分类级别不能为空',trigger: 'blur'},	//渠道名称
        },
        dialogVisible:false
      }
    },
    props:['channelData'],
//      channelData:{
//        type:Object,
//        default:()=>{}
//      }
//    },
    created(){
      
    },
    methods:{
      submit(val){
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
      }
    },
    //上传图片
    handleAvatarSuccess(file,res){
      if(res.code==1){
        this.formData.taskImg = res.data.path
      }else{
        this.$message.error(res.msg);
      }
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
    //上传图片
    handlePictureCardPreview(file){
      console.log(file, '[[[[[[[[[[[[[[[[[[[[[[[[[[[[')
      this.formdata.img = file.url;
      this.dialogVisible = true;
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
