<template>
  <div>
    <el-card class="tablelist">
      <section class="table_container">
        <el-table
          stripe
          :class="tableData.type+'_table'"
          :data="tableList"
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
    <el-dialog
      :visible.sync="dialogVisible"
      @before-close="beforeClose"
      width="50%">
      <span slot="title" class="dialog_tit">新增用户管理</span>
      <userform :userFormData="userFormData" @updatelist="closeUser" ref="formbox"></userform>
    </el-dialog>
    <!-- 发送消息 -->
    <el-dialog
      :visible.sync="MessageDialogVisible"
      width="30%">
      <span slot="title" class="dialog_tit">发送消息</span>
      <section style="margin-top:20px;">
        <el-form :model="MessageForm" ref="MessageForm" :rules="formRules" lable-width="100px" label-position="left">
          <el-form-item label="用户ID">
            <el-input v-model="MessageForm.userId" disabled type="text"></el-input>
          </el-form-item>
           <el-form-item label="消息" prop="noticeMsg">
            <el-input v-model="MessageForm.noticeMsg " placeholder="请输入发送的消息" type="textarea" ></el-input>
          </el-form-item>
           <el-form-item style="margin-top:20px;" align="right">
             <el-button @click="MessageDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitMessage">确 定</el-button>
          </el-form-item>
        </el-form>
      </section>
    </el-dialog>


  </div>
</template>
<script>
  import bus from '../../../utils/bus'
  import userform from './userform'
  export default {
    name:'Table',
    data(){
      return{
        tableList:[],
        total:0,
        currentPage: 0,
        pageSize: 10,
        dialogVisible:false,
        userFormData:[],
        busData:{},
        MessageDialogVisible:false,
        MessageForm:{
          userId:'',
          noticeMsg:'',
        },
        formRules:{
          noticeMsg:{required:true, message:'消息不能为空',trigger: 'blur'}, //	任务ID
        },
        type:'',
      }
    },
    components:{
      userform
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
      bus.$on('updataUSR',data =>{
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
      //新增
      addClick(){
        this.dialogVisible = true;
        let userData = {
          edit:false,
          data:{},
        }
        this.userFormData = userData;
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
           let userData = {
            edit:true,
            data:val,
          }
          this.userFormData = userData;
          this.dialogVisible = true;
        }else if(num=='2'){ //发送消息
          this.MessageForm.userId = val.id;
          this.MessageDialogVisible = true;
        }
      },
      //新增 编辑
      //关闭弹窗
      closeUser(data){
        console.log(data,'===table --[[[[[[]]]]]-form')
        this.dialogVisible = false;
        let num = data.type ? '1' : '2'; //1 修改 2 新增
        this.getList(data,num);
      },
      //更新状态
      getList(data,num){
        this.$api[this.tableData.api[num]](data).then(res=>{
          if (res.code ==1){
            this.$message.success(res.data)
            this.getTabList();
          }else{
            this.$message.error(res.msg)
          }
        }).catch((error) => {
          Promise.reject(error);
        })
      },
        //发送消息
      submitMessage(){
        this.$refs.MessageForm.validate(valid=>{
          if(valid){
            this.MessageDialogVisible = false
            this.$api[this.tableData.api[3]](this.MessageForm).then(res=>{
              if (res.code ==1){
                this.$message.success('发送成功')
                this.getTabList();
              }else{
                this.$message.error(res.msg)
              }
            }).catch((error) => {
              Promise.reject(error);
            })
          }else{
            return false
          }
        })
      },
      //关闭弹窗
      beforeClose(done){
        done();
        this.$refs.formbox.reset();
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
</style>


