<template>
  <div class="formbox">
    <el-form :model="formData" ref="formData" :rules="formRules" lable-width="100px" label-position="left">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入渠道账号" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="别名">
        <el-input v-model="formData.alias" placeholder="请输入渠道名称" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="上级分类ID">
        <el-input v-model="formData.parentId" placeholder="请输入邀请码" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="分类级别" prop="level">
        <el-input v-model="formData.level" placeholder="请输入密码" type="password" ></el-input>
      </el-form-item>
      <el-form-item label="商品图片" class="upload_img">
        <el-upload
          action="/common/attachment/uploadFile"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="FormData.img" alt="" class="uploadImg">
        </el-dialog>
      </el-form-item>
      <el-form-item label="分类排序">
        <el-input v-model="formData.sort" placeholder="请输入密码" type="password" ></el-input>
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
        formData:{
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
        }
      }
    },
    props:['channelData'],
//      channelData:{
//        type:Object,
//        default:()=>{}
//      }
//    },
    created(){
      this.formData = this.channelData.data;
    },
    methods:{
      submit(val){
        this.formData={
          type:val
        };
        this.$refs.formData.validate(valid =>{
          if (valid){
            this.$emit('updataMENU',this.formData)
          }else{
            return
          }
        })
      }
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
    //上传图片
    handlePictureCardPreview(file){
      console.log(file, '[[[[[[[[[[[[[[[[[[[[[[[[[[[[')
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  }
</script>
<style scoped lang="less">
  .formbox{
    margin-top:20px;
  }
</style>
