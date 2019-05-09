<template>
<div>
  <header class="header-nav">
    <img src="../../assets/icon_user.png" alt="" class="avatar">
    <span class="comename">hello,</span>
    <span class="avatarname">{{username || 'username'}}</span>
    <el-button icon="el-icon el-icon-refresh" size="large" @click="$router.go(0)" class="reloadbtn">刷新</el-button>
  </header>
</div>

</template>

<script>
import bus from "../../utils/bus";
export default {
  name: "Header",
  data() {
    return {
      collapse: false, //菜单栏是否闭合
      fullscreen: false,
      showlrc: true,
      username:''
    };
  },
  computed: {

  },
  created(){
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    this.username = userInfo.loginNickName || ""
  },
  methods: {
    setDialogInfo(cmditem) {
      switch (cmditem) {
        case "info":
          this.showInfoList();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    showInfoList() {
      // console.log('下来菜单')
      this.$router.push("/Infoshow");
    },
    logout() {
      //清除token
      window.sessionStorage.removeItem('token')
      //路由跳转
      this.$router.push("/login");
    },
  },

};
</script>
<style scoped>
.header-nav {
  position: fixed;
  left: 180px;
  top: 0;
  width: 100%;
  height: 60px;
  background: #ddd;
  z-index: 10;
  box-shadow: #a9a9a9 4px 4px 4px;
  font-size:18px;
  line-height: 60px;
}

.reloadbtn{
  margin-top:8px;
  float: right;
  margin-right:210px;
  font-size:16px;
}

.avatar {
  margin-left: 25px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}

/* .welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
} */
.comename {
  margin-left: 10px;
}

.avatarname {
  color: #409eff;
  font-weight: bolder;
}

</style>
