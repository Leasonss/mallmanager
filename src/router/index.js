import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Users from '@/components/users/Users.vue'
import Home from '@/components/home/home.vue'
import Right from '@/components/right/right.vue'
import Role from '@/components/right/role.vue'
import { Message } from 'element-ui';
Vue.use(Router)

const routers= new Router({
  routes: [
    {
      name:'login',
      path: '/login',
      component:Login
    },{
      name:'home',
      path:'/home',
      component:Home,
      children:[{
        name:'users',
        path:'/users',
        component:Users
      },{
        name:'rights',
        path:'/rights',
        component:Right
      }
      ,{
        name:'roles',
        path:'/roles',
        component:Role
      }
    ]
    }
  ]
})

routers.beforeEach((to,from,next) =>{
  if(to.path==='/login'){
    next()
  }
  else{
  const token = localStorage.getItem("token");
  if (!token) {
    // token 不存在,回到login
    // this.$router.push({
    //   name: "login"
    // });
    Message.warning("请先登录！")
    routes.push({
      name:'login'
    })
    return
    // token存在继续渲染
  }
  next()
  }
})
export default routers
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
