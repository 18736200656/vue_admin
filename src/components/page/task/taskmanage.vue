<template>
  <div class="taskm">
    <search-box></search-box>
    <table-box :tableData="tableData" :newData="searchData.filterData"></table-box>
  </div>
</template>
<script>
  import searchBox from '../../common/taskM/search'
  import tableBox from '../../common/table'
  export default {
    name:'taskM',
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
          //接口名字方法       //启用。禁用             //新增
          api:['queryStudenChannel','updateStudentChannel','saveStudenChannel'],
          thData:[
            {
              key:'appCount',
              label:"APP安装量",
              align:'right'
            },
            {
              key:'shopCount',
              label:"收购完成量",
            },
            {
              key:'creditCount',
              label:"信用卡开卡量",
              align:'right'

            },
            {
              key:'cloudPayCount',
              label:"云闪付完成量",
              align:'right'

            },
            {
              key:'jingdongCount',
              label:"京东白条完成量",
              align:'right'
            },
            {
              key:'status',
              label:"状态",
              Tag:true,
            },
            {
              key:'status',
              fun:true,
              label:"操作",
              wd:150,
              chilren:[
                {
                  num: '1',
                  type: 'success',
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
    created(){
      bus.$on('updata',data =>{

      })
    },
    methods:{

    },
    components:{
      searchBox,tableBox
    },
  }
</script>
<style scoped>

</style>
