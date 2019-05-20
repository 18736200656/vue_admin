<template>
  <div class="cash">
    <search-box></search-box>
    <section class="cash_section">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="提现申请" name="first">
          <table-box :tableData="tableData"></table-box>
        </el-tab-pane>
        <el-tab-pane label="已支付" name="second">
          <table-box2 :tableData="tableData"></table-box2>
        </el-tab-pane>
      </el-tabs>
    </section>
    
  </div>
</template>
<script>
import searchBox from '../common/cash/search'
import tableBox from '../common/cash/table'
import tableBox2 from '../common/cash/table2'
export default {
  name:'Channel',
  data(){
    return{
      activeName:'first',
      tableData:{
        type:'Cash',
        filterData:{},
        tableBtn:[
          {
            api:'saveStudenChannel',
            type:'success',
            name:'导出'
          },
        ],
                //接口名字方法       //导出提现列表           //导入提现支付信息             查看推广的学生完成量
        api:['queryUserWithdrawList','exportUserWithdraw','importUserPay','queryChannelView'],
        thData:[
          {
            key:'id',
            label:"提现ID",
          },
          // {
          //   key:'userId',
          //   label:"用户ID",

          // },
          {
            key:'userName',
            label:"用户名称",
          },
           {
            key:'withdrawAccount',
            label:"提现账号",
          },
          // {
          //   key:'amount',
          //   label:"提现金额",
          // },
          {
            key:'payAmount',
            label:"支付金额",
            align:'right'
          },
           
          // {
          //   key:'payTime',
          //   label:"支付时间",
          // },
          {
            key:'status',
            label:"状态",
            Tag:true,
          },
          // {
          //   key:'createTime',
          //   label:"提现时间",
          // },
          // {
          //   key:'updateTime',
          //   label:"最后修改时间",

          // },
          // {
          //   key:'version',
          //   label:"当前版本号",
          // },
         
        ],
        thData2:[
          {
            key:'id',
            label:"提现ID",
          },
          // {
          //   key:'userId',
          //   label:"用户ID",

          // },
          {
            key:'userName',
            label:"用户名称",
          },
          //  {
          //   key:'withdrawAccount',
          //   label:"提现账号",
          // },
          // {
          //   key:'amount',
          //   label:"提现金额",
          // },
          {
            key:'payAmount',
            label:"支付金额",
            align:'right'
          },
           
          {
            key:'payTime',
            label:"支付时间",
          },
          // {
          //   key:'status',
          //   label:"状态",
          //   Tag:true,
          // },
          // {
          //   key:'createTime',
          //   label:"提现时间",
          // },
          // {
          //   key:'updateTime',
          //   label:"最后修改时间",

          // },
          // {
          //   key:'version',
          //   label:"当前版本号",
          // },
         
        ]
      }
    }
  },
  components:{
    searchBox,tableBox,tableBox2
  },
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
