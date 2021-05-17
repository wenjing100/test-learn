import { createRouter, createWebHistory, onBeforeRouteUpdate, RouteRecordRaw } from 'vue-router'
import Home from '../views/home/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      keepAlive:true
    }
  },
  {
    path: '/catagory',
    name: 'Catagory',
    component: () => import( '../views/catagory/Catagory.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    meta:{
      //路由保护
      auth:true
    },
    component: () => import( '../views/cart/Cart.vue')
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import( '../views/me/Me.vue')
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: () => import( '../views/detail/details.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( '../views/login/loginCon.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import( '../views/register/register.vue')
  },
  {
    path: '/set',
    name: 'Set',
    component: () => import( '../views/setpage/setpage.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import( '../views/shopPage/shopPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to,from,next)=>{
  //判断下路去的路由 有没有保护 auth是否为true
  if(to.meta.auth){
    //查看 本地token，判断是否已经登陆
    const token = localStorage.getItem('token');
    if(token){
      next()
    }else{
      next({
        path:'/login',
        query:{redirect:to.path}//浏览器参数形式，表示重定向的路径
      })
    }
  }else{
    next();
  }

})

export default router;
