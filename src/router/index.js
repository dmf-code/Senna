import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: "/refresh",
    name: "refresh",
    component: () => import('@/views/Refresh')
  },
  {
    path: '/',
    name: 'index',
    component: function () {
      return import( /* webpackChunkName: "about" */ '@/views/front/Index.vue')
    },
    children: [{
        path: '/',
        name: 'home',
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/front/Home')
        }
      },
      {
        path: 'article/:id',
        name: 'article',
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/front/pages/article/Index.vue')
        }
      },
      {
        path: 'docs/:path',
        name: 'docs',
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/front/pages/doc/Index')
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: function () {
      return import( /* webpackChunkName: "about" */ '@/views/auth/Login')
    }
  },
  {
    path: '/register',
    name: 'register',
    component: function () {
      return import( /* webpackChunkName: "about" */ '@/views/auth/Register')
    }
  },
  {
    path: '/admin',
    meta: {
      requireAuth: true
    },
    component: function () {
      return import( /* webpackChunkName: "about" */ '@/views/admin/Index')
    },
    children: [{
        path: '/',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/Dashboard')
        }
      },
      {
        path: '/admin/dashboard',
        name: 'dashboard',
        meta: {
          requireAuth: true
        },
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/Dashboard')
        }
      },
      {
        path: '/admin/permission',
        name: 'permission',
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/Route')
        },
        children: [{
            path: '/admin/permission/menu',
            name: 'menu',
            meta: {
              requireAuth: true
            },
            component: function () {
              return import( /* webpackChunkName: "about" */ '@/views/admin/pages/menu/List')
            }
          }, {
            path: '/admin/permission/role',
            name: 'role',
            meta: {
              requireAuth: true
            },
            component: function () {
              return import( /* webpackChunkName: "about" */ '@/views/admin/pages/role/List')
            }
          },
          {
            path: '/admin/permission/user',
            name: 'user',
            meta: {
              requireAuth: true
            },
            component: function () {
              return import( /* webpackChunkName: "about" */ '@/views/admin/pages/user/List')
            }
          }, {
            path: '/admin/permission/adminRole',
            name: 'adminRole',
            meta: {
              requireAuth: true
            },
            component: function () {
              return import( /* webpackChunkName: "about" */ '@/views/admin/pages/adminRole/List')
            }
          },
          {
            path: '/admin/permission/roleMenu',
            name: 'roleMenu',
            meta: {
              requireAuth: true
            },
            component: function () {
              return import( /* webpackChunkName: "about" */ '@/views/admin/pages/roleMenu/List')
            }
          },
          {
            path: '/admin/permission/url',
            name: 'url',
            meta: {
              requireAuth: true
            },
            component: function () {
              return import( /* webpackChunkName: "about" */ '@/views/admin/pages/url/List')
            }
          },
        ]
      },
      {
        path: '/admin/article',
        name: "article",
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/Route')
        },
        children: [{
          path: '/admin/article/list',
          meta: {
            requireAuth: true
          },
          component: function () {
            return import( /* webpackChunkName: "about" */ '@/views/admin/pages/article/List')
          }
        }, {
          path: '/admin/article/add',
          meta: {
            requireAuth: true
          },
          component: function () {
            return import( /* webpackChunkName: "about" */ '@/views/admin/pages/article/Add')
          }
        }, ]
      },
      {
        path: '/admin/category',
        name: "category",
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/Route')
        },
        children: [{
            path: '/admin/category/list',
            meta: {
              requireAuth: true
            },
            component: function () {
              return import( /* webpackChunkName: "about" */ '@/views/admin/pages/category/List')
            }
          },
          {
            path: '/admin/category/add',
            meta: {
              requireAuth: true
            },
            component: function () {
              return import( /* webpackChunkName: "about" */ '@/views/admin/pages/category/Add')
            }
          },
        ]
      },
      {
        path: '/admin/tag',
        name: "tag",
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/Route')
        },
        children: [{
            path: '/admin/tag/list',
            meta: {
              requireAuth: true
            },
            component: function () {
              return import( /* webpackChunkName: "about" */ '@/views/admin/pages/tag/List')
            }
          },
          {
            path: '/admin/tag/add',
            meta: {
              requireAuth: true
            },
            component: function () {
              return import( /* webpackChunkName: "about" */ '@/views/admin/pages/tag/Add')
            }
          },
        ]
      },

      {
        path: '/admin/tutorial',
        name: "tutorial",
        component: function () {
          return import( /* webpackChunkName: "about" */ '@/views/admin/Route')
        },
        children: [{
          path: '/admin/tutorial/index',
          meta: {
            requireAuth: true
          },
          component: function () {
            return import( /* webpackChunkName: "about" */ '@/views/admin/pages/tutorial/List')
          }
        }, ]
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  if (to.path.search("/admin") != -1) {
    var userInfo = localStorage.getItem('user_info');
    if (userInfo !== "") {
      userInfo = JSON.parse(localStorage.getItem('user_info'));
    }
    if (userInfo) {
      next();
    } else {
      router.app.$options.store.dispatch("logout");
      next("/login");
      return
    }
  }
  next();
});

export default router