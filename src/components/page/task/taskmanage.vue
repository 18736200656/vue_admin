<template>
  <div class="taskm">
    <search-box></search-box>
    <table-box :tableData="tableData"></table-box>
  </div>
</template>
<script>
import searchBox from '../../common/taskM/search'
import tableBox from '../../common/taskM/table'
export default {
  name:'taskM',
  data(){
    return{
      tableData:{
        type:'taskM',
        tableBtn:[
          //{
          //  api:1,
          //  type:'primary',
          //  name:'新增'
          //},
          {
            api:2,
            type:'success',
            name:'导出'
          },
          {
            api:3,
            type:'success',
            name:'导入'
          },
        ],
                //接口名字方法      //修改              删除            //导出         //新增         
        api:['queryTaskUserList','updateTaskUser','deleteTaskUser','exportTaskUser','saveTaskUser',
          //审核用户      //用户信息      //任务列表
        'reviewTaskUser','queryUserList','taskList'],
        thData:[
          // {
          //   key:'id',
          //   label:"数据ID",
          // },
          // {
          //   key:'taskId',
          //   label:"任务ID",
          // },
          {
            key:'taskName',
            label:"任务名称",
          },
          {
            key:'userName',
            label:"用户名",
          },
          {
            key:'tbName',
            label:"淘宝用户名",
          },
          {
            key:'mobile',
            label:"手机号",
          },
          {
            key:'identityCode',
            label:"身份证号",
          },
          
          {
            key:'taskImg',
            label:"任务截图",
          },
          {
            key:'status',
            label:"状态",
          },
          {
            key:'createTime',
            label:"提交任务时间",
            keyS:'createTimeS',
            handdle:function(val){
              if(val){
                return this.$valid.time(val)
              }
            }
          },
          {
            key:'updateTime',
            label:"最后更新时间",
            keyS:'updateTimeS',
            handdle:function(val){
              if(val){
                return this.$valid.time(val)
              }
            }
          },
          {
            verify:true,
            label:"审核状态",
            key:'status',
            wd:250,
            chilren:[
              {
                num: '2',
                type: 'primary',
                name: '通过'
              },
              {
                num: '3',
                type: '',
                name: '驳回'
              }
            ]
          },
          
          {
            fun:true,
            label:"操作",
            chilren:[
              {
                num: '2',
                type: 'danger',
                name: '删除'
              },
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
