<template>
  <div class="cash">
    <search-box></search-box>
    <section class="cash_section">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="提现申请" name="first">用户管理
          <table-box :tableData="tableData"></table-box>
        </el-tab-pane>
        <el-tab-pane label="已支付" name="second">配置管理
          <table-box :tableData="tableData"></table-box>
        </el-tab-pane>
      </el-tabs>
    </section>
    
  </div>
</template>
<script>
import searchBox from '../common/chanmel/search'
import tableBox from '../common/chanmel/table'
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
            type:'primary',
            name:'新增'
          },
        ],
                //接口名字方法       //导出提现列表           //导入提现支付信息             查看推广的学生完成量
        api:['queryUserWithdrawList','exportUserWithdraw','importUserPay','queryChannelView'],
        thData:[
          {
            key:'id',
            label:"渠道ID",
          },
          {
            key:'channelLoginName',
            label:"渠道账号",

          },
          {
            key:'channelName',
            label:"渠道名称",
          },
           {
            key:'inviteCode',
            label:"邀请码",
          },
          {
            key:'password',
            label:"密码",
          },
          {
            key:'totalAmount',
            label:"总金额",
            align:'right'
          },
          {
            key:'amount',
            label:"可用金额",
            align:'right'
          },
          {
            key:'taskAmount',
            label:"任务金额",
            align:'right'

          },
          {
            key:'withdrawAmount',
            label:"提现金额",
            align:'right'

          },
          {
            key:'frozenAmount',
            label:"冻结金额",
            align:'right'
          },
          {
            key:'status',
            label:"状态",
            Tag:true,
          },
          {
            key:'statusName',
            label:"状态名称",
          },
          
          {
            key:'createTime',
            label:"创建时间",
          },
          {
            key:'updateTime',
            label:"更新时间",
          },
          {
            key:'version',
            label:"当前版本号",
          },
          {
            key:'status',
            fun:true,
            label:"操作",
            wd:150,
            chilren:[
              {
                num: '1',
                type: 'primary',
                name: '启用'
              },
              {
                num: '2',
                type: 'danger',
                name: '禁用'
              }
            ]
          }
        ]
      }
    }
  },
  components:{
    searchBox,tableBox
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
