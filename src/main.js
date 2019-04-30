import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from './utils/api'



Vue.prototype.$api = api;

Vue.config.productionTip = false
Vue.use(ElementUI,{size: "small"});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

