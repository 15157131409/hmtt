import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
// import 'vant/lib/index.css'
import 'vant/lib/index.less'
import 'amfe-flexible'
// import '@/style/icon.less'
import Myicon from '@/components/Myicon.vue'
// import '@/style/reset.less'
import '@/style/index.less'

// 一次型把filters/index.js 中所有的按需要导出全部导出来
// 作为obj的属性
import * as obj from '@/filters'

import FollowUser from '@/components/FollowUser.vue'
import '@/components'
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})
Vue.component('Myicon', Myicon)
Vue.use(Vant)
Vue.component(FollowUser.name, FollowUser)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 给页面上所有的元素绑定滚动事件
//  只要谁滚动 就打印出来
// const list = document.querySelectorAll('*')
// list.forEach(item => {
//   item.onscroll = function (e) {
//     console.log(e.target)
//   }
// })
