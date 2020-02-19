import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/front/Index.vue'
import Admin from '@/views/admin/Index.vue'
import Article from '@/views/front/pages/article/List.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import Docs from '@/views/front/pages/doc/Index.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'home',
  component: Home
},
{
  path: '/article/:id',
  name: 'article',
  component: Article
},
{
  path: '/docs/:path',
  name: 'docs',
  component: Docs
},
{
  path: '/login',
  name: 'login',
  component: Login
},
{
  path: '/register',
  name: 'register',
  component: Register
},
{
  path: '/admin',
  name: 'admin',
  component: Admin,
  children: [
    {
      path: 'dashboard',
      name: 'dashboard',
      component: function () {
        return import( /* webpackChunkName: "about" */ '@/views/admin/Dashboard')
      }
    },
    {
      path: 'article',
      name: 'article',
      component: function () {
        return import( /* webpackChunkName: "about" */ '@/views/admin/pages/article/List')
      }
    },
    {
      path: 'addArticle',
      name: 'addArticle',
      component: function () {
        return import( /* webpackChunkName: "about" */ '@/views/admin/pages/article/Add')
      }
    }
  ]
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router