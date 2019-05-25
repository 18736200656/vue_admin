<template>
  <div class="formbox">
    <el-form :model="formData" ref="formData" :rules="formRules" lable-width="100px" label-position="left">
      <el-form-item label="问题" prop="channelLoginName">
        <el-input v-model="formData.title" placeholder="请输入问题" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="答案" prop="channelName">
        <el-input v-model="formData.answer" placeholder="请输入答案" type="text" ></el-input>
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
          title:'', //		long	是	任务ID
          answer:'', //		long	是	用户ID
        },
        formRules:{
          title:{required:true, message:'问题不能为空',trigger: 'blur'}, //	任务ID
          answer:{required:true, message:'答案不能为空',trigger: 'blur'},	//用户ID
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
       //重置
      reset(){
        this.$refs.formData.resetFields();
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
