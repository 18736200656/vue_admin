<template>
  <div>
    <el-card class="tablelist">
      <section class="tabe_btn">
        <el-button type="primary" @click="addClick">新增</el-button>
      </section>
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
            v-for="(item,index) in tableData.thData"
            :key="index"
            :label="item.label"
            :align="item.align || 'center'"
            show-overflow-tooltip
            :width=" item.wd || 'auto'">
            <template slot-scope="scope">
              <el-tag v-if="item.Tag" :type="scope.row[item.key]=='1' ?'':'info'">
              {{$valid.statusStr(scope.row[item.key])}}
              </el-tag>
              <div v-else-if="item.changeStatus">
                <el-button
                  size="mini"
                  v-for="(v,n) in item.chilren" :key="n" :type="v.type" v-if="scope.row[item.key] != v.num"
                  @click="changeStatus(scope.$index, scope.row,v.num)">{{v.name}}</el-button>
              </div>
              <div v-else-if="item.fun">
                <el-button
                  size="mini"
                  v-for="(v,n) in item.chilren" :key="n" :type="v.type"
                  @click="handleEdit(scope.$index, scope.row,v.num)">{{v.name}}</el-button>
              </div>
              <img :src="scope.row[item.key]" alt="" v-else-if="item.img" class="ad_img">
              <a :href="scope.row[item.key]" target="_blank" v-else-if="item.link" style="color:#409EFF;">{{scope.row[item.key]}}</a>
              <span :title="scope.row[item.key]" v-else>{{scope.row[item.key] !==null ? scope.row[item.key] : 0}}</span>
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
      <span slot="title" class="dialog_tit">{{edit ? '修改广告':'新增广告' }}</span>
      <form-box :FormData="FormData" @update="closeDialog" ref="formdata"></form-box>
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
        adTitle:'',
        edit:false,
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
    watch:{

    },
    created(){
      this.getTabList();
      bus.$on('updataADD',data=>{
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
            this.tableList = res.data;
            this.total = res.data.length;
          }else{
            this.$message.error(res.msg)
          }
        }).catch((error) => {
          Promise.reject(error);
        })
      },
      //修改
      handleEdit(index,row,num){
        if(num==1){
          this.edit = true
          this.dialogVisible = true;
          let data ={
            edit:true,
            data:row
          };
          this.FormData = data;
        }else{
          this.$confirm('是否删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //删除商品
            this.deleteAdvertising(row,num)

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },

      //删除
      deleteAdvertising(row,num){
         this.$api[this.tableData.api[num]](row).then(res=>{
          if (res.code ==1){
            this.getTabList();
            this.$message.success('删除成功')
          }else{
            this.$message.error(res.msg)
          }
        }).catch((error) => {
          Promise.reject(error);
        })
      },
       //新增
      addClick(){
        this.dialogVisible=true
        this.FormData={
          edit:false,
          data:{}
        }
        this.edit = false
      },
      //关闭弹窗
      closeDialog(data){
        console.log(data,'====,,,,')
        this.dialogVisible = false;
                         // 3 新增 1 修改
        let num = data.type ? '1' :'3'
        console.log(num,data.type,'---')
        this.$api[this.tableData.api[num]](data).then(res=>{
          if (res.code ==1){
            this.getTabList();
            this.$message.success(res.data.message)
          }else{
            this.$message.error(res.msg)
          }
        }).catch((error) => {
          Promise.reject(error);
        })


      },
      //启用禁用
      changeStatus(index,row,num){
        row = Object.assign(row,{status:num});
         this.$api[this.tableData.api[1]](row).then(res=>{
          if (res.code ==1){
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
        this.dialogVisible = false;
        this.$refs.formdata.reset();
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
  .ad_img{
    width: 50px;
    height: 40px;
    border-radius: 4px;
  }
</style>


