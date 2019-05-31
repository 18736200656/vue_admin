<template>
  <div>
    <div class="goodsform">
      <el-form ref="goodsform" :model="goodsdata" :rules="formRules" label-width= "150px" label-position="left">
        <el-form-item label="商品编号" prop="goodsId">
          <el-input v-model="goodsdata.goodsId"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="goodsdata.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="商品主图" prop="goodsUrl">
          <el-input v-model="goodsdata.goodsUrl"></el-input>
        </el-form-item>
        <el-form-item label="商品详情" prop="goodsItemUrl">
          <el-input v-model="goodsdata.goodsItemUrl"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="goodsLevel">
          <el-input v-model="goodsdata.goodsLevel"></el-input>
        </el-form-item>
        <el-form-item label="淘宝点击链接" prop="tbkUrl">
          <el-input v-model="goodsdata.tbkUrl"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="goodsdata.price"></el-input>
        </el-form-item>
        <el-form-item label="商品销量" prop="goodsSales">
          <el-input v-model="goodsdata.goodsSales"></el-input>
        </el-form-item>
        <el-form-item label="收入比例" prop="rate">
          <el-input v-model="goodsdata.rate"></el-input>
        </el-form-item>
        <el-form-item label="佣金" prop="commission">
          <el-input v-model="goodsdata.commission"></el-input>
        </el-form-item>
        <el-form-item label="卖家旺旺" prop="sellName">
          <el-input v-model="goodsdata.sellName"></el-input>
        </el-form-item>
        <el-form-item label="卖家ID" prop="sellId">
          <el-input v-model="goodsdata.sellId"></el-input>
        </el-form-item>
        <el-form-item label="店铺名称" prop="sellStoreName">
          <el-input v-model="goodsdata.sellStoreName"></el-input>
        </el-form-item>
        <el-form-item label="平台类型" prop="platform">
          <el-input v-model="goodsdata.platform"></el-input>
        </el-form-item>
        <el-form-item label="优惠券ID" prop="couponId">
          <el-input v-model="goodsdata.couponId"></el-input>
        </el-form-item>
        <el-form-item label="优惠券总量" prop="couponCount">
          <el-input v-model="goodsdata.couponCount"></el-input>
        </el-form-item>
        <el-form-item label="优惠券剩余总量" prop="couponLeftCoupon">
          <el-input v-model="goodsdata.couponLeftCoupon"></el-input>
        </el-form-item>
        <el-form-item label="优惠券面额" prop="couponValue">
          <el-input v-model="goodsdata.couponValue"></el-input>
        </el-form-item>
        <el-form-item label="优惠券开始时间" prop="couponStartTime">
          <el-input v-model="goodsdata.couponStartTime"></el-input>
        </el-form-item>
        <el-form-item label="优惠券结束时间" prop="couponEndTime">
          <el-input v-model="goodsdata.couponEndTime"></el-input>
        </el-form-item>
        <el-form-item label="优惠卷链接" prop="couponUrl">
          <el-input v-model="goodsdata.couponUrl"></el-input>
        </el-form-item>
        <el-form-item label="优惠券推广链接" prop="couponItemUrl">
          <el-input v-model="goodsdata.couponItemUrl"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="form_bottom">
      <el-button type="primary" @click="onSubmit(true)" v-if="formdata.edit==true">保存</el-button>
      <el-button type="primary" @click="onSubmit(false)" v-else>立即创建</el-button>
      <!--<el-button>取消</el-button>-->
    </div>

  </div>
</template>
<script>

