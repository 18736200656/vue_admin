<template>
  <el-card>
    <el-form ref="form" :model="FormData" label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="FormData.name"></el-input>
      </el-form-item>
      <el-form-item label="商品标题">
        <el-input v-model="FormData.title"></el-input>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="FormData.content"></el-input>
      </el-form-item>
      <el-form-item label="海景图片组">
        <el-input v-model="FormData.seascapes"></el-input>
      </el-form-item>
      <el-form-item label="商品搜索名称">
        <el-input v-model="FormData.searchName"></el-input>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          ref="upload"
          :on-preview="handlePictureCardPreview"
          :before-upload="beforeAvatarUpload">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="FormData.img" alt="" class="uploadImg">
        </el-dialog>
        <!--<el-input v-model="FormData.goodsUrl"></el-input>-->
      </el-form-item>
      <el-form-item label="商品图片详情">
        <el-input v-model="FormData.imgList"></el-input>
      </el-form-item>
      <el-form-item label="商品分类一级">
        <el-input v-model="FormData.levelOne"></el-input>
      </el-form-item>
      <el-form-item label="商品分类二级">
        <el-input v-model="FormData.levelTwo"></el-input>
      </el-form-item>
      <el-form-item label="商品分类三级">
        <el-input v-model="FormData.levelThree"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="FormData.price"></el-input>
      </el-form-item>
      <el-form-item label="商品销量">
        <el-input v-model="FormData.monSalesVolume"></el-input>
      </el-form-item>
      <el-form-item label="收入比例">
        <el-input v-model="FormData.incomeProportion"></el-input>
      </el-form-item>
      <el-form-item label="佣金">
        <el-input v-model="FormData.commission"></el-input>
      </el-form-item>
      <el-form-item label="优惠券ID">
        <el-input v-model="FormData.couponId"></el-input>
      </el-form-item>
      <el-form-item label="商品优惠卷推广链接">
        <el-input v-model="FormData.url"></el-input>
      </el-form-item>
      <el-form-item label="返利比例">
        <el-input v-model="FormData.rebate"></el-input>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input v-model="FormData.createPerson"></el-input>
      </el-form-item>
      <el-form-item label="优惠券结束日期">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="FormData.date" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>

export default {
  components: {},
  name:"Dialog",
  data(){
    return{
      formData: {
        name:'',     //	string	是	商品名称
        title:'',     //	string	是	商品标题
        content:'',     //	string	是	商品描述
        seascapes:'',     //	string	是	海景图片组 字符串
        searchName:'',     //	string	是	商品搜索名称
        img:'',     //	string	是	商品图片
        imgList:'',     //	string	是	商品图片详情
        levelOne:'',     //	long	是	商品分类一级
        levelTwo:'',     //	long	是	商品分类二级
        levelThree:'',     //	long	是	商品分类三级
        price:'',     //	float	是	价格
        monSalesVolume:'',     //	int	是	月销量
        incomeProportion:'',     //	float	是	收入比例
        commission:'',     //	float	是	佣金
        rebate:'',     //	float	是	返利比例
        couponId:'',     //	long	是	优惠券ID
        url:'',     //	string	是	商品优惠卷推广链接
        createPerson:'',     //	string	是	创建人
      },
      dialogImageUrl: '',
      dialogVisible:false
    }
  },
  props:['formSub','FormData'],
  methods:{
    onSubmit() {
      this.$emit('update',this.formData)
      console.log('submit!');
    },
    //上传图片限制类型
    beforeAvatarUpload(file){
      var regExp = /\w\.(JPEG|jpeg|JPG|jpg|png|gif|bmp|swf)$/
      if (!file.type.match(regExp)){
        this.$message.warning({
          title: '警告',
          message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg,image/bmp，image/swf的图片'
        })
      }
      let size = file.size / 1024 / 1024 / 2
      if(size > 2) {
        this.$message.warning({
          title: '警告',
          message: '图片大小必须小于2M'
        })
      }
    },
    //上传图片
    uploadFile() {
      this.$refs.upload.submit()
    },
    handlePictureCardPreview(file){
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  created(){

  }
}
</script>
<style scoped>
  .uploadImg{
    width: 80px;
    height:80px;
    border-radius: 5px;
  }
</style>

