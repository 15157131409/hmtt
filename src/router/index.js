import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
const Home = () => import('@/views/Home')
const Video = () => import('@/views/Video')
const Qa = () => import('@/views/Qa')
const My = () => import('@/views/My')
const Login = () => import('@/views/Login')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: 'home', component: Home },
      { path: 'video', component: Video },
      { path: 'qa', component: Qa },
      { path: 'my', component: My, name: 'my' }

    ]
  },
  { path: '/login', component: Login }
]

const router = new VueRouter({
  routes
})

export default router
