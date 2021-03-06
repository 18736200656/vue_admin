import _axios from '../utils/axios'

const api = {
  //_______________ 登录_______________ 登录_______________ 登录
  adminLogin:(val)=>{
    return _axios({
      url:'/adminLogin',
      method:'POST',
      data:val
    })
  },
  //_______________ 商品管理_______________________________
  //商品查询
  queryGoods(val){
    return _axios({
      url:'/goods/queryGoods',
      method:'POST',
      data:val
    })
  },
  //商品新增
  addGoods(val){
    return _axios({
      url:'/goods/addGoods',
      method:'POST',
      data:val
    })
  },
  //商品信息
  goodsInfo(val){
    return _axios({
      url:'/goods/goodsInfo',
      method:'POST',
      data:val
    })
  },
  //商品修改
  editGoods(val){
    return _axios({
      url:'/goods/editGoods',
      method:'POST',
      data:val
    })
  },
  //商品删除
  delGoods(val){
    return _axios({
      url:'/goods/delGoods',
      method:'POST',
      data:val
    })
  },
  //商品导入
  importGoods(val){
    return _axios({
      url:'/goods/importGoods',
      method:'POST',
      data:val
    })
  },
   //商品新增
   addGoods(val){
    return _axios({
      url:'/goods/addGoods',
      method:'POST',
      data:val
    })
  },
  //新增商品分类
  addGoodsCategory(val){
    return _axios({
      url:'/goodsCategory/addGoodsCategory',
      method:'POST',
      data:val
    })
  },
  //更新商品分类
  updateGoodsCategory(val){
    return _axios({
      url:'/goodsCategory/updateGoodsCategory',
      method:'POST',
      data:val
    })
  },
  //分页查询商品列表
  queryGoodsCategory(val){
    return _axios({
      url:'/goodsCategory/queryGoodsCategory',
      method:'POST',
      data:val
    })
  },
  //商品分类
  queryGoodsList(val){
    return _axios({
      url:'/goodsCategory/queryGoodsList',
      method:'POST',
      data:val
    })
  },
  // ____________________________________内容管理________________________________________________
   //新增用户消息通知
   saveUserNotice(val){
    return _axios({
      url:'/saveUserNotice',
      method:'POST',
      data:val
    })
  },
  //新增广告管理
  saveAdvertising(val){
    return _axios({
      url:'/saveAdvertising',
      method:'POST',
      data:val
    })
  },

  //查询广告
  queryAdvertising(val){
    return _axios({
      url:'/queryAdvertising',
      method:'POST',
      data:val
    })
  },

  //更新广告
  updateAdvertising(val){
    return _axios({
      url:'/updateAdvertising',
      method:'POST',
      data:val
    })
  },

  //删除广告
  deleteAdvertising(val){
    return _axios({
      url:'/deleteAdvertising',
      method:'POST',
      data:val
    })
  },
  // ____________________________________________________渠道管理____________________________________________
  //新增渠道管理
  saveStudenChannel(val){
    return _axios({
      url:'/saveStudenChannel',
      method:'POST',
      data:val
    })
  },

  //分页查询渠道列表
  queryStudenChannel(val){
    return _axios({
      url:'/queryStudenChannel',
      method:'POST',
      data:val
    })
  },
  //更新渠道管理
  updateStudentChannel(val){
    return _axios({
      url:'/updateStudentChannel',
      method:'POST',
      data:val
    })
  },
  //查看推广的学生完成量
  queryChannelView(val){
    return _axios({
      url:'/queryChannelView',
      method:'POST',
      data:val
    })
  },
  // ____________________________________________________任务详情____________________________________________
  //添加任务名称
  saveTask(val){
    return _axios({
      url:'/saveTask',
      method:'POST',
      data:val
    })
  },

  //更新任务详情
  updateTask(val){
    return _axios({
      url:'/updateTask',
      method:'POST',
      data:val
    })
  },
  //分页查询任务列表
  queryTaskList(val){
    return _axios({
      url:'/queryTaskList',
      method:'POST',
      data:val
    })
  },
  //启用任务详情
  enableTask(val){
    return _axios({
      url:'/enableTask',
      method:'POST',
      data:val
    })
  },
  //禁用任务详情
  disableTask(val){
    return _axios({
      url:'/disableTask',
      method:'POST',
      data:val
    })
  },
  // ____________________________________________________任务管理____________________________________________
  //新增任务数据
  saveTaskUser(val){
    return _axios({
      url:'/saveTaskUser',
      method:'POST',
      data:val
    })
  },

  //更新用户任务截图
  updateTaskUser(val){
    return _axios({
      url:'/updateTaskUser',
      method:'POST',
      data:val
    })
  },
  //	删除任务数据
  deleteTaskUser(val){
    return _axios({
      url:'/deleteTaskUser',
      method:'POST',
      data:val
    })
  },
  //审核用户任务数据
  reviewTaskUser(val){
    return _axios({
      url:'/reviewTaskUser',
      method:'POST',
      data:val
    })
  },
  //导出任务数据
  exportTaskUser(val){
    return _axios({
      url:'/exportTaskUser',
      method:'get',
      data:val
    })
  },
  //分页查询用户任务数据
  queryTaskUserList(val){
    return _axios({
      url:'/queryTaskUserList',
      method:'POST',
      data:val
    })
  },
  //获取用户下拉列表
  queryUserList(){
    return _axios({
      url:'/userTaobao/queryUserList',
      method:'POST',
    })
  },
  //获取任务列表
  taskList(){
    return _axios({
      url:'taskList',
      method:'POST',
    })
  },
  // ____________________________________________________用户管理____________________________________________
  //淘宝用户修改
  editUserTaobao(val){
    return _axios({
      url:'/userTaobao/editUserTaobao',
      method:'POST',
      data:val
    })
  },
  //淘宝用户查询
  queryUserTaobao(val){
    return _axios({
      url:'/userTaobao/queryUserTaobao',
      method:'POST',
      data:val
    })

  },
  //新增消息
  saveUserNotice(val){
    return _axios({
      url:'/saveUserNotice',
      method:'POST',
      data:val
    })
  },
  //  _________________________提现管理_________ _________________________提现管理________
    //分页查询提现列表
    queryUserWithdrawList(val){
      return _axios({
        url:'queryUserWithdrawList',
        method:'POST',
        data:val
      })
    },
    //导出提现列表
    exportUserWithdraw(val){
      return _axios({
        url:'exportUserWithdraw',
        method:'POST',
        data:val
      })

    },
    //导入提现支付信息
    importUserPay(val){
      return _axios({
        url:'/importUserPay',
        method:'POST',
        data:val
      })
    },
  // _________________________附件上传_________ _________________________附件上传_________
  //图片上传
  uploadFile(val){
    return _axios({
      url:'/common/attachment/uploadFile',
      method:'POST',
      data:val
    })
  },
    // _________________________常见问题_________ _________________________常见问题_________
  //分页查询常见问题
  queryUserProblemsList(val){
    return _axios({
      url:'/queryUserProblemsList',
      method:'POST',
      data:val
    })
  },

  //删除常见问题
  deleteUserProblems(val){
    return _axios({
      url:'/deleteUserProblems',
      method:'POST',
      data:val
    })
  },

  //新增常见问题
  saveUserProblems(val){
    return _axios({
      url:'/saveUserProblems',
      method:'POST',
      data:val
    })
  },
   //修改常见问题
   updateUserProblems(val){
    var aa = {id:val.id,title:val.title,answer:val.answer}
    return _axios({
      url:'/updateUserProblems',
      method:'POST',
      data:aa
    })
  },
}

export default api;
