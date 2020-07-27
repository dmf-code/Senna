const routes = [{
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
                path: '/tutorial',
                name: 'tutorial',
                component: function () {
                    return import('@/views/front/pages/tutorial/List')
                }
            },
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
]

export default routes