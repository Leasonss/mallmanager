import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Users from '@/components/users/Users.vue'
import Home from '@/components/home/home.vue'
import Right from '@/components/right/right.vue'
import Role from '@/components/right/role.vue'
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
      },{
        name:'right',
        path:'/right',
        component:Right
      }
      ,{
        name:'role',
        path:'/role',
        component:Role
      }
    ]
    }
  ]
})
