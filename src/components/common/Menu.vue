<template>
  <div class="sidebar">
		 <el-menu-item class="item_top" style="height:70px;line-height:70px;font-size:20px;color:#49a0f9;">
				<!-- <i class="el-icon-menu icon-btn" @click="collapseChage"></i> -->
				<span>后台管理系统</span>
		</el-menu-item>
    <template v-for="item in items">
			<el-menu-item v-if="item.children ==null || item.children.length == 0 " :index="item.path" >
				<i :class="item.icon"></i>
				<span>{{item.name}}</span>
      </el-menu-item>
      <!-- 判断是否有二级路由 -->
      <el-submenu v-if="item.children" :index="item.path">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <!--递归组件，把遍历的值传回子组件，完成递归调用-->
        <Menu :items="item.children"/>
      </el-submenu>
    </template>
  </div>
</template>


<script>
import bus from '../../utils/bus'
export default {
	name: "Menu",
  props: {
    items: Array
  },
  data() {
    return {
      // collapse: false,
    };
	},
	methods:{
		 collapseChage() {
      //点击隐藏左侧菜单栏，
      this.collapse = !this.collapse;
      //非父子组件传值
      bus.$emit("collapse", this.collapse);
    },
	}
};
</script>
<style >
	.menu_page {
		position: fixed;
		top: 71px;
		left: 0;
		min-height: 100%;
		background-color: #324057;
		z-index: 99;
	}

	.sidebar::-webkit-scrollbar {
	width: 0;
	}

	.sidebar-el-menu:not(.el-menu--collapse) {
	width: 250px;
	}

	.el-menu {
	border: none;
	}

	.fa-margin {
	margin-right: 5px;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 180px;
	min-height: 400px;
	}

	.el-menu-vertical-demo {
	width: 64px;
	}

	.el-submenu .el-menu-item {
	min-width: 180px;
	}

	.hiddenDropdown,
	.hiddenDropname {
	display: none;
	}
	i.el-submenu__icon-arrow.el-icon-arrow-right {
	display: none !important;
	}
	a {
	color: #ccc;
	text-decoration: none;
	}
</style>
