<template>
  <div class="user">
    <search-box></search-box>
    <table-box :tableData="tableData"></table-box>
  </div>
</template>
<script>
  import searchBox from '../common/user/search'
  import tableBox from '../common/user/table'
  export default {
    name:'User',
    data(){
      return{
        tableData:{
          type:'user',
          filterData:{},
          tableBtn:[
            {
              api:'saveUserNotice',
              type:'primary',
              name:'新增'
            },
          ], 
          //接口名字方法           //修改                //新增          发送消息
          api:['queryUserTaobao','editUserTaobao','saveUserNotice','saveUserNotice'],
          thData:[
            {
              key:'taobaoOpenUid',
              label:"淘宝ID",
              wd:100,
            },
            {
              key:'taobaoName',
              label:"用户淘宝名",
              wd:100,
            },
            {
              key:'mobile',
              label:"手机号码",
            },
            {
              key:'payCode',
              label:"提现支付宝账号",
            },
           // {
            //  key:'jdName',
             // label:"京东用户名",
            //},
          //  {
           //   key:'jingdongCount',
           //   label:"任务完成情况",

          //  },
         //   {
          //    key:'status',
          //    label:"购物情况",
           // },
            {
              key:'recommendCode',
              label:"推荐码",
            },
           // {
           //   key:'status',
           //   label:"推荐用户完成任务情况",
           // },
            {
              key:'taskAmount',
              label:"任务佣金",
            },
            {
              key:'inviteAmount',
              label:"推荐佣金",
            },
            {
              key:'shopAmount',
              label:"购物佣金",
            },
            {
              key:'withdrawAmount',
              label:"已经提现金额",
            },
            {
              key:'frozenAmount',
              label:"冻结金额",
            },
            {
              key:'amount',
              label:"可用金额",
            },

             {
              key:'totalAmount',
              label:"总金额",
            },

            {
              key:'status',
              fun:true,
              label:"操作",
              wd:250,
              chilren:[
                {
                  num: '2',
                  type: '',
                  name: '发送消息'
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
