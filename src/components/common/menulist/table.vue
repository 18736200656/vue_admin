<template>
  <div>
    <el-card class="tablelist">
      <section class="tabe_btn" style="margin-bottom: 10px;overflow: hidden">
        <el-button type="primary" @click="addClick" >新增</el-button>
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
            :width=" item.wd || 'auto'">
            <template slot-scope="scope">
              <div v-if="item.fun">
                <el-button
                  size="mini"
                  v-for="(v,n) in item.chilren" :key="n" :type="v.type"
                  @click="handleEdit(scope.$index, scope.row)">{{v.name}}</el-button>
              </div>
              <img :src="scope.row[item.key]" alt="" v-else-if="item.imgShow" class="cate_img">
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
      <span slot="title" class="dialog_tit">新增商品分类</span>
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
      bus.$on('updataMENU',data=>{
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
        this.dialogVisible = true;
        let data ={
          edit:true,
          data:val
        };
        this.FormData = data;
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
                         // 2 新增 1 修改
        let num = data.type ? '1' :'2'
        console.log(num,data.type,'---')
        this.$api[this.tableData.api[num]](data).then(res=>{
          if (res.code ==1){
            this.getTabList();
            this.$message.success('新增成功')
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
  .cate_img{
    width: 50px;
    height: 40px;
    border-radius: 4px;
  }
</style>


