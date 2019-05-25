<template>
  <div class="index">
    <LeftMenu></LeftMenu>
    <Header></Header>
    <div class="content" :width="height+'px'" ref="content">
      <transition name="move" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import Header from "../common/Header";
import LeftMenu from "../common/LeftMenu";
import bus from "../../utils/bus";
import Tags from "../common/Tags";
export default {
  name: "Index",
  data() {
    return {
      tagsList: [],
      collapse: false,
      wd:0,
      height:0
    };
  },
  components: {
    Header,
    LeftMenu,
    Tags
  },
  mounted() {
    window.addEventListener('resize',this.getclientW,false);
    var con = this.$refs.content;
    this.scrollbarShowHidden(con);

  },
  methods:{
    getclientW(){
      this.wd= document.body.clientWidth - 180
      this.height= document.body.clientWidth - 60
    },

    //鼠标划入滚动条展现，鼠标划出滚动条隐藏
    scrollbarShowHidden(element){
      element.setAttribute('className','scrollbarHide');
      element.onMouseEnter =function() {
        element.setAttribute('className','scrollbarShow');
      };
      element.onMouseLeave =function (){
        element.removeAtrribute('scrollbarShow');
      };
    }

  }
};
</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
  	/* position: relative; */
  box-sizing: border-box;
}
.content {
  /* margin-top: 60px; */
  top: 60px;
  position: absolute;
  right: 0;
  left: 180px;
  width: auto;
  background: #f0f4fb;
  padding: 25px;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
<style>
  /*chrome滚动条颜色设置*/

  *::-webkit-scrollbar {width:15px; height:15px; background-color:transparent;} /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  *::-webkit-scrollbar-track {background-color:#f0f6ff;  } /*定义滚动条轨道 内阴影+圆角*/
  *::-webkit-scrollbar-thumb {background-color:#73abb1; border-radius:6px;} /*定义滑块 内阴影+圆角*/
  .scrollbarHide::-webkit-scrollbar{display: none}
  .scrollbarShow::-webkit-scrollbar{display: block}
</style>
