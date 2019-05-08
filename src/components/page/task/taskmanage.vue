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
          {
            api:false,
            type:'primary',
            name:'新增'
          },
          {
            api:true,
            type:'primary',
            name:'导出'
          },
        ],
                //接口名字方法      //修改              删除            //导出         //新增           //审核用户
        api:['queryTaskUserList','updateTaskUser','deleteTaskUser','exportTaskUser','saveTaskUser','reviewTaskUser'],
        thData:[
          {
            key:'id',
            label:"数据ID",
          },
          {
            key:'taskId',
            label:"任务ID",
          },
          {
            key:'taskName',
            label:"任务名称",
          },
          {
            key:'userId',
            label:"用户ID",
          },
           {
            key:'userName',
            label:"用户姓名",
          },
           {
            key:'mobile',
            label:"手机号",
          },
          {
            key:'tbName',
            label:"淘宝用户名",
          },
          {
            taskImg:true,
            label:"任务图文介绍",
        
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
          },
          {
            key:'updateTime',
            label:"最后更新时间",
          },
           {
            key:'version',
            label:"当前版本号",
          },

          {
            fun:true,
            label:"操作",
            wd:250,
            chilren:[
              {
                num: '1',
                type: 'primary',
                name: '修改'
              },
              {
                num: '2',
                type: 'danger',
                name: '删除'
              },
              {
                num: '3',
                type: 'succsess',
                name: '审核'
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
