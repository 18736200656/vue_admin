<template>
  <div class="filte_box">
    <div class="filter_top">
      <img src="../../../assets/icon_sousuo.png" alt="" class="sou_immg">
      筛选检查
    </div>
    <el-card class="search">
      <el-form :model="formData" ref="formData" lable-width="100px" :inline="true">
        <el-form-item label="分类名称">
          <el-input v-model="formData.name" placeholder="请输入分类名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="分类级别">
          <el-input v-model="formData.level" placeholder="请输入分类级别" clearable></el-input>
        </el-form-item>
        <el-form-item label="上级ID">
          <el-input v-model="formData.parentId" placeholder="请输入上级ID" clearable></el-input>
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
//          level:'', //	分类级别
          parentId:'',	//上级分类ID
        }
      }
    },
    methods:{
      submit(){
        bus.$emit('updataMENU',this.formData)
      },
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
