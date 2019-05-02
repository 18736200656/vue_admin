import axios from './axios'

const api = {
  //_______________ 登录_______________ 登录_______________ 登录
  adminLogin:(val)=>{
    return axios({
      url:'/adminLogin',
      method:'POST',
      data:val
    })
  },
  //_______________ 商品管理_______________________________
  //商品查询
  queryGoods(val){
    return axios({
      url:'/goods/queryGoods',
      method:'POST',
      data:val
    })
  },
  //商品新增
  addGoods(val){
    return axios({
      url:'/goods/addGoods',
      method:'POST',
      data:val
    })
  },
  //商品信息
  goodsInfo(val){
    return axios({
      url:'/goods/goodsInfo',
      method:'POST',
      data:val
    })
  },
  //商品修改
  editGoods(val){
    return axios({
      url:'/goods/editGoods',
      method:'POST',
      data:val
    })
  },
  //商品删除
  delGoods(val){
    return axios({
      url:'/goods/delGoods',
      method:'POST',
      data:val
    })
  },
  //商品导入
  importGoods(val){
    return axios({
      url:'/goods/importGoods',
      method:'POST',
      data:val
    })
  },
   //商品新增
   addGoods(val){
    return axios({
      url:'/goods/addGoods',
      method:'POST',
      data:val
    })
  },
  //新增商品分类
  addGoodsCategory(val){
    return axios({
      url:'/goodsCategory/addGoodsCategory',
      method:'POST',
      data:val
    })
  },
  //更新商品分类
  updateGoodsCategory(val){
    return axios({
      url:'/goodsCategory/updateGoodsCategory',
      method:'POST',
      data:val
    })
  },
  //分页查询商品列表
  queryGoodsCategory(val){
    return axios({
      url:'/goodsCategory/addGoodsCategory/goodsCategory/queryGoodsCategory',
      method:'POST',
      data:val
    })
  },
  //商品分类
  queryGoodsCategory(val){
    return axios({
      url:'/goodsCategory/queryGoodsList',
      method:'POST',
      data:val
    })
  },
  // ____________________________________内容管理________________________________________________
   //新增用户消息通知
   saveUserNotice(val){
    return axios({
      url:'/saveUserNotice',
      method:'POST',
      data:val
    })
  },
  //新增广告管理
  saveAdvertising(val){
    return axios({
      url:'/saveAdvertising',
      method:'POST',
      data:val
    })
  },

  //查询广告
  queryAdvertising(val){
    return axios({
      url:'/queryAdvertising',
      method:'POST',
      data:val
    })
  },

  //更新广告
  updateAdvertising(val){
    return axios({
      url:'/updateAdvertising',
      method:'POST',
      data:val
    })
  },

  //删除广告
  deleteAdvertising(val){
    return axios({
      url:'/deleteAdvertising',
      method:'POST',
      data:val
    })
  },
  // ____________________________________________________渠道管理____________________________________________
  //新增渠道管理
  saveStudenChannel(val){
    return axios({
      url:'/saveStudenChannel',
      method:'POST',
      data:val
    })
  },

  //分页查询渠道列表
  queryStudenChannel(val){
    return axios({
      url:'/queryStudenChannel',
      method:'POST',
      data:val
    })
  },
  //更新渠道管理
  updateStudentChannel(val){
    return axios({
      url:'/updateStudentChannel',
      method:'POST',
      data:val
    })
  },
  // _________________________附件上传_________ _________________________附件上传_________
  //图片上传
  uploadFile(val){
    return axios({
      url:'/goodsCategory/addGoodsCategory/common/attachment/uploadFile',
      method:'POST',
      data:val
    })
  },
}

export default api;
