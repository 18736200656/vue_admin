<template>
  <div class="home">
    <el-row>
      <el-col>
        <el-card>
          <el-form ref="goodsForm" :model="goodsForm" label-width="80px" size="mini">
            <el-form-item label="商品名称">
              <el-input v-model="goodsForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品标题">
              <el-input v-model="goodsForm.title"></el-input>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="goodsList">查询</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData.goods"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      height="250">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        fixed
        prop="goodsName"
        label="商品名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="goodsUrl"
        label="商品主图"
        width="120">
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
        width="300">
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
        prop="link"
        label="优惠券推广链接"
        width="120">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="添加"
        width="120">
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
    <div class="block">
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
</div>
</template>
<script>
import tableData from '../../utils/data.json'
export default {
  name:'Home',
  data(){
    return{
      goodsForm:{
        name:'',
        title:''
      },
      currentPage:1, //当前是第几页
      pageSize:20, //一页显示多少
      total:20, //总共
    }
  },
  created(){
    this.goodsList()
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
    }

  }
}
</script>
<style scoped>

</style>

