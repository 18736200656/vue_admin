<template>
  <div class="searchbox">
    <el-card :class="searchData.type+'_search_box'">
      <el-form :inline="true" :model="formData" align="left">
        <el-form-item :label="item.label" v-for="(item,index) in searchData.filterData"
                      :key="index" label-width="80px">
          <el-input v-model="item[key]" :placeholder="item.placeholder" type="text" v-if="!item.elSelct"></el-input>
          <el-select v-model="item[key]" placeholder="请选择状态" v-if="item.elSelct">
            <el-option :label="$valid.statusStr(v)" :value="v" v-for='(v,n) in item.status' :key="n"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item>
          <el-button type="primary" size="mini" @click="querySub">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card >
  </div>
</template>
<script>
// import bus from '../../utils/bus'
export default {
  data(){
    return{
      formData:{
//        channelLoginName:'', //	渠道账号
//        channelName:'',	//渠道名称
//        inviteCode:'',	//	邀请码
//        status:'',		//状态
      },
    }
  },
  props:{
    searchData:{
      type:Object,
      default:{}
    },
  },
  methods:{
    querySub(){
      console.log(this.formData,'====searchBox-------formData---')
      this.$emit('updata',this.formData)
    }
  },
  created(){

  },
  watch:{
    formData:{
      handdle(val){
        console.log(val)
        return val
      },
      deep:true
    }
  }
}
</script>

<style>
  .el-card__body{
    padding-bottom: 0;
  }
</style>
