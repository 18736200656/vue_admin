<template>
  <div>
    <div class="avatar-uploader">
      <div v-if="imageUrl" class="avatar">
        <div class="avatar-cover">
          <!--<i @click="dialogVisible = true" class="el-icon-view"></i>-->
          <i @click="removeImg" class="el-icon-delete"></i>
        </div>
        <img :src="imageUrl">
      </div>
      <el-upload
        v-else
        :action="upLoad"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <p slot="tip" class="el-upload-tip">{{placeholder}}</p>
    </div>
    <!--<el-dialog-->
      <!--:title="title"-->
      <!--:visible.sync="dialogVisible">-->
      <!--<img :src="imageUrl" style="width: 100%">-->
      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
      <!--</span>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
        dialogVisible: false,
        headers: {},
        upLoad: '',
        imageUrl: '',
        // size: '!all'
      }
		},
    props: [
      "title",
    	"value",
      "placeholder"
    ],
		watch: {
			"value": function (val) {
        if(val != undefined){
        	this.imageUrl  = val;
        }
      }
    },
		created() {
      this.upLoad = process.env.NODE_BASE_URL+'common/attachment/uploadFile';
		},
		methods: {
			// 上传成功
      handleAvatarSuccess(res, file) {
        this.imageUrl = res.data.path;
        this.$emit("input", this.imageUrl);
      },
      // 上传之前校验
      beforeAvatarUpload(file) {
        const isJPGandPNG = file.type === 'image/jpeg' || file.type === 'image/png' ? true : false;
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isJPGandPNG) {
          this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPGandPNG && isLt5M;
      },
      // 删除图片
      removeImg(){
      	let _this = this;
        this.$confirm('是否删除此图片?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	this.imageUrl = '';
          this.$emit("input", this.imageUrl);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {

        });
      }
    }
	}
</script>

<style lang="scss">
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    text-align: center;
    line-height: 178px;
    img{
      max-width: 100%;
      max-height: 100%;
    }
    .avatar-cover{
      display: none;
      background-color: rgba(0,0,0,.4);
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      i{
        color: #fff;
        font-size: 28px;
        cursor: pointer;
        margin: 0 10px;
      }
    }
    &:hover{
      .avatar-cover{
        display: block;
      }
    }
  }
  .el-upload-tip{
    position: absolute;
    left: 190px;
    top: 50%;
    line-height: 1.5;
    color: #999;
    transform: translate(0, -50%);
  }
</style>
