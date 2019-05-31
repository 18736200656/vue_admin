<template>
  <div>
    <el-card class="tablelist">

      <section class="tabe_btn" v-if="tableData.tableBtn.length>0 ||tableData.tableBtn !=null">
        <div style="margin-top:10px;">
          <el-upload
            class="upload-demo"
            ref="uploadFile"
            action="/importUserPay"
            :before-upload="beforeUpload"
            :show-file-list='true'
            :http-request="uploadFile"
            :on-error="uploadFail">
            <!-- <i class="el-icon-upload"></i> -->
            <el-button size="small" type="success">导入</el-button>
            <!-- <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传.xlsx,.xls文件，且不超过500kb</div> -->
          </el-upload>
        </div>
      </section>
      <section class="table_container">
        <el-table
          stripe
          :class="tableData.type+'_table'"
          :data="tableList"
          :header-cell-style="{background:'#f7f7f7'}"
          @selection-change="handleSelectionChange"
          height="380">
          <el-table-column
            type="selection"
            align="center"
            width="55">
          </el-table-column>
          <!-- <el-table-column
            label="编号"
            type="index"
            align="center"
            width="50">
          </el-table-column> -->
          <el-table-column
            v-for="(item,index) in tableData.thData2"
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
        currentPage: 0,
        pageSize: 10,
        dialogVisible:false,
        FormData:[],
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
      }
    },
    watch:{

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
      uploadFile(item){      //2 导入
        console.log(item, '=====导入的东西===----');
        this.file = item.file.name
        this.$api[this.tableData.api[2]]({file:this.file}).then(res=>{
          if(res.code==1){
             this.getTabList();
          }else{
            this.$message.error(res.msg)
          }
        }).catch((error) => {
          Promise.reject(error);
        })

      },
      //上传错误
      uploadFail(err, file, fileList) {
        this.$message.error(err,file)
      },
      //限制
      beforeUpload(file){
        //上传前配置
        console.log(file,'-----')

        let excelfileExtend = ".xls.xlsx"//设置文件格式
        let fileExtend = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
        if (excelfileExtend.search(fileExtend) == -1) {
          this.$message.error('文件格式错误')
          return false
        }
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


