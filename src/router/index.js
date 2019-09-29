import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Users from '@/components/users/Users.vue'
import Home from '@/components/home/home.vue'

Vue.use(Router)

export default new Router({
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
      }]
    }
  ]
})
