import UploadImg from './upLoad.vue'
// 这里是重点
const uploadImg = {
  install: function(Vue){
    Vue.component('uploadImg',UploadImg)
  }
}
// 导出组件
export default uploadImg
