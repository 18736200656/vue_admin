<template>
<div>
  <el-card class="tablelist">
    <section class="tabe_btn" v-if="tableData.tableBtn.length>0 ||tableData.tableBtn !=null">
      <el-button :type="item.type" @click="addClick" :key="index"
                 v-for="(item,index) in tableData.tableBtn">{{item.name}}</el-button>
    </section>
    <section class="table_container">
       <el-table
        ref="multipleTable"
        :class="tableData.type+'_table'"
        :data="tableList"
        highlight-current-row
        tooltip-effect="dark"
        :header-cell-style="{background:'#f7f7f7'}"
        @selection-change="handleSelectionChange"
        height="380">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          v-for="(item,index) in tableData.thData"
          :key="index"
          :label="item.label"
          :align="item.align || 'center'"
          :width=" item.wd || 'auto'">
          <template slot-scope="scope">
            <el-tag v-if="item.Tag" :type="scope.row[item.key]=='1' ?'':'info'">
              {{$valid.statusStr(scope.row[item.key])}}
            </el-tag>
            <div v-else-if="item.fun">
              <el-button
                size="mini" v-if="scope.row[item.key] != v.num"
                v-for="(v,n) in item.chilren" :key="n" :type="v.type"
                @click="changeSatus(scope.$index, scope.row,v.num)">{{v.name}}</el-button>
            </div>
            <div v-else-if="item.taskIntro">
              <div>1:{{scope.row.oneText}}</div>
              <div>2:{{scope.row.twoText}}</div>
              <div>3:{{scope.row.thirdText}}</div>
       
              <!-- <span v-for="v in item.chiildren" :key="v.name">{{v.name}}:{{scope.row[v._key]}}</span> -->
            </div>
             <div v-else-if="item.taskImg">
               <div>第一步: <a :href="scope.row.oneImg">{{scope.row.oneImg}}</a> </div>
               <div>第二步: <a :href="scope.row.twoImg">{{scope.row.twoImg}}</a> </div>
               <div>第三步: <a :href="scope.row.thirdImg">{{scope.row.thirdImg}}</a> </div>
                <!-- <span v-for="v in item.chiildren" :key="v.name">{{v.name}}:{{scope.row[v._key]}}</span> -->
            </div>
            <div v-else>
              <span :title="scope.row[item.key]">{{scope.row[item.key] !==null ? scope.row[item.key] : 0}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
           label="操作"
           align="center"
           width="100">
           <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
  </el-card>
  <el-dialog
    :visible.sync="dialogVisible"
    @close="beforeClose"
    width="50%">
    <span slot="title" class="dialog_tit">新增渠道管理</span>
    <form-box :FormData="FormData" @update="closeDialog" ref="formData"></form-box>
  </el-dialog>
</div>
</template>
<script>
  import bus from '../../../utils/bus'
  import formBox from './form'
  export default {
    name:'Table',
    data(){
      return{
        tableList:[],
        total:0,
        currentPage: 1,
        pageSize: 10,
        dialogVisible:false,
        FormData:{},
        busData:{},
      }
    },
    components:{
      formBox
    },
    props:{
      tableData:{
        type:Object,
        default:{}
      },
    },
    created(){
      this.getTabList();
      bus.$on('updataTASKD',data =>{
        this.busData = data;
        this.getTabList();
      })
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
        this.getTabList();
      },
      //跳转到第几页
      handleCurrentChange(val){
        console.log(val,'当前页面是')
        this.currentPage = val;
        this.getTabList();
      },
      //获取数据
      getTabList(){
        let params =Object.assign(this.busData,{
          currentPage :this.currentPage,
          pageSize:this.pageSize
        });
        this.$api[this.tableData.api[0]](params).then(res=>{
          if(res.code==1){
            this.tableList = res.data.list;
            this.total = res.data.total;
          }else{
            this.$message.error(res.msg)
          }
        }).catch((error) => {
          Promise.reject(error);
        })
      },
      //修改
      handleEdit(index,val){
        let data = {
          edit:true,
          data:val,
        }
        this.FormData = data;
        this.dialogVisible = true;
      },
      //新增
      addClick(){
        this.dialogVisible=true
        this.FormData={
          edit:false,
          data:{}
        }
      },

      //关闭弹窗
      closeDialog(data){
        this.dialogVisible = false;
        let num = data.type=='true' ? '4' : '3'; //4修改 3 新增
        if(data.type){ //修改
          this.$api[this.tableData.api[num]](data).then(res=>{
            if (res.code ==1){
              this.getTabList();
            }else{
              this.$message.error(res.msg)
            }
          }).catch((error) => {
              Promise.reject(error);
          })
        }
      },
      //改变状态
      changeSatus(index,row,val){
        let num = val=='1' ? '1' :'2'
        let params = {
          id:row.id
        };
        this.$api[this.tableData.api[num]](params).then(res=>{
          if(res.code==1){
            this.getTabList();
          }else{
            this.$message.error(res.msg)
          }
        }).catch((error) => {
          Promise.reject(error);
        })
      },
       //关闭弹窗
      beforeClose(){
        this.dialogVisible = false;
        this.$refs.formData.reset();
      }
      
    }
  }
</script>
<style>
  .dialog_tit{
    position: absolute;
    left:0;
    top: 0;
    width: 100%;
    height: 60px;
    font-size:18px;
    box-sizing: border-box;
    background: #efefef;
    padding-left:20px;
    line-height: 60px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .tabe_btn{
    margin-bottom: 10px;
  }
  .tablelist{
    margin-top:20px;
  }
  .b_pagation {
      margin-top: 10px;
      text-align: right;
      margin-bottom: 10px;
  }
  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 60px;
  }
</style>


