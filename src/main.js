// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import ElementUI from 'element-ui';
import MyServerHttp from '@/plugins/http.js'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/reset.css'
import moment from 'moment'
// 旧的用法axios
// import axiox from 'axios'
// Vue.prototype.$http=axiox
// 使用vue的插件
Vue.use(ElementUI)
Vue.use(MyServerHttp)
Vue.config.productionTip = false



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
