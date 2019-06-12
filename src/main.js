import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from './utils/api'
import valid from './utils/valid'
import uploadImg from './components/common/upload/index'

Vue.prototype.$api = api; //接口
Vue.prototype.$valid = valid; //状态
Vue.use(ElementUI,{size: "small"});
Vue.use(uploadImg) //上传组件

Vue.filter('preImg',function(){

});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

