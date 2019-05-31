import axios from 'axios'
import {Loading,Message} from 'element-ui';
import router from '../router'

let baseurl = process.env.NODE_BASE_URL;

const _axios = axios.create({
  timeout:5000,
  baseURL:baseurl,
  headers:{
    'Content-Type':'application/json; charset=utf-8'
  }
});

let loading;
_axios.interceptors.request.use(
  config=>{
    let token = window.sessionStorage.getItem('token');
    if(token){
      config.headers.common['token'] = encodeURI(token)
    }
    loading = Loading.service({
      lock: true,
      text: "加载中...",
      background: "rgba(0, 0, 0, 0.7)"
    })
    return config
  },
  error=>{
    loading.close()
    Message.error(JSON.stringify(error))
    return Promise.reject(error);
  }
)

_axios.interceptors.response.use(
  res=>{
    loading.close();
    return res.data;
  },
  error=>{
    loading.close();
    Message.error(JSON.stringify(error.message));
    const {status} =error.res;
    if (status == 401) {
      Message.error("token值无效，请重新登录");
      // 清除token
      window.sessionStorage.removeItem('token')
      // 页面跳转
      router.replace({path:"/login"});
    }
    if(status == 404){
      Message.error("请求地址不存在！");
      return
    }
    return Promise.reject(error);
  }
)

export default _axios
