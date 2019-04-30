import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/page/login'
import Home from '@/components/page/home'
import Index from '@/components/page/index'
import Nofind from '@/components/page/404'
import Commodity from '@/components/page/commodity'
import Channel from '@/components/page/channel'
import User from '@/components/page/user'
import Task from '@/components/page/task'
import Cash from '@/components/page/cash'
import Lock from '@/components/page/Lock'


Vue.use(Router)

const routes=[
  {
    path:'/',
    name:'Index',
    components:Index,
    redirect:'home',
    children:children
  },
  {
    path:'/login',
    name:'Login',
    meta:{
      title:'登录页面'
    },
    components:Login
  },
  {
    path:'/lock',
    name:'Lock',
    meta:{
      title:'锁屏页面'
    },
    components:Lock
  },
  {
    path: "*",
    name: "Nofind",
    component:Nofind
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
    components:Home
  },
  {
    path:'commodity',
    name:'Commodity',
    meta:{
      title:'商品管理'
    },
    components:Commodity
  },
  {
    path:'channel',
    name:'Channel',
    meta:{
      title:'渠道管理'
    },
    components:Channel
  },
  {
    path:'user',
    name:'User',
    meta:{
      title:'用户管理'
    },
    components:User
  },
  {
    path:'task',
    name:'Task',
    meta:{
      title:'任务管理'
    },
    components:Task
  },
  {
    path:'cash',
    name:'Cash',
    meta:{
      title:'提现管理'
    },
    components:Cash
  },
]

const router= new Router({
  mode:'history',
  routes:routes
})
// router.beforeEach((to,from,next)=>{
//   let token = window.sessionStorage.getItem('token');
//   if(to.meta && to.meta.title){
//     document.title = to.meta.title
//   }
//   const isLogin = token ? true : false
//   if (to.path === '/login') {
//     next()
//   } else {
//     isLogin ? next() : next('/login')
//   }
//   next()
//
// });

export default router
