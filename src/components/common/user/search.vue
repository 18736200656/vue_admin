<template>
  <div class="filte_box">
    <div class="filter_top">
      <img src="../../../assets/icon_sousuo.png" alt="" class="sou_immg">
      筛选检查
    </div>
    <el-card class="search">
      <el-form :model="formData" ref="formData" lable-width="100px" :inline="true">
        <el-form-item label="淘宝用户名">
          <el-input v-model="formData.taobaoName" placeholder="请输入淘宝用户名" type="text" ></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formData.mobile" placeholder="请输入手机号" type="text" ></el-input>
        </el-form-item>
        <el-form-item align="right">
          <el-button type="primary" @click="submit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  import bus from '../../../utils/bus'
  export default {
    components: {},
    name: 'search',
    data() {
      return {
        formData:{
          taobaoName:'', //		string	淘宝用户名
          mobile:'', //		string	手机号
        },

      }
    },
    methods:{
      submit(){
        bus.$emit('updataUSR',this.formData)
      }
    }
  }
</script>
<style lang="less" scoped>
  .filter_box{
    margin-top: 30px;
  }
  .filter_top{
    height: 80px;
    background:#e5e5e5 ;
    font-size: 24px;
    color: #333;
    line-height: 80px;
  }
  .sou_immg{
    margin-left: 15px;
    vertical-align: middle;
    margin-right: 15px;
  }
  .el_card_form .el-card__body{
    padding-bottom: 0 !important;
  }
</style>
