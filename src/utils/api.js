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
  //查看推广的学生完成量
  queryChannelView(val){
    return axios({
      url:'/queryChannelView',
      method:'POST',
      data:val
    })
  },
  // ____________________________________________________任务详情____________________________________________
  //添加任务名称
  saveTask(val){
    return axios({
      url:'/saveTask',
      method:'POST',
      data:val
    })
  },

  //更新任务详情
  updateTask(val){
    return axios({
      url:'/updateTask',
      method:'POST',
      data:val
    })
  },
  //分页查询任务列表
  queryTaskList(val){
    return axios({
      url:'/queryTaskList',
      method:'POST',
      data:val
    })
  },
  //启用任务详情
  enableTask(val){
    return axios({
      url:'/enableTask',
      method:'POST',
      data:val
    })
  },
  //禁用任务详情
  disableTask(val){
    return axios({
      url:'/disableTask',
      method:'POST',
      data:val
    })
  },
  // ____________________________________________________任务管理____________________________________________
  //新增任务数据
  saveTaskUser(val){
    return axios({
      url:'/saveTaskUser',
      method:'POST',
      data:val
    })
  },

  //更新用户任务截图
  updateTaskUser(val){
    return axios({
      url:'/updateTaskUser',
      method:'POST',
      data:val
    })
  },
  //	删除任务数据
  deleteTaskUser(val){
    return axios({
      url:'/deleteTaskUser',
      method:'POST',
      data:val
    })
  },
  //审核用户任务数据
  reviewTaskUser(val){
    return axios({
      url:'/reviewTaskUser',
      method:'POST',
      data:val
    })
  },
  //导出任务数据
  exportTaskUser(val){
    return axios({
      url:'/exportTaskUser',
      method:'get',
      data:val
    })
  },
  //分页查询用户任务数据
  queryTaskUserList(val){
    return axios({
      url:'/queryTaskUserList',
      method:'POST',
      data:val
    })
  },
  // ____________________________________________________用户管理____________________________________________
  //新增用户消息通知
  saveStudenChannel(val){
    return axios({
      url:'/saveUserNotice',
      method:'POST',
      data:val
    })
  },
  //淘宝用户修改
  editUserTaobao(val){
    return axios({
      url:'/userTaobao/editUserTaobao',
      method:'POST',
      data:val
    })
  },
  //淘宝用户查询
  queryUserTaobao(val){
    return axios({
      url:'/userTaobao/queryUserTaobao',
      method:'POST',
      data:val
    })
    
  },
  //新增消息
  saveUserNotice(val){
    return axios({
      url:'/saveUserNotice',
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
