<template>
  <div>
    <el-card class="tablelist">
      <section class="tabe_btn" v-if="tableData.tableBtn.length>0 ||tableData.tableBtn !=null">
        <el-button :type="item.type" @click="exportFile" :key="index"
                   v-for="(item,index) in tableData.tableBtn">{{item.name}}</el-button>
      </section>
      <section class="table_container">
        <el-table
          stripe
          :class="tableData.type+'_table'"
          :data="tableList"
          :header-cell-style="{background:'#f7f7f7'}"
          @selection-change="handleSelectionChange"
          height="500">
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
            show-overflow-tooltip
            :width=" item.wd || 'auto'">
            <template slot-scope="scope">
              <div v-if="item.fun">
                <el-button
                  size="mini" v-if="scope.row[item.key] != v.num"
                  v-for="(v,n) in item.chilren" :key="n" :type="v.type"
                  @click="handleEdit(scope.$index, scope.row,v.num)">{{v.name}}</el-button>
              </div>
              <div v-else>
                <span>{{scope.row[item.key] !==null ? scope.row[item.key] : 0}}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="b_pagation">
          <el-pagination
            background
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
    <!-- <el-dialog
      :visible.sync="dialogVisible"
      width="50%">
      <span slot="title" class="dialog_tit">新增渠道管理</span>
      <form-box :FormData="FormData" @update="closeDialog"></form-box>
    </el-dialog> -->

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
        FormData:[],
        busData:{},
        baseUrl:process.env.NODE_BASE_URL,
      }
    },
    components:{
      formBox
    },
    props:{
      tableData:{
        type:Object,
        default:{}
      }
    },
    watch:{

    },
    created(){
      this.getTabList();
      bus.$on('updataCASH',data =>{
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
            this.$message.error(res.msg)
          }
        }).catch((error) => {
          Promise.reject(error);
        })
      },
      //修改 //发送消息
      handleEdit(index,val,num){
        if(num=='1'){ //  修改
           let data = {
            edit:true,
            data:val,
          }
          this.FormData = data;
          this.dialogVisible = true;
        }else if(num=='2'){ //发送消息
          this.MessageForm.userId = val.id;
          this.MessageDialogVisible = true;
        }
      },
       //导出
      exportFile(){
          delete this.busData.currentPage;
          delete this.busData.pageSize;
          var str='?';
          if(this.busData=='null'){
            //window.open(this.baseUrl+'exportTaskUser')
            window.location.href=this.baseUrl+'exportUserWithdraw';
          }else{
            Object.keys(this.busData).map(val=>{
              str+=val +'='+ this.busData[val]+'&'
            })
            str = str.substring(0, str.lastIndexOf('&'));
            window.location.href=this.baseUrl+'exportUserWithdraw' + str;
          }
           // window.location.href=this.baseUrl+'exportTaskUser'+str;
        //window.open(this.baseUrl+'exportUserWithdraw','_blank')
        
      },
      //关闭弹窗
      closeDialog(data){
        this.dialogVisible = false;
        let num = data.type ? '1' : '4'; //1 修改 4 新增
        this.$api[this.tableData.api[num]](data).then(res=>{
          if (res.code ==1){
            this.$message.success(res.data.message)
            this.getTabList();
          }else{
            this.$message.error(res.msg)
          }
        }).catch((error) => {
          Promise.reject(error);
        })
      },
    },

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


