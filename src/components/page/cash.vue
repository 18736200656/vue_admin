<template>
  <div class="cash">
    <div class="filte_box">
      <div class="filter_top">
        <img src="../../assets/icon_sousuo.png" alt="" class="sou_immg">
        筛选检查
      </div>
      <el-card class="el_card_form">
        <el-form ref="goodsForm" :model="goodsForm"
                 label-width="80px" size="large"
                 :inline="true" align="left">
          <el-form-item label="提现时间">
            <el-date-picker
              type="date"
              v-model="goodsForm.startTime"
              placeholder="开始日期">
            </el-date-picker>
              至
            <el-date-picker
              type="date"
              v-model="goodsForm.endTime"
              placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <section class="cash_section">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="提现申请" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="已支付" name="second">配置管理</el-tab-pane>
      </el-tabs>
    </section>

  </div>
</template>
<script>
  export default {
    name:'Cash',
    data(){
      return{
        goodsForm:{
          startTime:'',
          endTime:''
        },
        activeName:'first',
        tableData:{},
        currentPage:1, //当前是第几页
        pageSize:20, //一页显示多少
        total:0, //总共
        FormData:{},
        dialogVisible:true,
      }
    },
    created(){


    },
    methods:{

    }
  }
</script>
<style scoped>
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
</style>
<style>
  .cash_section{
    margin-top:20px;
    background: #fff;
  }
  .el_card_form .el-card__body{
    padding-bottom:0;
  }
  .el-tabs__content{
    padding:20px;
  }
</style>
