import {
    view_import
} from '../utils/_import'
const routes = [{
        path: '/',
        name: 'front-index',
        component: function () {
            return view_import('front/Index')
        },

        children: [{
                path: '/',
                name: 'front-home',
                component: function () {
                    return view_import('front/Home')
                }
            },
            {
                path: 'article/:id',
                name: 'front-article',
                component: function () {
                    return view_import('front/pages/article/Index')
                }
            },
            {
                path: '/tutorial',
                name: 'front-tutorial',
                component: function () {
                    return view_import('front/pages/tutorial/List')
                }
            },
            {
                path: '/tutorialShow/:pid',
                name: 'front-tutorialShow',
                component: function () {
                    return view_import('front/pages/tutorial/Show')
                }
            },
            {
                path: '/bookmark',
                name: 'front-bookmark',
                component: function () {
                    return view_import('front/pages/bookmark/Index')
                }
            },
            {
                path: '/user/center',
                name: 'front-user_center',
                component: function () {
                    return view_import('front/pages/user/Index')
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'front-login',
        component: function () {
            return view_import('auth/Login')
        }
    },
    {
        path: '/register',
        name: 'front-register',
        component: function () {
            return view_import('auth/Register')
        }
    },
]

export default routes