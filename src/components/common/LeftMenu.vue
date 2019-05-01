<template>
  <div class="sidebar">
    <div class="top_box">
      后台管理系统
    </div>
    <el-row class="menu_page">
      <el-col>
        <el-menu
          mode="vertical"
          class="el-menu-vertical-demo"
          :collapse="collapse"
          router
          @select="selectMenu"
          :default-active="$route.path"
          background-color="#21212c"
          active-text-color="#fff"
          text-color="#fff">
          <Menu :items="items"/>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import bus from "../../utils/bus";
import Menu from "./Menu";
export default {
  name: "LeftMenu",
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: "el-icon-menu",
          name: "商品目录管理",
          path: "/menu",
        },
        {
          icon: "el-icon-setting",
          name: "商品管理",
          path: "/home",
        },
        {
          icon: "el-icon-document",
          name: "渠道管理",
          path: "/channel",
        },
        {
          icon: "el-icon-user-solid",
          name: "用户管理",
          path: "/user",
        },
        {
          icon: "el-icon-s-tools",
          name: "任务管理",
          path: "/task",
          children:[
            {
              name: "任务详情",
              path: "/task/taskD",
            },
            {
              name: "任务管理",
              path: "/task/taskM",
            },
            
          ]
        },
        {
          icon: "el-icon-bank-card",
          name: "提现管理",
          path: "/cash",
        },
      ]
    };
  },
  components: {
    Menu
  },
  created() {
  },
  methods:{
    selectMenu(key,keyPath){
      console.log(key)
      this.$router.push({path:key})
    },
  }
};
</script>
<style scoped>
.sidebar{
  width: 180px;
  height: 100%;
  float: left;
  background-color: #21212c;
  overflow: hidden;
}
.menu_page {
  width: 180px;
  min-height: 100%;
  background-color: #21212c;
}
.top_box{
  width: 100%;
  font-size:20px;
  text-align: center;
  color:#49a0f9;
  height:60px;
  line-height:60px;
  margin-bottom:18px; 
  background-color:#353646;
}
.top_tit{
  
}
.collapse-btn{
  display: inline-block;
  margin-left: 20px;
}
.sidebar {
  overflow: hidden;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}

.el-menu {
  border: none;
  z-index: 9999;
}

.fa-margin {
  margin-right: 5px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}

.el-menu-vertical-demo {
  width: 49px;
}

.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}

a {
  text-decoration: none;
}
</style>
<style>
  .el-menu-item.is-active {
    background-color: #6ebbe5 !important;
  }
</style>

