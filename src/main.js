// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import ElementUI from 'element-ui'
// MyBread其实是组件选项所在的对象{template,'',data等}
import MyBread from'@/components/custom/myBread.vue'
import MyServerHttp from '@/plugins/http.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import moment from 'moment'
// 旧的用法axios
// import axiox from 'axios'
// Vue.prototype.$http=axiox
// 使用vue的插件
Vue.use(ElementUI)
Vue.use(MyServerHttp)
Vue.config.productionTip = false

// 全局自定义组件原来的写法
// Vue.component('my-bread',
// {
//   template:'',
//   data(){
//   return{}
//   },
//   props:[]
// }
// )
// 现在的写法
Vue.component(MyBread.name,MyBread)
// 全局过滤器时间格式处理
Vue.filter("fmtdate",(v)=>{
  return moment(v).format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
