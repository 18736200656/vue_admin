<template>
  <div class="formbox">
    <el-form :model="taskDdata" ref="taskD" :rules="formRules" lable-width="100px" label-position="left">
      <el-form-item label="任务名称" prop="taskName">
        <el-input v-model="taskDdata.taskName" placeholder="请输入任务名称" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="	任务描述">
        <el-input v-model="taskDdata.taskDesc" placeholder="请输入任务描述" type="textarea" ></el-input>
      </el-form-item>
      <el-form-item label="任务视频链接" prop="taskLink">
        <el-input v-model="taskDdata.taskLink" placeholder="请输入任务视频链接" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="第一步文字介绍" >
        <el-input v-model="taskDdata.oneText	" placeholder="请输入第一步文字介绍" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="第一步图片链接" >
        <el-input v-model="taskDdata.oneImg	" placeholder="请输入第一步图片链接" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="第二步文字介绍" >
        <el-input v-model="taskDdata.twoText	" placeholder="请输入第二步文字介绍" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="第二步图片链接" >
        <el-input v-model="taskDdata.twoImg	" placeholder="请输入第二步图片链接" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="第三步文字介绍" >
        <el-input v-model="taskDdata.thirdText	" placeholder="请输入第三步文字介绍" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="第三步图片链接" >
        <el-input v-model="taskDdata.thirdImg	" placeholder="请输入第三步图片链接" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="任务推荐码" >
        <el-input v-model="taskDdata.taskCode" placeholder="任务推荐码" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="推荐用户上限" prop="userCount">
        <el-input v-model="taskDdata.userCount" placeholder="推荐用户上限" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="超级推广码上限" prop="superUserCount" >
        <el-input v-model="taskDdata.superUserCount" placeholder="超级推广码上限" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="任务奖励" prop="taskAmount" >
        <el-input v-model="taskDdata.taskAmount" placeholder="任务奖励" type="text" ></el-input>
      </el-form-item>
      <el-form-item label="推荐者奖励" prop="recommendAmount" >
        <el-input v-model="taskDdata.recommendAmount" placeholder="推荐者奖励" type="text" ></el-input>
      </el-form-item>
      <el-form-item align="right">
        <el-button type="primary" @click="submit(true)" v-if="FormData.edit">保存</el-button>
        <el-button @click="submit(false)" v-else>确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'formbox',
    data() {
      return {
        taskDdata:{
          taskName:'', //	string	是	任务名称
          taskDesc:'', //	string	否	任务描述
          taskLink:'', //	string	是	任务视频链接
          oneText	:'', //string	否	第一步文字介绍
          oneImg:'', //	string	否	第一步图片链接
          twoText	:'', //string	否	第二步文字介绍
          twoImg:'', //	string	否	第二步图片链接
          thirdTex:'', //t	string	否	第三步文字介绍
          thirdImg:'', //	string	否	第三部图片链接
          taskCode:'', //	string	否	任务推荐码
          userCount:'', //		int	是	推荐用户上限
          superUserCount:'', //		int	是	超级推广码上限
          taskAmount:'', //		float	是	任务奖励
          recommendAmount:'', //	float	是	推荐者奖励
        },
        formRules:{
          taskName:{required:true, message:'任务名称不能为空',trigger: 'blur'}, //	渠道账号
          taskLink:{required:true, message:'任务视频链接不能为空',trigger: 'blur'},	//渠道名称
          userCount:{required:true, message:'推荐用户上限不能为空',trigger: 'blur'},	//推荐用户
          superUserCount:{required:true, message:'超级推广码上限不能为空',trigger: 'blur'},	//超级推广码上限
          taskAmount:{required:true, message:'任务奖励不能为空',trigger: 'blur'},	//任务奖励
          recommendAmount:{required:true, message:'推荐者奖励不能为空',trigger: 'blur'},	//推荐者奖励
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
      this.taskDdata = this.FormData.data
    },
    methods:{
      submit(val){
        this.taskDdata.type = val
        console.log(this.taskDdata,'====')
        this.$refs.taskD.validate(valid =>{
          if (valid){
            console.log(this.taskDdata,'+++++')
            this.$emit('update',this.taskDdata)
          }else{
            return
          }
        })
      },
      //重置
      reset(){
        this.$refs.taskD.resetFields();
      }
    },
    watch:{
      FormData(val){
        this.taskDdata = val.data
      }
    }
  }
</script>
<style scoped lang="less">
  .formbox{
    margin-top:20px;
  }
</style>
