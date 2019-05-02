<template>
  <div class="index">
    <LeftMenu></LeftMenu>
    <Header></Header>
    <div class="content" :width="height+'px'">
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
  },
  methods:{
    getclientW(){
//      console.log(document.body.clientWidth ,'---000');
      this.wd= document.body.clientWidth - 180
      this.height= document.body.clientWidth - 60
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
  margin-top: 60px;
  margin-left: 180px;
  width: auto;
  background: #f0f4fb;
  padding: 25px;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
