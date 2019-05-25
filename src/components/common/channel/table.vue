<template>
<div>
  <el-card class="tablelist">
    <section class="tabe_btn" v-if="tableData.tableBtn.length>0 ||tableData.tableBtn !=null">
      <el-button :type="item.type" @click="dialogVisible=true" :key="index"
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
                @click="handleEdit(scope.$index, scope.row,v.num)">{{v.name}}</el-button>
            </div>
            <div v-else>
              <span style="color: #409eff;cursor: pointer;" v-if="item.key=='id'" @click="lookUP(scope.$index,scope.row)">{{scope.row[item.key]}}</span>
              <span :title="scope.row[item.key]" v-else>{{scope.row[item.key] !==null ? scope.row[item.key] : 0}}</span>
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
  <el-dialog
    :visible.sync="dialogVisible"
    :before-close="beforeClose"
    width="50%">
    <span slot="title" class="dialog_tit">新增渠道管理</span>
    <channel-form  @chanel="closeDialog" ref="channelform"></channel-form>
  </el-dialog>
  <!-- 任务完成量 -->
  <el-dialog
    :visible.sync="taskDialogVisible"
    width="50%">
    <span slot="title" class="dialog_tit">任务完成量</span>
    <section style="margin-top:20px;">
      <el-table
        :data="taskList"
        border
        highlight-current-row
        tooltip-effect="dark"
        height="301px"
        :header-cell-style="{background:'#f7f7f7'}"
        style="width: 100%">
        <el-table-column
          prop="taskName"
          align="center"
          label="任务名称">
        </el-table-column>
        <el-table-column
          prop="taskCount"
          align="center"
          label="完成量">
        </el-table-column>
      </el-table>
    </section>
    <span slot="footer" class="dialog-footer">
      <el-button @click="taskDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="taskDialogVisible=false">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
  import bus from '../../../utils/bus'
  import channelForm from '../channel/channelForm'
  export default {
    name:'Table',
    data(){
      return{
        tableList:[],
        total:0,
        currentPage:1,
        pageSize: 10,
        dialogVisible:false,
        busData:{},
        taskDialogVisible:false,
        taskList:[],
      }
    },
    components:{
      channelForm
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
      bus.$on('updataCHN',data =>{
        this.currentPage =1,
        this.pageSize= 10,
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
        this.pageSize=val
        this.getTabList();
      },
      //跳转到第几页
      handleCurrentChange(val){
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
            this.params={}
          }else{
            this.$message.error(res.msg)
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
            // this.$message.success(res.data)
            // this.taskList = res.data.list;
            this.getTabList();

          }else{
            this.$message.error(res.msg)
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
              this.$message.error(res.msg)
            }
        }).catch((error) => {
            Promise.reject(error);
        })

      },
      //查看
      lookUP(index,row){
        this.taskDialogVisible = true;
        let data={id:row.id}
        this.$api[this.tableData.api[3]](data).then(res=>{
          if(res.code==1){
            this.taskList = res.data;
          }else{
            this.$message.error(res.msg)
          }
        }).catch((error) => {
          Promise.reject(error);
        })
      },
      //关闭弹窗
      beforeClose(done){
        done();
        this.$refs.channelform.reset();
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


