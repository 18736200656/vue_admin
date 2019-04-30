<template>
  <div class="dialog">
    <el-form ref="form" :model="FormData" label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="FormData.goodsName"></el-input>
      </el-form-item>
      <el-form-item label="商品主图">
        <el-input v-model="FormData.goodsUrl"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="FormData.goodsPrice"></el-input>
      </el-form-item>
      <el-form-item label="商品销量">
        <el-input v-model="FormData.saleCounts"></el-input>
      </el-form-item>
      <el-form-item label="佣金率">
        <el-input v-model="FormData.rate"></el-input>
      </el-form-item>
      <el-form-item label="优惠券面值">
        <el-input v-model="FormData.coupon"></el-input>
      </el-form-item>
      <el-form-item label="商品链接">
        <el-input v-model="FormData.link"></el-input>
      </el-form-item>
      <el-form-item label="返利">
        <el-input v-model="FormData.rebateRadio"></el-input>
      </el-form-item>
      <el-form-item label="优惠券结束日期">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="FormData.date" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>


      <el-form-item v-show="formSub">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name:"Dialog",
  data(){
    return{
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
    }
  },
  props:['formSub','FormData'],
  methods:{
    onSubmit() {
      console.log('submit!');
    }
  },
  created(){
    consoole.log(this.FormData,'----')
  }
}
</script>
<style scoped>

</style>

