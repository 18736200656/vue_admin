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
              api:'saveStudenChannel',
              type:'primary',
              name:'导出数据'
            },
          ],
          //接口名字方法           //修改                //新增
          api:['queryUserTaobao','editUserTaobao','saveUserNotice'],
          thData:[
            {
              key:'taobaoOpenUid',
              label:"淘宝ID",
            },
            {
              key:'taobaoName',
              label:"用户淘宝名",
            },
            {
              key:'shopCount',
              label:"手机号码",
            },
            {
              key:'creditCount',
              label:"提现支付宝账号",
            },
            {
              key:'cloudPayCount',
              label:"京东用户名",
            },
            {
              key:'jingdongCount',
              label:"任务完成情况",

            },
            {
              key:'status',
              label:"购物情况",
            },
            {
              key:'status',
              label:"推荐码",
            },
            {
              key:'status',
              label:"推荐用户完成任务情况",
            },
            {
              key:'status',
              label:"任务佣金",
            },
            {
              key:'status',
              label:"推荐佣金",
            },
            {
              key:'status',
              label:"购物佣金",
            },
            {
              key:'status',
              label:"已经提现金额",
            },
            {
              key:'status',
              label:"总资产",
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
