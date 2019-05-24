<template>
  <div>
    <el-card class="tablelist">
      <section class="tabe_btn" v-if="tableData.tableBtn.length>0 ||tableData.tableBtn !=null">
        <el-button :type="item.type" @click="addClick(item.api)" :key="index"
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
                <span v-if="item.key== 'updateTime' || item.key== 'createTime'">{{$valid.timeDate(scope.row[item.key]) || '--'}}</span>
                <span v-else>{{scope.row[item.key] !==null ? scope.row[item.key] : 0}}</span>
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
      @close="beforeClose"
      width="50%">
      <span slot="title" class="dialog_tit">新增任务数据</span>
      <form-box :FormData="FormData" @update="closeDialog" ref="formData"></form-box>
    </el-dialog>
  </div>
</template>
<script>
  import bus from '../../../utils/bus'
  import formBox from '../taskM/form'
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
        baseUrl:'http://47.97.152.146/',
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
            this.$message.error(res.msg)
          }
        }).catch((error) => {
          Promise.reject(error);
        })
      },
      //启用还是禁用
      handleEdit(index,val,num){
        if(num=='1'){ //修改
           let data = {
            edit:true,
            data:val,
          }
          this.FormData = data;
          this.dialogVisible = true;
        }else if(num=='2'){ //删除
          this.$api[this.tableData.api[num]]({id:val.id}).then(res=>{
            if(res.code==1){
             this.$message.success(res.data.message)
             this.getTabList()
            }else{
              this.$message.error(res.msg)
            }
          }).catch((error) => {
            Promise.reject(error);
          })
        }else{ //导出 3
          this.$api[this.tableData.api[num]](val).then(res=>{
            if(res.code==1){
               this.$message.success(res.data.message)
              //  window.location.href = res.data.xx
            }else{
              this.$message.error(res.msg)
            }
          }).catch((error) => {
            Promise.reject(error);
          })
        }
      },
       //新增
      addClick(val){
        if(!val){
          this.dialogVisible=true
        
        }else{
          //导出
          // let data = {
          //   taskName:'', //	string	否	任务名称
          //   userName:'', //		string	否	用户名称
          //   status:'', //		string	否	状态 1：保存 2：审核通过 3：审核驳回
          //   mobile:'', //		string	否	用户手机号
          //   startTime:'', //		string	否	提交任务开始时间
          //   endTime:'', //		string	否	提交任务结束时间
          // }
          console.log(this.baseUrl,'----ip地址')
          window.open(this.baseUrl+'exportTaskUser','_blank')

        }

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
       //关闭弹窗
      beforeClose(){
        this.dialogVisible = false;
        this.$refs.formData.reset();
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


