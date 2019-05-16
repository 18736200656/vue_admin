<template>
  <div class="filte_box">
    <div class="filter_top">
      <img src="../../../assets/icon_sousuo.png" alt="" class="sou_immg">
      筛选检查
    </div>
    <el-card class="search">
      <el-form :model="formData" ref="formData" lable-width="100px" :inline="true">
        <el-form-item label="渠道账号">
          <el-input v-model="formData.taskName" placeholder="请输入渠道账号" type="text" ></el-input>
        </el-form-item>
        <el-form-item label="提交任务开始时间">
          <el-date-picker
            v-model="formData.startTime"
            type="date"
            :picker-options="beginDateBefore"
            value-format="yyyyMMdd"
            placeholder="开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="提交任务结束时间" >
          <el-date-picker
            v-model="formData.endTime"
            type="date"
            :picker-options="beginDateAfter"
            value-format="yyyyMMdd"
          placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formData.status" placeholder="请选择状态">
            <el-option label="保存" value="1"></el-option>
            <el-option label="审核通过" value="2"></el-option>
            <el-option label="审核驳回" value="3"></el-option>
          </el-select>
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
          taskName:'', //		string	否	任务名称
          status:'', //		string	否	数据状态 1：保存 2：审核通过 3：审核驳回
          startTime:'', //		string	否	提交任务开始时间
          endTime:'', //		string	否	提交任务结束时间
        },
        beginDateBefore:{
          disabledDate:(item)=>{
            let beginDate = this.formData.endTime
            if(beginDate){
              return this.$valid.date(item.getTime()).split('-').join('') > beginDate
            }
        }
        },
        beginDateAfter:{
          disabledDate:(item)=>{
            let beginDate = this.formData.startTime
            if(beginDate){
              return this.$valid.date(item.getTime()).split('-').join('') < beginDate
            }
          }
        },
      }
    },
    methods:{
      submit(){
        bus.$emit('updataTKM',this.formData)
        this.formData={}
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
