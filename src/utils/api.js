import axios from './axios'

const api = {
  //登录
  login:(val)=>{
    return axios({
      url:'',
      method:'',
      data:val
    })
  },
  //_______________ 商品管理
  //商品查询
  queryGoods(val){
    return axios({
      url:'/goods/queryGoods',
      method:'POST',
      data:val
    })
  }
}

export default api;