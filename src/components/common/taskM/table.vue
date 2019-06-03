<template>
  <div>
    <el-card class="tablelist">
      <section class="tabe_btn" v-if="tableData.tableBtn.length>0 ||tableData.tableBtn !=null">
        <el-button :type="item.type" @click="addClick(item.api)" :key="index"
                   v-for="(item,index) in tableData.tableBtn">{{item.name}}</el-button>
      </section>
      <section class="table_container">
        <el-table
          :class="tableData.type+'_table'"
          :data="tableList"
           stripe
          :header-cell-style="{background:'#f7f7f7'}"
          @selection-change="handleSelectionChange"
          height="600">
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
                <span v-if="item.key== 'updateTime' || item.key== 'createTime'">{{$valid.date(scope.row[item.key]) || '--'}}</span>
                <span v-else-if="item.key== 'status' ">{{$valid.examineStr(scope.row[item.key])}}</span>
                <span v-else>{{scope.row[item.key] !==null ? scope.row[item.key] : 0}}</span>
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
      <span slot="title" class="dialog_tit">新增任务数据</span>
      <taskform :taskFormData="taskFormData" @updateTask="closeDialog" ref="taskform"></taskform>
    </el-dialog>
     <el-dialog
      :visible.sync="checkdialogVisible"
      width="30%">
      <span slot="title" class="dialog_tit">审核状态</span>
      <div class="audit_box">
        <span @click="auditStatus=2" class="audit" :class="auditStatus==2 ? 'auditCheck' : ''">通过</span>
        <span @click="auditStatus=3" class="audit" :class="auditStatus==3 ? 'auditCheck' : ''">驳回</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="checkdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="auditSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import bus from '../../../utils/bus'
  import taskform from './taskform'
  export default {
    name:'Table',
    data(){
      return{
        tableList:[],
        total:0,
        currentPage: 1,
        pageSize: 10,
        dialogVisible:false,
        taskFormData:[],
        busData:{},
        baseUrl:process.env.NODE_BASE_URL,
        userList:[],
        taskList:[],
        checkdialogVisible:false,
        auditStatus:2,
        id:'',
      }
    },
    components:{
      taskform
    },
    props:{
      tableData:{
        type:Object,
        default:{}
      },
    },
    created(){
      this.getTabList();
      this.queryUserList(); //获取用户下拉列表
      this.querytaskList(); //	获取任务列表
      bus.$on('updataTKM',data =>{
        this.busData = data;
        this.currentPage= 1
        this.pageSize= 10
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
          }else{
            this.$message.error(res.msg)
          }
        }).catch((error) => {
          Promise.reject(error);
        })
      },
      //启用还是禁用  
      handleEdit(index,val,num){
        if(num=='1'){ //修改
           let params = {
            edit:true,
            data:{
              id:val.id,
              taskImg:val.taskImg
            },
          }
          this.taskFormData = params;
          this.dialogVisible = true;
        }else if(num=='2'){ //删除
          this.$confirm('确定真的删除？','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$api[this.tableData.api[num]]({id:val.id}).then(res=>{
              if(res.code==1){
              this.$message.success('删除成功')
              this.getTabList();
              }else{
                this.$message.error(res.msg)
              }
            }).catch((error) => {
              Promise.reject(error);
            })
          }).catch(()=>{
            this.$message({
              type: 'info',
              message: '取消删除'
            });
          });
        }else{ //审核 5
          this.checkdialogVisible = true
          this.id = val.id;
        }
      },
       //新增
      addClick(val){
        if(!val){
          this.dialogVisible=true
          this.taskFormData={
            edit:false,
            data:{
              taskImg:'',
              userList:this.userList,
              taskList:this.taskList
            },
          }
        }else{
          window.open(this.baseUrl+'exportTaskUser','_blank')
        }

      },
      //关闭弹窗
      closeDialog(data){
        this.dialogVisible = false;
        let num = data.type ? '1' : '4'; //1 修改 4 新增
        this.$api[this.tableData.api[num]](data).then(res=>{
          if (res.code ==1){
            this.$message.success('操作成功')
            this.getTabList();
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
        this.$refs.taskform.reset();
      },
      //获取用户的id
      queryUserList(){
         this.$api[this.tableData.api[6]]().then(res=>{
            if(res.code==1){
                res.data.forEach(val => {
                  this.userList.push({
                    "id": val.id,
                    "taobaoName": val.taobaoName
                 })
               });
               this.$message.success(res.data.message)
            }else{
              this.$message.error(res.msg)
            }
          }).catch((error) => {
            Promise.reject(error);
          })
      },
      //	获取任务列表
      querytaskList(){
         this.$api[this.tableData.api[7]]().then(res=>{
            if(res.code==1){
                res.data.forEach(val => {
                  this.taskList.push({
                    "id": val.id,
                    "taskName": val.taskName
                 })
               });
               this.$message.success(res.data.message)
            }else{
              this.$message.error(res.msg)
            }
          }).catch((error) => {
            Promise.reject(error);
          })
      },
      //提交申请
      auditSubmit(){
        this.$api[this.tableData.api[5]]({id:this.id,status:this.auditStatus}).then(res=>{
          if(res.code==1){
              this.checkdialogVisible = false
              this.getTabList()
              this.$message.success('操作成功')
          }else{
            this.$message.error(res.msg)
          }
        }).catch((error) => {
          Promise.reject(error);
        })
      }
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
  .audit_box{
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .audit{
    width: 30%;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    border: 1px solid #ddd;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
  }
  .auditCheck{
    border: 1px solid #409eff;
    color: #409eff;
  }
</style>


