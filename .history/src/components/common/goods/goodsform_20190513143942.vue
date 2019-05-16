<template>
  <div>
    <div class="goodsform">
      <el-form ref="form" :model="FormData" :rules="formRules" label-width= "150px" label-position="left">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="FormData.name"></el-input>
        </el-form-item>
        <el-form-item label="商品标题" prop="title">
          <el-input v-model="FormData.title"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="content">
          <el-input v-model="FormData.content"></el-input>
        </el-form-item>
        <el-form-item label="海景图片组" prop="seascapes">
          <el-input v-model="FormData.seascapes"></el-input>
        </el-form-item>
        <el-form-item label="商品搜索名称" prop="searchName">
          <el-input v-model="FormData.searchName"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="img" class="upload_img">
          <el-upload
            class="avatar-uploader"
            action="/common/attachment/uploadFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="FormData.img" :src="FormData.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品图片详情" prop="imgList">
          <el-input v-model="FormData.imgList"></el-input>
        </el-form-item>
        <el-form-item label="商品分类一级" prop="levelOne" >
          <el-select v-model="FormData.levelOne" placeholder="请选择商品分类等级"> 
            <el-option :label="item.label" :value="item.value" v-for="item in options" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品分类二级" prop="levelTwo">
          <el-select v-model="FormData.levelTwo" placeholder="请选择商品分类等级"> 
            <el-option :label="item.label" :value="item.value" v-for="item in options" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品分类三级" prop="levelThree">
          <el-select v-model="FormData.levelThree" placeholder="请选择商品分类等级"> 
            <el-option :label="item.label" :value="item.value" v-for="item in options" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="FormData.price"></el-input>
        </el-form-item>
        <el-form-item label="商品销量" prop="monSalesVolume">
          <el-input v-model="FormData.monSalesVolume"></el-input>
        </el-form-item>
        <el-form-item label="收入比例" prop="incomeProportion">
          <el-input v-model="FormData.incomeProportion"></el-input>
        </el-form-item>
        <el-form-item label="佣金" prop="commission">
          <el-input v-model="FormData.commission"></el-input>
        </el-form-item>
        <el-form-item label="优惠券ID" prop="couponId">
          <el-input v-model="FormData.couponId"></el-input>
        </el-form-item>
        <el-form-item label="商品优惠卷推广链接" prop="url">
          <el-input v-model="FormData.url"></el-input>
        </el-form-item>
        <el-form-item label="返利比例" prop="rebate">
          <el-input v-model="FormData.rebate"></el-input>
        </el-form-item>
        <el-form-item label="创建人" prop="createPerson">
          <el-input v-model="FormData.createPerson" disabled></el-input>
        </el-form-item>
        <el-form-item label="优惠券结束日期">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="FormData.date" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>

        </el-form-item>
      </el-form>
    </div>
    <div class="form_bottom"> 
      <el-button type="primary" @click="onSubmit('true')" v-if="formdata.edit">保存</el-button>
      <el-button type="primary" @click="onSubmit('false')" v-else>立即创建</el-button>
      <!--<el-button>取消</el-button>-->
    </div>

  </div>
</template>
<script>

export default {
  name:'goodsform',
  data(){
    return{
      FormData: {
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
      dialogVisible:false  ,
      formRules:{
        name:{required: true, message: '请输入商品名称', trigger: 'blur'},
        title:{required: true, message: '请输入商品标题', trigger: 'blur'},
        content:{required: true, message: '请输入品描述', trigger: 'blur'},
        seascapes:{required: true, message: '请输入海景图片组', trigger: 'blur'},
        searchName:{required: true, message: '请输入商品搜索名称 ', trigger: 'blur'},
        img:{required: true, message: '请输入商品图片 ', trigger: 'change'},
        imgList:{required: true, message: '请输入商品图片详情 ', trigger: 'blur'},
        levelOne:{required: true, message: '请输入商品分类一级', trigger: 'blur'},
        levelTwo:{required: true, message: '请输入商品分类二级', trigger: 'blur'},
        levelThree:{required: true, message: '请输入商品分类三级', trigger: 'blur'},
        price:{required: true, message: '请输入价格', trigger: 'blur'},
        monSalesVolume:{required: true, message: '请输入月销量 ', trigger: 'blur'},
        incomeProportion:{required: true, message: '请输入收入比例 ', trigger: 'blur'},
        commission:{required: true, message: '请输入佣金 ', trigger: 'blur'},
        rebate:{required: true, message: '请输入返利比例 ', trigger: 'blur'},
        couponId:{required: true, message: '请输入优惠券ID  ', trigger: 'blur'},
        url:{required: true, message: '请输入商品优惠卷推广链接', trigger: 'blur'},
      },
      options:[
        {label:'一级',value:1},
        {label:'二级',value:2},
        {label:'三级',value:3},
      ]
    }
  },
  props:['formdata'],
  methods:{
    onSubmit(val) {
      this.FormData = Object.assign(this.FormData,{
        type:val
      });
      if(val){

      }
      
      this.$refs.form.validate(valid =>{
        if (valid){
          this.$emit('update',this.FormData)
        }else{
          //重置
          this.$refs.form.resetFields();
        }
      })
      console.log('submit!');
    },
    handleAvatarSuccess(res,file){
      if(res.code==1){
        this.FormData.img = res.data.path;
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
  },
  created(){
    this.FormData.createPerson =JSON.parse(sessionStorage.getItem('userInfo')).loginNickName
  },
  watch:{
   formdata(val){
      this.FormData=val.data
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
