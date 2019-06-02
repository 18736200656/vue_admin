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
            <el-input v-model="goodsForm.goodsId" clearable></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="goodsForm.goodsName" clearable></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-input v-model="goodsForm.goodsLevel" clearable></el-input>
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
           <!--
          <el-form-item >
            <el-button type="danger" @click="deleteGoods">删除</el-button>
          </el-form-item>
          -->
          <el-form-item >
            <el-button type="success" @click="FiledialogVisible = true" >导入</el-button>
          </el-form-item>
        </el-form>
        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          height="600"
          :header-cell-style="{background:'#f7f7f7'}"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="商品编号"
            prop="goodsId"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="goodsName"
            label="商品名称"
            align="center"
            show-overflow-tooltip
            width="150">
          </el-table-column>
          <el-table-column
            label="商品主图"
            show-overflow-tooltip
            align="center"
            width="150">
            <template slot-scope="scope">
              <span>{{scope.row.goodsUrl || "--"}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商品详情页地址"
            show-overflow-tooltip
            align="center"
            width="150">
            <template slot-scope="scope">
              <span>{{scope.row.goodsItemUrl || "--"}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="商品分类"
            align="center"
            width="200">
            <template slot-scope="scope">
              <span>{{scope.row.goodsLevel || "--"}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            label="商品价格"
            align="right"
            width="120">
          </el-table-column>
          <el-table-column
            prop="goodsSales"
            label="月销量"
            align="right"
            width="120">
          </el-table-column>
          <el-table-column
            prop="rate"
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
            prop="sellId"
            label="卖家ID"
            align="right"
            width="100">
          </el-table-column>
          <el-table-column
            prop="sellStoreName"
            label="店铺名称"
            align="right"
            width="150">
          </el-table-column>
          <el-table-column
            prop="platform"
            label="平台"
            align="right"
            width="100">
          </el-table-column>
          <el-table-column
            prop="couponCount"
            label="优惠券数量"
            align="right"
            width="100">
          </el-table-column>
          <el-table-column
            prop="couponLeftCoupon"
            label="优惠券剩余数量"
            align="right"
            width="150">
          </el-table-column>
          <el-table-column
            prop="couponValue"
            label="优惠券面额"
            align="right"
            width="150">
          </el-table-column>
          <el-table-column
            prop="couponStartTime"
            label="优惠券开始时间"
            align="right"
            width="120">
          </el-table-column>
          <el-table-column
            prop="couponEndTime"
            label="优惠券结束日期"
            align="center"
            width="120">
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
      :before-close="beforeClose"
      width="40%">
      <span slot="title" class="dialog-header">
        {{'商品信息'}}
      </span>
      <goods-form @update="closeDialog" :formdata="formdata" ref="goodsform"></goods-form>
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
            :action="action"
            :before-upload="beforeUpload"
            :show-file-list='true'
            :on-success="uploadSuccess"
            :on-error="uploadFail">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传.xlsx,.xls文件</div>
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
        goodsId: '',
        goodsName: '',
        goodsLevel: '',
      },
      tableData:[],
      currentPage: 1, //当前是第几页
      pageSize: 20, //一页显示多少
      total: 0, //总共
      dialogVisible: false,
      id: 0,
      formdata:{}, //修改的东西
      selectDatas:[],  // 选则的商品
      FiledialogVisible:false,
      file:'', //导入的文件
      action:process.env.NODE_BASE_URL+'goods/importGoods',  //上传文件路径
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
      this.selectDatas = val
    },
    handleSizeChange(val){
      this.pageSize=val
      this.queryGoodsList()
    },
    handleCurrentChange(val){
      this.currentPage = val;
      this.queryGoodsList()
    },

     //新增
    addClick(){
      this.dialogVisible=true;
      this.formdata={
        edit:false,
        data:{}
      }
    },
    //编辑
    handleEdit(index,row){
      this.dialogVisible = true;
      this.formdata = {
        edit:true,
        data:row
      };
      
    },
    //单个删除
    handleDelete(index,row){
      this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //删除商品
          this.$api.delGoods({id:row.id}).then(res=>{
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
      console.log(params,'-----')
                          //  1修改      2新增
      let api = params.type ? 'editGoods' : 'addGoods';
      this.$api[api](params).then(res=>{
        if(res.code==1){
          this.$message.success("操作成功!");
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
          this.tableData = res.data;
          this.total =  res.data.total;
          this.goodsForm={}
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
          this.$message.error(res.message)
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
    },
    //上传成功
    uploadSuccess(res,file){
      if(res.code==1){
        this.$message.success('上传成功')
        this.queryGoodsList();
      }
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
    },
     //关闭弹窗
    beforeClose(done){
      done();
      this.$refs.goodsform.reset();
    }

  },
  components:{
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
</style>
