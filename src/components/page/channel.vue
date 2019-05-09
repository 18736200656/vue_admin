<template>
  <div class="channel">
    <search-box></search-box>
    <table-box :tableData="tableData"></table-box>
  </div>
</template>
<script>
import searchBox from '../common/chanmel/search'
import tableBox from '../common/chanmel/table'
export default {
  name:'Channel',
  data(){
    return{
      searchData:{
        type:'channel',
        params:{
          channelLoginName:'', //	渠道账号
          channelName:'',	//渠道名称
          inviteCode:'',	//	邀请码
          status:'',		//状态
        },
        filterData:[
          {
            label:'渠道账号',
            key:'formData.channelLoginName',
            prop:'channelLoginName',
            placeholder:'请输入渠道账号',
          },
          {
            label:'渠道名称',
            key:'formData.channelName',
            prop:'channelName',
            placeholder:'请输入渠道名称',
          },
          {
            label:'邀请码',
            key:'formData.inviteCode',
            prop:'inviteCode',
            placeholder:'请输入邀请码',
          },
          {
            label:'状态',
            key:'formData.status',
            prop:'status',
            status:['1','2'],
            elSelct:true
          },

        ]
      },
      tableData:{
        type:'channel',
        filterData:{},
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

</style>
