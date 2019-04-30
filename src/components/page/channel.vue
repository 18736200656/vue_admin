<template>
  <div class="channel">
    <search-box :searchData="searchData" :searchParams.sync="searchData.params" @updata="getSearchData"></search-box>
    <table-box :tableData="tableData"></table-box>
  </div>
</template>
<script>
import bus from '../../utils/bus'
import searchBox from '../common/searchbox'
import tableBox from '../common/table'
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
        api:'queryStudenChannel', //接口名字方法
        thData:[
          { 
            key:'appCount',
            label:"APP安装量",

          },
          { 
            key:'shopCount',
            label:"收购完成量",

          },
          { 
            key:'creditCount',
            label:"信用卡开卡量",

          },
          { 
            key:'cloudPayCount',
            label:"云闪付完成量",

          },
          { 
            key:'jingdongCount',
            label:"京东白条完成量",
          },
          { 
            key:'status',
            label:"状态",
            Tag:true,
          },
          
        ]
      }
    }
  },
  created(){

  },
  methods:{
    getSearchData(data){ //获取search的数据
      console.log(data,'====channel======')
      this.tableData.filterData = data
    }
  },
  components:{
    searchBox,tableBox
  },
}
</script>
<style scoped>

</style>
