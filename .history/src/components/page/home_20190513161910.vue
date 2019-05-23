<template>
  <div class="home">
    <div class="filte_box">
      <div class="filter_top">
        <img src="../../assets/icon_sousuo.png" alt="" class="sou_immg">
        筛选检查
      </div>
      <el-scrollbar>
      <el-card class="el_card_form">
        <el-form ref="goodsForm" :model="goodsForm" label-width="80px" :inline="true" align="left">
          <el-form-item label="商品编号">
            <el-input v-model="goodsForm.order"></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="goodsForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
             <el-select v-model="goodsForm.level1" placeholder="请选择商品分类" @change="queryGoods">
              <el-option :label="item.name" :value="item.level" v-for="(item,index) in goods1List" :key="index"></el-option>
            </el-select>
            <el-select v-model="goodsForm.level2"
                       :disabled="goods2List.length==0 || goods2List==null"
                       @change="query2Goods" placeholder="请选择商品分类2">
              <el-option :label="item.name" :value="item.level" v-for="(item,index) in goods2List" :key="index"></el-option>
            </el-select>
            <el-select v-model="goodsForm.level3"
                       :disabled="goods3List.length==0 || goods3List==null"
                       placeholder="请选择商品分类3">
              <el-option :label="item.name" :value="item.level" v-for="(item,index) in goods3List" :key="index" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="queryGoodsList">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      </el-scrollbar>
    </div>
    <div class="table_box">
      <el-card>
        <el-form :inline="true">
           <el-form-item >
             <el-button type="primary" @click="addClick">添加</el-button>
           </el-form-item>
          <el-form-item >
            <el-button type="danger" @click="deleteGoods">删除</el-button>
          </el-form-item>
          <el-form-item >
            <el-button type="success" @click="FiledialogVisible = true" >导入</el-button>
          </el-form-item>
        </el-form>
        <el-table
          ref="multipleTable"
          :data="tableData"
          style="width: 100%"
          height="500"
          :header-cell-style="{background:'#f7f7f7'}"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="编号"
            prop="id"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="商品名称"
            align="center"
            show-overflow-tooltip
            width="150">
          </el-table-column>
          <el-table-column
            label="商品标题"
            show-overflow-tooltip
            align="center"
            width="150">
            <template slot-scope="scope">
              <span>{{scope.row.title || "--"}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商品内容"
            show-overflow-tooltip
            align="center"
            width="150">
            <template slot-scope="scope">
              <span>{{scope.row.content || "--"}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商品图片"
            align="center"
            width="120">
             <template slot-scope="scope">
              <img :src="scope.row.img" class="goods_img"/>
            </template>
          </el-table-column>
          <el-table-column
            label="商品分类"
            align="center"
            width="150">
            <template slot-scope="scope">
              <!-- <table border="1" cellspacing="0" cellpadding="0">
                <tr>
                  <td>商品等级一级分类：</td>
                  <td>{{scope.row.levelOne}}</td>
                </tr>
                <tr>
                  <td>商品等级二级分类：</td>
                  <td>{{scope.row.levelTwo || ''}}</td>
                </tr>
                <tr>
                  <td>商品等级三级分类：</td>
                  <td>{{scope.row.levelThree}}</td>
                </tr>
              </table> -->
              <div>商品等级一级分类：{{scope.row.levelOne}}</div>
              <div>商品等级二级分类：{{scope.row.levelTwo}}</div>
              <div>商品等级三级分类：{{scope.row.levelThree}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            label="商品价格"
            align="right"
            width="120">
          </el-table-column>
          <el-table-column
            prop="monSalesVolume"
            label="月销量"
            align="right"
            width="120">
          </el-table-column>
          <el-table-column
            prop="incomeProportion"
            label="收入比例"
            align="right"
            width="120">
          </el-table-column>
          <el-table-column
            prop="commission"
            label="佣金"
            align="right"
            width="100">
          </el-table-column>
          <el-table-column
            prop="rebate"
            label="返利比例"
            align="right"
            width="120">
          </el-table-column>
          <el-table-column
            prop="date"
            label="优惠券结束日期"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            label="优惠券推广链接"
            show-overflow-tooltip
            align="center"
            width="220">
            <template slot-scope="scope">
              <a :href="scope.row.url">{{scope.row.url}}</a>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>
        <div class="page_block">
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
      </el-card>
    </div>
    <!-- 商品弹出 -->
     <el-dialog
      :visible.sync="dialogVisible"
      width="40%">
      <span slot="title" class="dialog-header">
        {{'商品信息'}}
      </span>
      <goods-form @update="closeDialog" :formdata="formdata"></goods-form>
    </el-dialog>
    <!-- 导入xlsx -->
     <el-dialog
      :visible.sync="FiledialogVisible"
      width="30%">
      <span slot="title" class="dialog_tit">导入文件</span>
        <el-card>
          <el-upload
            class="upload-demo"
            ref="uploadFile"
            drag
            action="/goods/importGoods"
            :before-upload="beforeUpload"
            :show-file-list='true'
            :http-request="uploadFile"
            :on-error="uploadFail">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传.xlsx,.xls文件，且不超过500kb</div>
          </el-upload>
        </el-card>
       <span slot="footer" class="dialog-footer">
        <el-button @click="FiledialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>
<script>
import goodsForm from '../common/goods/goodsform'
export default {
  name:'Home',
  data(){
    return {
      goodsForm: {
        name: '',
        title: '',
        level1: '',
        level2: '',
        level3: '',
      },
      tableData:[],
      currentPage: 1, //当前是第几页
      pageSize: 20, //一页显示多少
      total: 0, //总共
      dialogVisible: false,
      id: 0,
      goods1List: [],
      goods2List: [],
      goods3List: [],
      formdata:{}, //修改的东西
      selectDatas:[],  // 选则的商品
      FiledialogVisible:false,
      file:'', //导入的文件
    };
  },
  created(){


  },
  mounted(){
    this.queryGoodsCategory(); //查询的商品分类
    this.queryGoodsList(); //列表
  },
  methods:{
    handleSelectionChange(val){
      console.log(val,'选中数据---')
      this.selectDatas = val
    },
    handleSizeChange(val){
      console.log(val,'一页显示多少');
      this.pageSize=val
      this.queryGoodsList()
    },
    handleCurrentChange(val){
      console.log(val,'当前页面是')
      this.currentPage = val;
      this.queryGoodsList()
    },

     //新增
    addClick(){
      this.dialogVisible=true
      this.formdata={
        edit:false,
        data:{}
      }
    },
    //编辑
    handleEdit(index,row){
      let data = {
        edit:true,
        data:row
      };
      this.formdata=data;
      this.dialogVisible = true
    },
    //单个删除
    handleDelete(index,row){
      this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //删除商品
          this.$api.delGoods({ids:row.id}).then(res=>{
            if(res.code==1){
              this.queryGoodsList()
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else{
              this.$message.error(res.msg)
            }
          }).catch(error=>{
            return Promise.reject(error)
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    //选择删除
    deleteGoods(){
      var dataDelets = this.selectDatas;
      var ids=[];
      if (dataDelets.length>0){
        dataDelets.forEach(val=>{
          ids.push(val.id)
        })
      }else{
        this.$message.info('请选择删除的商品');
        return
      };
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        //删除商品
        this.$api.delGoods({ids}).then(res=>{
          if(res.code==1){
            console.log(res.data)
            this.queryGoodsList()
          }else{
            this.$message.error(res.msg)
          }
        }).catch(error=>{
          return Promise.reject(error)
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 关闭弹窗
    closeDialog(params){
      this.dialogVisible=false;
      console.log(params.type,'-----')
                          //  1修改      2新增
      let api = params.type=='true' ? 'editGoods' : 'addGoods'
      this.$api[api](params).then(res=>{
        if(res.code==1){
          this.$message.success(res.data);
          this.queryGoodsList()
        }else{
          this.$message.error(res.msg)
        }
      }).catch(error=>{
        return Promise.reject(error)
      })
    },
    //商品列表
    queryGoodsList(){
      let data =Object.assign(this.goodsForm,{
        currentPage:this.currentPage , //当前是第几页
        pageSize:this.pageSize //一页显示多少
      })
      this.$api.queryGoods(data).then(res=>{
        if(res.code==1){
          this.tableData = res.data.list;
          this.total =  res.data.total;
        }else{
          this.$message.error(res.msg)
        }
      }).catch(error=>{
        return Promise.reject(error)
      })
    },

    //商品分类查询
    queryGoodsCategory(evel,parentId,cb){
      //一级分类
      let data ={
        evel:evel || 1, //	int	否	分类级别
        parentId:parentId ||''	 //long	否	上级分类ID
      }
      this.$api.queryGoodsCategory(data).then(res=>{
        if (res.code ==1){
          if(!evel && !parentId){
            this.goods1List = res.data
          }else{
            cb && cb(res.data)
          }
        }else{
          this.$message.error(res.msg)
        }
      }).catch(error=>{
        this.$message.error(res.messag)
        return Promise.reject(error)
      })
    },
    queryGoods(e){
      console.log(e,'选中数据---1')
       var that = this;
       this.queryGoodsCategory(e, 1,result =>{
         that.goods2List = result
       });
    },
    query2Goods(val){
      console.log(val,'选中数据---2')
      var that = this;
      this.queryGoodsCategory(val, 2,result =>{
        that.goods3List = result
      });
    },
    //导入确定按钮
    submitUpload(){
      this.FiledialogVisible = false;
      this.$api.importGoods({file:this.file}).then(res=>{
        if (res.code ==1){
          this.queryGoodsList();
          this.$message.success(res.data.message)
        }else{
          this.$message.error(res.msg)
        }
      }).catch((error) => {
        Promise.reject(error);
      })

    },
    uploadFile(item){      //4 导入
      console.log(item, '=====导入的东西===----');
      this.file = item.file.name
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
  components:{
//    DialogEidt,
    goodsForm
  }
}
</script>
<style>
  .home{
    position: relative;
  }
  .filter_box{
    margin-top: 30px;
  }
  .filter_top{
    height: 80px;
    background:#e5e5e5 ;
    font-size: 24px;
    color: #333;
    line-height: 80px;
  }
  .sou_immg{
    margin-left: 15px;
    vertical-align: middle;
    margin-right: 15px;
  }
  .goods_img{
    width: 50px;
    height: 40px;
    vertical-align: middle;
    border-radius: 5px;
  }
  .dialog-header{
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    width: 100%;
    height: 60px;
    background: #eee;
    font-size: 18px;
    color: #2f71a9;
    line-height: 60px;
    padding-left: 20px;
    box-sizing: border-box;
  }
</style>
<style>
  .el-table__header tr,
    .el-table__header th {
      padding: 0;
      height: 60px;
  }
  .el_card_form .el-card__body{
    padding-bottom:0;
  }
  .table_box{
    margin-top: 20px;
  }
  .page_block{
    margin-top: 20px;
    text-align: right;
    margin-bottom: 20px;
  }
  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 60px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