export default {
  name:'goodsform',
  data(){
    return{
      goodsdata: {
        goodsId:'',     //	string	是	商品编号
        goodsName:'',     //	string	是	商品名称
        goodsUrl:'',     //	string	是	商品主图
        goodsItemUrl:'',     //	string	是	商品详情
        goodsLevel:'',     //	string	是	商品分类
        tbkUrl:'',     //	string	是	淘宝客点击链接
        price:'',     //	string	是	商品价格
        goodsSales:'',     //		是	商品月销量
        rate:'',     //		是	收入比列
        commission:'',     //	佣金
        sellName:'',     //	卖家旺旺
        sellId:'',     //		卖家ID
        sellStoreName:'',     //	店铺名称
        platform:'',     //	平台类型
        couponId:'',     //	优惠券ID
        couponCount:'',     // 优惠券数量
        couponLeftCoupon:'',     //	优惠券剩余数量
        couponValue:'',     //	优惠券面额
        couponStartTime:'',     //	优惠券开始时间
        couponEndTime:'',     // 优惠券结束时间
        couponUrl:'',     //	优惠券链接
        couponItemUrl:'',     // 优惠券推广链接
      },
      dialogImageUrl: '',
      dialogVisible:false  ,
      formRules:{
        goodsId:{required: false, message: '请输入商品编号', trigger: 'blur'},
        goodsName:{required: false, message: '请输入商品名称', trigger: 'blur'},
        goodsUrl:{required: false, message: '请输入商品主图', trigger: 'blur'},
        goodsItemUrl:{required: false, message: '请输入商品详情', trigger: 'blur'},
        goodsLevel:{required: false, message: '请输入商品分类 ', trigger: 'blur'},
        tbkUrl:{required: false, message: '请输入淘宝客点击链接 ', trigger: 'change'},
        price:{required: false, message: '请输入商品价格 ', trigger: 'blur'},
        goodsSales:{required: false, message: '请输入商品月销量', trigger: 'change'},
        rate:{required: false, message: '请输入收入比例', trigger: 'change'},
        commission:{required: false, message: '请输入佣金', trigger: 'change'},
        sellName:{required: false, message: '请输入卖家旺旺', trigger: 'blur'},
        sellId:{required: false, message: '请输入卖家ID ', trigger: 'blur'},
        sellStoreName:{required: false, message: '请输入店铺名称 ', trigger: 'blur'},
        platform:{required: false, message: '请输入平台类型', trigger: 'blur'},
        couponId:{required: false, message: '请输入优惠券ID', trigger: 'blur'},
        couponCount:{required: false, message: '请输入优惠券总量', trigger: 'blur'},
        couponLeftCoupon:{required: false, message: '请输入优惠券剩余数量', trigger: 'blur'},
        couponValue:{required: false, message: '请输入优惠券面额', trigger: 'blur'},
        couponStartTime:{required: false, message: '请输入优惠券开始时间', trigger: 'blur'},
        couponEndTime:{required: false, message: '请输入优惠券结束时间', trigger: 'blur'},
        couponUrl:{required: false, message: '请输入优惠券链接', trigger: 'blur'},
        couponItemUrl:{required: false, message: '请输入优惠卷推广链接', trigger: 'blur'},
      },
    }
  },
  props:['formdata'],
  methods:{
    onSubmit(val) {
      this.goodsdata.type =val
      this.$refs.goodsform.validate(valid =>{
         console.warn(this.goodsdata,'yhjjjjjjlkj')
        if (valid){
          this.$emit('update',this.goodsdata)
        }else{
          return false
        }
      })
    },
    handleAvatarSuccess(res,file){
      if(res.code==1){
        this.goodsdata.img = res.data.path;
      }else{
        this.$message.error(res.msg);
      }
    },
    //上传图片限制类型
    beforeAvatarUpload(file){
      var regExp = /\w\.(JPEG|jpeg|JPG|jpg|png|gif|bmp|swf)$/
      if (file.type.match(regExp)){
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
    //重置
    reset(){
      this.$refs.goodsform.resetFields();
    }
  },
  created(){
    this.goodsdata.createPerson =JSON.parse(sessionStorage.getItem('userInfo')).loginNickName
  },
  watch:{
    formdata(val){
      this.goodsdata=val.data
   }
  }
}
</script>
<style scoped>
  .goodsform{
    margin-top:15px;
    max-height: 400px;
    overflow: auto;
  }
  .form_bottom{
    margin-top:20px;
    text-align: right;
  }
  /* .uploadImg{
    width: 80px;
    height:80px;
    border-radius: 5px;
  } */
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
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }

</style>
<style>
  .el-upload--picture-card,
  .upload_img .el-form-item__content .el-upload-list--picture-card .el-upload-list__item{
    width: 80px;
    height:80px;
    line-height: 80px;
  }
</style>
