import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes=[
  {
    path:'/',
    redirect:'/index/home',
  },
  {
    path:'/index',
    name:'Index',
    components:()=>import('@/components/view/index'),
    redirect:'/home',
    children:children
  },
  
  {
    path:'/login',
    name:'Login',
    meta:{
      title:'登录页面'
    },
    components:()=>import('@/components/view/login')
  },
  {
    path:'/lock',
    name:'Lock',
    meta:{
      title:'锁屏页面'
    },
    components:()=>import('@/components/view/Lock')
  },
  {
    path: "*",
    name: "Nofind",
    component: () => import("@/components/view/404")
  }
]
const children = [
  {
    path:'home',
    name:'Home',
    meta:{
      requireAuthor:true,
      title:'首页'
    },
    components:()=>import('@/components/view/home')
  },
  {
    path:'commodity',
    name:'Commodity',
    meta:{
      title:'商品管理'
    },
    components:()=>import('@/components/view/commodity')
  },
  {
    path:'channel',
    name:'Channel',
    meta:{
      title:'渠道管理'
    },
    components:()=>import('@/components/view/channel')
  },
  {
    path:'user',
    name:'User',
    meta:{
      title:'用户管理'
    },
    components:()=>import('@/components/view/user')
  },
  {
    path:'task',
    name:'Task',
    meta:{
      title:'任务管理'
    },
    components:()=>import('@/components/view/task')
  },
  {
    path:'cash',
    name:'Cash',
    meta:{
      title:'提现管理'
    },
    components:()=>import('@/components/view/cash')
  },
]



const router= new Router({
  mode:'history',
  routes:routes
})
router.beforeEach((to,from,next)=>{
  let token = window.sessionStorage.getItem('token');
  if(to.meta && to.meta.title){
    document.title = to.meta.title
  }
  
  const isLogin = token ? true : false

  // if (to.path === '/login') {
  //   next()
  // } else {
  //   isLogin ? next() : next('/login')
  // }
  next()
  // if(to.meta.requireAuthor){
  //   if(token){
  //     next()
  //   }else{
  //     next('/login')
  //   }
  // }
});

export default router