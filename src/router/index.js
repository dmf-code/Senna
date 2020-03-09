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
    meta: {
      requireAuth: true
    },
    component: Admin,
    children: [{
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/Dashboard')
        }
      },
      {
        path: 'article',
        name: 'article',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/pages/article/List')
        }
      },
      {
        path: 'addArticle',
        name: 'addArticle',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/pages/article/Add')
        }
      },
      {
        path: 'category',
        name: 'category',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/pages/category/List')
        }
      },
      {
        path: 'addCategory',
        name: 'addCategory',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/pages/category/Add')
        }
      },
      {
        path: 'tag',
        name: 'tag',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/pages/tag/List')
        }
      },
      {
        path: 'addTag',
        name: 'addTag',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/pages/tag/Add')
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

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    if (userInfo) {
      next();
    } else {
      next("/login");
    }
  }
  next();
});

export default router