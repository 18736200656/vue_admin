<template>
<div>
  <header class="header-nav">
    <img src="../../assets/icon_user.png" alt="" class="avatar">
    <span class="comename">hello,</span>
    <span class="avatarname">{{'babab'}}</span>
    <el-button icon="el-icon el-icon-refresh" @click="$router.go(0)" class="reloadbtn">刷新</el-button>
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
      showlrc: true
    };
  },
  computed: {

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
  box-shadow: #a9a9a9 4px 4px(90 ) 25%;
  font-size:18px;
  line-height: 60px;
}
.user_img {
  height: 40px;
  width: 40px;
  
  vertical-align: middle;
  border-radius: 50%;
}

.reloadbtn{

}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}

.avatar {
  margin-left: 25px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}

.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.comename {
  margin-left: 10px;
}

.avatarname {
  color: #409eff;
  font-weight: bolder;
}

.username {
  cursor: pointer;
  margin-right: 5px;
}

.el-dropdown {
  color: #fff;
}

.btn-fullscreen {
  display: inline-block;
  font-size: 24px;
  vertical-align: middle;
  margin-right: 20px;
  transform: rotate(45deg);
  cursor: pointer;
}

.icon-font {
  transform: none;
}

a {
  text-decoration: none;
  color: #fff;
}

.icon-font i {
  font-size: 20px;
}

.userinfo {
  display: inline-block;
}
</style>
