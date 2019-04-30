<template>
<div class="tablelist">
  <section class="table_container">
     <el-table
      ref="multipleTable"
      :class="formData.type+'_table'"
      :data="tableList"
      highlight-current-row
      tooltip-effect="dark"
      :header-cell-style="{background:'#f7f7f7'}"
      @selection-change="handleSelectionChange"
      height="250">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        :prop="goodsName"
        label="商品名称"
        width="150">
      </el-table-column>
      <el-table-column
        v-for="(item,index) in tableData.thData"
        :key="index"
        :label="item.label"
        :align="'item.align || center'"
        :width=" item.wd || 'auto'">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row[item.key]}}</span>
          </div>
          <div v-if="item.handdle">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </div>
          <el-tag v-if="item.Tag" :type="item.status==1 ?'success':'info'">
            {{this.$valid.statusStr(scope.row[status])}}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <div class="b_pagation">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </section>
   <section class="table_container" v-show="dataList.length===0">
      <div class="tab_page">
          <span class="page_title l">搜索结果</span>
      </div>
      <div class="no_Data_box">
          <div style="margin:200px auto;">
              <div class="no_Data_title">暂无搜索结果</div>
          </div>
      </div>
  </section>
 </div>       
</template>
<script>
export default {
  name:'Table',
  data(){
    return{
      tableList:[],
      total:0,
      currentPage: 1,
      pageSize: 10,
    }
  },
  props:{
    tableData:{
      filterData:{

      }
    }
  },
  methods:{
    //选中
    handleSelectionChange(val){
      console.log(val,'选中数据---')
    },
    //一页显示
    handleSizeChange(val){
      console.log(val,'一页显示多少');
      this.pageSize=val
      this.goodsList();
    },
    //跳转到第几页
    handleCurrentChange(val){
      console.log(val,'当前页面是')
      this.currentPage = val;

    },
    //获取数据
    getTabList(){
      // searchData =['channelLoginName','channelName','inviteCode','status']
      let params ={
        ...this.tableData.filterData,
        currentPage :this.currentPage,
        pageSize:this.pageSize
      }
      this.$api[this.tableData.api](params).then(res=>{
        if(res.code==1){
          this.tableList = res.data;
        }else{
          this.$message.error(res.message)
        }
      }).catch((error) => {
        Promise.reject(error);
      })
    }
  }
}
</script>
<style>
  .b_pagation {
      margin-top: 10px;
      text-align: right;
  }
</style>

<!--<style lang="scss" scoped>
//     .table_container {
//             background: #fff;
//             box-sizing: border-box;
//             padding: 20px;
//             position: relative;
//             .b_pagation {
//                 margin-top: 10px;
//                 text-align: right;
//             }
//             .no_Data_box {
//                 margin-top: 45px;
//                 text-align: center;
//                 width: 100%;
//                 /*height: 100%;*/
//                 .no_Data_title {
//                     font-family: PingFangSC-Regular;
//                     font-size: 20px;
//                     color: #BBBBBB;
//                     margin-bottom: 16px;
//                 }
//             }
//         }

// </style>
