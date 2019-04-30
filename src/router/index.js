import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes=[
  {
    path:'/b',
    component:()=>import('@/components/page/index'),
    // redirect:'home',
  },
  {
    path:'/login',
    name:'Login',
    meta:{
      title:'登录页面'
    },
    component:()=>import('@/components/page/login')
  },
  {
    path:'/lock',
    name:'Lock',
    meta:{
      title:'锁屏页面'
    },
    component:()=>import('@/components/page/Lock')
  },
  {
    path: "*",
    name: "Nofind",
    component: () => import("@/components/page/404")
  },
  {
    path:'/',
    redirect:'home',
    component:()=>import('@/components/page/index'),
    children: [
      {
        path:'home',
        name:'Home',
        meta:{
          requireAuthor:true,
          title:'首页'
        },
        component:()=>import('@/components/page/home')
      },
      {
        path:'menu',
        name:'menu',
        meta:{
          title:'商品目录管理'
        },
        component:()=>import('@/components/page/menuList')
      },
      {
        path:'channel',
        name:'Channel',
        meta:{
          title:'渠道管理'
        },
        component:()=>import('@/components/page/channel')
      },
      {
        path:'user',
        name:'User',
        meta:{
          title:'用户管理'
        },
        component:()=>import('@/components/page/user')
      },
      {
        path:'task',
        name:'Task',
        meta:{
          title:'任务管理'
        },
        component:()=>import('@/components/page/task')
      },
      {
        path:'cash',
        name:'Cash',
        meta:{
          title:'提现管理'
        },
        component:()=>import('@/components/page/cash')
      },
    ]
  },
]

const router= new Router({
  // mode:'history',
  routes:routes
})
router.beforeEach((to,from,next)=>{
  let token = window.sessionStorage.getItem('token');
  if(to.meta && to.meta.title){
    document.title = to.meta.title
  }
  next()
});

export default router