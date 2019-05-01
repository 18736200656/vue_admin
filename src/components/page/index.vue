<template>
  <div class="index">
    <LeftMenu></LeftMenu>
    <div class="rightContainer" :width="wd">
      <Header></Header>
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
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
    };
  },
  components: {
    Header,
    LeftMenu,
    Tags
  },
  created() {
    window.onresize = this.getclientW()
    // document.addEventListener('resize',this.getclientW,false);
  },
  methods:{
    getclientW(){
      console.log(document.body.clientWidth ,'---000');
      this.wd= document.body.clientWidth - 180
    }
  }
};
</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.rightContainer {
  float: left;
  /* width: auto; */
  height: 100%;
  /* z-index: 10; */

}
.content {
  margin-top: 60px;
  width: auto;
  height: 100%;
  padding: 25px;
  background: #f0f4fb;
  box-sizing: border-box;
}
</style>
