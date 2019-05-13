<template>
  <div class="sidebar">
    <el-row class="menu_page">
      <div class="top_box">
        后台管理系统
      </div>
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
        {
          icon: "el-icon-picture-outline",
          name: "广告管理",
          path: "/addm",
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
  position: absolute;
  left: 0;
  top: 0;
  width: 180px;
  background-color: #21212c;
  height: 100%;
}
.top_box{
  margin-bottom:18px;
  font-size:20px;
  text-align: center;
  color:#49a0f9;
  height:60px;
  line-height:60px;
  background-color:#353646;
}
.menu_page {
  min-height: 100%;
  background-color: #21212c;
}

.sidebar {
  overflow: hidden;
}
.sidebar::-webkit-scrollbar {
  width: 0;
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
a {
  text-decoration: none;
}
</style>
<style>
  .el-menu-item.is-active {
    background-color: #6ebbe5 !important;
  }
</style>

