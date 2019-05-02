<template>
<div>
  <el-card class="tablelist">
    <section class="tabe_btn" v-if="tableData.tableBtn.length>0 ||tableData.tableBtn !=null">
      <el-button :type="item.type" @click="dialogVisible=true"
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
           label="编号"
           type="index"
           align="center"
           width="50">
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
              <!--<el-button type="success" size="mini"-->
                         <!--:disabled="scope.row[item.key] !='1'"-->
                <!--@click="handleEdit(scope.$index, scope.row,1)">启用</el-button>-->
              <!--<el-button type="danger" size="mini"-->
                         <!--:disabled="scope.row[item.key] !='2'"-->
                <!--@click="handleEdit(scope.$index, scope.row,2)">禁用</el-button>-->
              <el-button
                size="mini" :disabled="v.num == scope.row[item.key] "
                v-for="(v,n) in item.chilren" :key="n" :type="v.type"
                @click="handleEdit(scope.$index, scope.row,v.num)">{{v.name}}</el-button>
            </div>
            <div v-else="!item.Tag">
              <span>{{scope.row[item.key] !==null ? scope.row[item.key] : 0}}</span>
            </div>
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
    width="50%">
    <span slot="title" class="dialog_tit">新增渠道管理</span>
    <form-box :channelData="channelData" @update="closeDialog"></form-box>
  </el-dialog>
</div>
</template>
<script>
  import bus from '../../utils/bus'
  import formBox from '../common/formbox'
  export default {
    name:'Table',
    data(){
      return{
        tableList:[],
        total:0,
        currentPage: 1,
        pageSize: 10,
        dialogVisible:false,
        channelData:[],
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
      newData:{
        type:Array,
        default:()=>[]
      },
    },
    watch:{

    },
    created(){
      this.getTabList();
      this.channelData = this.newData;
      bus.$on('updataCHN',data =>{
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
            this.total = res.data.total
          }else{
            this.$message.error(res.message)
          }
        }).catch((error) => {
          Promise.reject(error);
        })
      },
      //启用还是禁用
      handleEdit(index,val,num){
        let data = {
          id:val.id,
          status:num
        }
        this.$api[this.tableData.api[1]](data).then(res=>{
          if(res.code==1){
            this.tableList = res.data.list;
            this.total = res.data.total
          }else{
            this.$message.error(res.message)
          }
        }).catch((error) => {
          Promise.reject(error);
        })
      },

      //关闭弹窗
      closeDialog(data){
        this.dialogVisible = false;
        this.$api[this.tableData.api[2]](data).then(res=>{
            if (res.code ==1){
              this.getTabList();
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


