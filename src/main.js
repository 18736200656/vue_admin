import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from './utils/api'
import valid from './utils/valid'


Vue.prototype.$api = api; //接口
Vue.prototype.$valid = valid; //状态

Vue.config.productionTip = false
Vue.use(ElementUI,{size: "small"});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

