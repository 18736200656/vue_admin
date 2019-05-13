<template>
  <div class="filte_box">
    <div class="filter_top">
      <img src="../../../assets/icon_sousuo.png" alt="" class="sou_immg">
      筛选检查
    </div>
    <el-card class="search">
      <el-form :model="formData" ref="formData" lable-width="100px" :inline="true">
        <el-form-item label="渠道账号">
          <el-input v-model="formData.channelLoginName" placeholder="请输入渠道账号" type="text" ></el-input>
        </el-form-item>
        <el-form-item label="渠道名称">
          <el-input v-model="formData.channelName" placeholder="请输入渠道名称" type="text" ></el-input>
        </el-form-item>
        <el-form-item label="邀请码" >
          <el-input v-model="formData.inviteCode" placeholder="请输入邀请码" type="text" ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formData.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="2"></el-option>
          </el-select>
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
          channelLoginName:'', //	渠道账号
          channelName:'',	//渠道名称
          inviteCode:'',	//	邀请码
          status:'',		//状态
        }
      }
    },
    methods:{
      submit(){
        bus.$emit('updataCHN',this.formData)
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
