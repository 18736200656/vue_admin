<template>
  <div class="formbox">
    <el-form :model="formdata" ref="formdata" :rules="formRules" lable-width="100px" label-position="left">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="formdata.name" placeholder="请输入分类名称" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="别名">
        <el-input v-model="formdata.alias" placeholder="请输入别名" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="上级分类ID">
        <el-input v-model="formdata.parentId" placeholder="请输入上级分类ID" type="text" ></el-input>
      </el-form-item>
       <el-form-item label="商品分类等级" prop="level" >
          <el-select v-model="FormData.level" placeholder="请选择商品分类等级"> 
            <el-option :label="item.label" :value="item.value" v-for="item in options" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="商品图片" class="upload_img">
        <el-upload
          class="avatar-uploader"
          action="/common/attachment/uploadFile"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="formdata.img" :src="formdata.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="分类排序">
        <el-input v-model="formdata.sort" placeholder="请输入分类排序" type="text" ></el-input>
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
        headers:{'Content-Type':'application/json;charset=utf-8 '},
        formdata:{
          name:'', //	string	是	分类名称
          alias:'', //		string	否	别名
          parentId:'', //		long	否	上级分类ID
          level:'', //		int	是	分类级别
          img:'', //		string	否	分类图片
          sort:'', //		int	否	分类排序
        },
         options:[
          {label:'一级',value:1},
          {label:'二级',value:2},
          {label:'三级',value:3},
        ],
        formRules:{
          name:{required:true, message:'分类名称不能为空',trigger: 'blur'}, //	渠道账号
          level:{required:true, message:'分类级别不能为空',trigger: 'blur'},	//渠道名称
        },
        dialogVisible:false
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
          this.formdata.img = res.data.path
        }else{
          this.$message.error(res.msg);
        }
      },
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
