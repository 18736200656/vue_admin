<template>
  <div id="app">
     <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  created(){
    //鼠标划入滚动条展现，鼠标划出滚动条隐藏
  //  function scrollbarShowHidden(element){
  //    element.setAtrribute('className','scrollbarHide');
  //    element.hover(function() {
  //      element.setAtrribute('className','scrollbarShow');
  //    }, function() {
  //      element.removeAtrribute('scrollbarShow');
  //    });
  //  }
  //  var tag = document.getElementsByClassName('.el-table__body-wrapper')[0];
  //  var app = document.getElementById('app')
  //  scrollbarShowHidden(tag);
  //  scrollbarShowHidden(app);
  }
}


</script>

<style>
html,body,
#app {
  margin:0;
  padding:0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

   /*chrome滚动条颜色设置*/

*::-webkit-scrollbar {width:7px; height:7px; background-color:transparent;} /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
*::-webkit-scrollbar-track {background-color:#f0f6ff;  } /*定义滚动条轨道 内阴影+圆角*/
*::-webkit-scrollbar-thumb {background-color:#73abb1; border-radius:6px;} /*定义滑块 内阴影+圆角*/
.scrollbarHide::-webkit-scrollbar{display: none}
.scrollbarShow::-webkit-scrollbar{display: block}

</style>
