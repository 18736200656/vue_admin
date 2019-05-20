<template>
  <div class="problems">
    <search-box></search-box>
    <table-box :tableData="tableData"></table-box>
  </div>
</template>
<script>
import searchBox from '../common/problems/problemssearch'
import tableBox from '../common/problems/problemstable'
export default {
  name:'problems',
  data(){
    return{
      tableData:{
        type:'problems',
        tableBtn:[
          {
            api:false,
            type:'primary',
            name:'新增'
          },
          {
            api:true,
            type:'primary',
            name:'修改'
          },
        ],
                //接口名字方法      
        api:['queryUserProblemsList','saveUserProblems','updateUserProblems','deleteUserProblems'],
        thData:[
          {
            key:'title',
            label:"问题",
          },
          {
            key:'answer',
            label:"答案",
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
            fun:true,
            label:"操作",
            wd:250,
            chilren:[
              {
                num: '1',
                type: 'primary',
                name: '删除'
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
