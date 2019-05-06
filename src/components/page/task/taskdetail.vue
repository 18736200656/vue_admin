<template>
  <div class="taskD">
    <search-box></search-box>
    <table-box :tableData="tableData"></table-box>
  </div>
</template>
<script>
import searchBox from '../../common/taskD/search'
import tableBox from '../../common/taskD/table'
export default {
  name:'taskD',
  data(){
    return{
      tableData:{
        type:'taskD',
        tableBtn:[
          {
            api:'saveTask',
            type:'primary',
            name:'新增'
          },
        ],
                //接口名字方法     //启用。      禁用             //新增       //修改 
        api:['queryTaskList','enableTask','disableTask','saveTask','updateTask'],
        thData:[
          {
            key:'id',
            label:"renwuID",
          },
          {
            key:'taskName',
            label:"任务名称",
          },
          {
            taskIntro:true,
            label:"任务简介",
            wd:200,
          },
          {
            key:'taskLink',
            label:"任务视频链接",
          },
          {
            taskImg:true,
            label:"任务图文介绍",
            wd:200,

          },
          {
            key:'jingdongCount',
            label:"任务推荐码",
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
            label:"状态",
            Tag:true,
          },
          {
            key:'status',
            fun:true,
            label:"启用/禁用",
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
