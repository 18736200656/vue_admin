<template>
  <div class="filte_box">
    <div class="filter_top">
      <img src="../../../assets/icon_sousuo.png" alt="" class="sou_immg">
      筛选检查
    </div>
    <el-card class="search">
      <el-form :model="formData" ref="formData" lable-width="100px" :inline="true">
        <el-form-item label="用户名" >
          <el-input v-model="formData.userName" placeholder="请输入用户名" type="text" ></el-input>
        </el-form-item>
        <el-form-item label="状态" >
          <el-select v-model="formData.status" placeholder="请选择支付状态" type="text">
            <el-option label="未支付" value="1"></el-option>
            <el-option label="已支付" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提现账号" >
          <el-input v-model="formData.withdrawAccount" placeholder="请输入提现账号" type="text" ></el-input>
        </el-form-item>
         <el-form-item label="提现时间">
            <el-date-picker
              type="date"
              v-model="formData.startTime"
              :picker-options="beginDateBefore"
              value-format="yyyyMMdd"
              placeholder="开始日期">
            </el-date-picker>
              至
            <el-date-picker
              type="date"
              v-model="formData.endTime"
              :picker-options="beginDateBefore"
              value-format="yyyyMMdd"
              placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        <el-form-item align="right">
          <el-button type="primary" @click="submit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  import bus from '../../../utils/bus'
  export default {
    components: {},
    name: 'search',
    data() {
      return {
        formData:{
          userName:'', //			string	否	用户名
          status:'', //			string	否	状态1:未支付 2:已支付
          withdrawAccount:'', //			string	否	提现账号
          startTime:'', //			string	否	提现开始时间
          endTime:'', //			string	否	提现结束时间
        },
        beginDateBefore:{
          disabledDate:(item)=>{
            let beginDate = this.formData.endTime
            if(beginDate){
              return this.$format.date(item.getTime()).split('-').join('') > beginDate
            }
          }
        },
        beginDateAfter:{
          disabledDate:(item)=>{
            let beginDate = this.formData.startTime
            if(beginDate){
              return this.$format.date(item.getTime()).split('-').join('') < beginDate
            }
          }
        },

      }
    },
    methods:{
      submit(){
        bus.$emit('updataCASH',this.formData)
      }
    }
  }
</script>
<style lang="less" scoped>
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
  .el_card_form .el-card__body{
    padding-bottom: 0 !important;
  }
</style>
