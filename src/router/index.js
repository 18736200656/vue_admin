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
    component:()=>import('@/components/page/login2')
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
          requireAuthor:true,
          title:'商品目录管理'
        },
        component:()=>import('@/components/page/menuList')
      },
      {
        path:'channel',
        name:'Channel',
        meta:{
          requireAuthor:true,
          title:'渠道管理'
        },
        component:()=>import('@/components/page/channel')
      },
      {
        path:'user',
        name:'User',
        meta:{
          requireAuthor:true,
          title:'用户管理'
        },
        component:()=>import('@/components/page/user')
      },
      {
        path:'task',
        name:'Task',
        meta:{
          requireAuthor:true,
          title:'任务管理'
        },
        component:()=>import('@/components/page/task'),
        children: [
          {
            path:'taskD',
            name:'taskM',
            meta:{
              requireAuthor:true,
              title:'任务详情'
            },
            component:()=>import('@/components/page/task/taskdetail')
          },
          {
            path:'taskM',
            name:'taskM',
            meta:{
              requireAuthor:true,
              title:'任务管理'
            },
            component:()=>import('@/components/page/task/taskmanage')
          },
        ]
      },
      {
        path:'cash',
        name:'Cash',
        meta:{
          requireAuthor:true,
          title:'提现管理'
        },
        component:()=>import('@/components/page/cash')
      },
      {
        path:'addm',
        name:'Addm',
        meta:{
          requireAuthor:true,
          title:'提现管理'
        },
        component:()=>import('@/components/page/addmanage')
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
  if (to.meta && to.meta.requireAuthor && !token) {
    next({
      path: "/login",
    });
    window.sessionStorage.removeItem('token');
    return
  }
  next();
});

export default router
