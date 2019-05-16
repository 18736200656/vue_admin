<template>
  <div class="dialog">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <v-form :form-data="FormData.data" :formSub="formSub"></v-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="summitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import vForm from './goods/goodsform'
export default {
  name:"Dialog",
  data(){
    return{
      formSub:false,
    }
  },
  props:['FormData','type','dialogVisible'],
  methods:{
    summitForm() {
      console.log('submit!');
      this.$emit('updata',this.FormData)
      this.dialogVisible = false
    }
  },
  components:{
    vForm
  },
  created(){
     console.log(this.dialogVisible,'===')
  },
  // watch:{
  //   dialogVisible:val=>{
  //     return val
  //     console.log(val,'===')
  //   }
  // }
}
</script>
<style scoped>

</style>

