<template>
  <div class="channel">
    <search-box :searchChannel.sync='tableData.filterData'></search-box>
    <table-box :tableData="tableData"></table-box>
  </div>
</template>
<script>
import searchBox from '../common/channel/search'
import tableBox from '../common/channel/table'
export default {
  name:'Channel',
  data(){
    return{
      searchChannel:{},
      tableData:{
        type:'channel',
        tableBtn:[
          {
            api:'saveStudenChannel',
            type:'primary',
            name:'新增'
          },
        ],
                //接口名字方法       //启用。禁用             //新增             查看推广的学生完成量
        api:['queryStudenChannel','updateStudentChannel','saveStudenChannel','queryChannelView'],
        thData:[
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
            key:'createTime',
            label:"创建时间",
          },
          {
            key:'updateTime',
            label:"更新时间",
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

</style>
