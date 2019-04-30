<template>
  <div class="home">
      <el-card class="el_card_form">
        <el-form ref="goodsForm" :model="goodsForm" label-width="80px" size="mini" :inline="true" align="left">
          <el-form-item label="商品名称">
            <el-input v-model="goodsForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品标题">
            <el-input v-model="goodsForm.title"></el-input>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="goodsList">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    <div class="table_box">
      <el-card>
        <el-table
          ref="multipleTable"
          :data="tableData.goods"
          tooltip-effect="dark"
          style="width: 100%"
          height="500"
          :header-cell-style="{background:'#f7f7f7'}"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>  
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
         
          <el-table-column
            prop="goodsName"
            label="商品名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="goodsUrl"
            label="商品主图"
            width="120">
             <template slot-scope="scope">
              <img :src="scope.row.goodsUrl" class="goods_img"/>
            </template>  
          </el-table-column>
          <el-table-column
            prop="goodsPrice"
            label="商品价格"
            width="120">
          </el-table-column>
          <el-table-column
            prop="saleCounts"
            label="销售量"
            width="120">
          </el-table-column>
          <el-table-column
            prop="rate"
            label="佣金率"
            width="100">
          </el-table-column>
          <el-table-column
            prop="coupon"
            label="优惠券面值"
            width="120">
          </el-table-column>
          <el-table-column
            prop="date"
            label="优惠券结束日期"
            width="120">
          </el-table-column>
          <el-table-column
            label="优惠券推广链接"
            width="220">
            <template slot-scope="scope">
              <a :href="scope.row.link">{{scope.row.link}}</a>
            </template>  
          </el-table-column>
          <el-table-column
            fixed="right"
            prop="zip"
            label="添加"
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
          <el-table-column
            prop="rebateRadio"
            label="返利比例"
            width="120">
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
    
     <dialog-eidt :form-data="FormData" @updata="updata" :dialogVisible.sync="dialogVisible"> </dialog-eidt> 
</div>
</template>
<script>
import tableData from '../../utils/data.json'
import DialogEidt from '../common/dialogEdit'
export default {
  name:'Home',
  data(){
    return{
      goodsForm:{
        name:'',
        title:''
      },
      tableData:tableData,
      currentPage:1, //当前是第几页
      pageSize:20, //一页显示多少
      total:20, //总共
      FormData:{},
      dialogVisible:false,
    }
  },
  created(){
    // this.goodsList()
  },
  methods:{
    handleSelectionChange(val){
      console.log(val,'选中数据---')
    },
    handleSizeChange(val){
      console.log(val,'一页显示多少');
      this.pageSize=val
      this.goodsList();
    },
    handleCurrentChange(val){
      console.log(val,'当前页面是')
      this.currentPage = val;
      this.goodsList();
    },
    goodsList(){
      var data={
        name:'',
        title:'',
        pageSize:this.pageSize,
        currentPage:this.currentPage
      }
      this.$api.queryGoods(data).then(res=>{
        if(res.code==1){
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    //编辑
    handleEdit(index,row){
      console.log(index,row,'---删除的行')
      this.FormData = {key:index,data:row}
      this.dialogVisible = true
    },
    //删除
    handleDelete(index,row){
      this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.goods.splice(index,1)
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
    //更新
    updata(data){
      console.log(data,'====更想你的数据')
      this.tableData.goods[data.key]=data.data
    }
    
  },
  components:{
    DialogEidt
  }
}
</script>
<style scoped>
  .goods_img{
    width: 50px;
    height: 40px;
    vertical-align: middle;
    border-radius: 5px;
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
  }
</style>