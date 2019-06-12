<template>
  <transition name="fade">
　　 <div class="img-view" @click="close" v-show="showImg">
　　　　 <div class="img-layer"></div>
　　　　 <div class="img">
　　　　　　 <img :src="imgSrc">
　　　　 </div>
　　</div>
　</transition>
</template>
<script>
　　export default {
　　　　props: ['imgSrc','showImg'],//接受图片地址
　　　　methods: {
          close() {
            this.showImg = false
            this.imgSrc=''
　　　　　　}
　　　　},
        created(){
          // console.log(this.imgSrc,'====')
        },
        watch:{
          showImg(val){
            console.log(val,'--')
          },
          imgSrc(val){
            console.log(val,'+++')
          }
        }
　　}
</script>
<style scoped>  
.fade-enter-active,.fade-leave-active {
  transition: all .2s linear;
  /* transform: translate3D(0, 0, 0); */
}
.fade-enter,.fade-leave-active {
  /* transform: translate3D(100%, 0, 0); */
}
.img-view {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
}
　　
/* 　　遮罩层样式 */
.img-view .img-layer {
  overflow: hidden;
}
/* 　　不限制图片大小，实现居中 */
.img-view .img img {
  width: 500px;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  margin: 200px auto;
  z-index: 1000;
}
</style>