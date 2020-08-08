import {
    menuList
} from "@/apis/backend/index"
import _import from "./_import";
import router from "./index";
import {
    createRouter
} from './index'
import storage from "../store/storage";
import FrontEnd from "./frontend"

function dynamicRouter() {
    menuList().then(res => {
        let backendRouter;
        backendRouter = dynamicBuild(res.data.data[0]);
        console.log('backend: ', backendRouter);
        storage.setItem({
            name: 'backend_router',
            value: backendRouter,
            expires: new Date().getTime() + 60 * 60 * 1000
        });
        router.match = createRouter([backendRouter.concat(FrontEnd)]).match;
        router.addRoutes([backendRouter]);
    });
}

// function getViews(path) {
//     return resolve => {
//         require.ensure([], (require) => {
//             resolve(require(path + '.vue'))
//         })
//     }
// }

function dynamicBuild(source) {
    let element = {
        name: source.label,
        path: source.full_url,
        component: _import(source.component),
    };

    if (source.children != null) {
        // delete element.name;
        element.children = [];
        source.children.forEach(item => {
            element.children.push(dynamicBuild(item));
        });

        return element;
    }

    return element;

}


export default dynamicRouter


// const routes = [{
//     path: '/admin',
//     meta: {
//         requireAuth: true
//     },
//     component: function () {
//         return import( /* webpackChunkName: "about" */ '@/views/admin/Index')
//     },
//     children: [{
//             path: '/',
//             meta: {
//                 requireAuth: true
//             },
//             component: function () {
//                 return import( /* webpackChunkName: "about" */ '@/views/admin/Dashboard')
//             }
//         },
//         {
//             path: '/admin/dashboard',
//             name: 'dashboard',
//             meta: {
//                 requireAuth: true
//             },
//             component: function () {
//                 return import( /* webpackChunkName: "about" */ '@/views/admin/Dashboard')
//             }
//         },
//         {
//             path: '/admin/permission',
//             name: 'permission',
//             component: function () {
//                 return import( /* webpackChunkName: "about" */ '@/views/admin/Route')
//             },
//             children: [{
//                     path: '/admin/permission/menu',
//                     name: 'menu',
//                     meta: {
//                         requireAuth: true
//                     },
//                     component: function () {
//                         return import( /* webpackChunkName: "about" */ '@/views/admin/pages/menu/List')
//                     }
//                 }, {
//                     path: '/admin/permission/role',
//                     name: 'role',
//                     meta: {
//                         requireAuth: true
//                     },
//                     component: function () {
//                         return import( /* webpackChunkName: "about" */ '@/views/admin/pages/role/List')
//                     }
//                 },
//                 {
//                     path: '/admin/permission/user',
//                     name: 'user',
//                     meta: {
//                         requireAuth: true
//                     },
//                     component: function () {
//                         return import( /* webpackChunkName: "about" */ '@/views/admin/pages/user/List')
//                     }
//                 }, {
//                     path: '/admin/permission/adminRole',
//                     name: 'adminRole',
//                     meta: {
//                         requireAuth: true
//                     },
//                     component: function () {
//                         return import( /* webpackChunkName: "about" */ '@/views/admin/pages/adminRole/List')
//                     }
//                 },
//                 {
//                     path: '/admin/permission/roleMenu',
//                     name: 'roleMenu',
//                     meta: {
//                         requireAuth: true
//                     },
//                     component: function () {
//                         return import( /* webpackChunkName: "about" */ '@/views/admin/pages/roleMenu/List')
//                     }
//                 },
//                 {
//                     path: '/admin/permission/url',
//                     name: 'url',
//                     meta: {
//                         requireAuth: true
//                     },
//                     component: function () {
//                         return import( /* webpackChunkName: "about" */ '@/views/admin/pages/url/List')
//                     }
//                 },
//             ]
//         },
//         {
//             path: '/admin/article',
//             name: "article",
//             component: function () {
//                 return import( /* webpackChunkName: "about" */ '@/views/admin/Route')
//             },
//             children: [{
//                 path: '/admin/article/list',
//                 meta: {
//                     requireAuth: true
//                 },
//                 component: function () {
//                     return import( /* webpackChunkName: "about" */ '@/views/admin/pages/article/List')
//                 }
//             }, {
//                 path: '/admin/article/add',
//                 meta: {
//                     requireAuth: true
//                 },
//                 component: function () {
//                     return import( /* webpackChunkName: "about" */ '@/views/admin/pages/article/Add')
//                 }
//             }, ]
//         },
//         {
//             path: '/admin/category',
//             name: "category",
//             component: function () {
//                 return import( /* webpackChunkName: "about" */ '@/views/admin/Route')
//             },
//             children: [{
//                     path: '/admin/category/list',
//                     meta: {
//                         requireAuth: true
//                     },
//                     component: function () {
//                         return import( /* webpackChunkName: "about" */ '@/views/admin/pages/category/List')
//                     }
//                 },
//                 {
//                     path: '/admin/category/add',
//                     meta: {
//                         requireAuth: true
//                     },
//                     component: function () {
//                         return import( /* webpackChunkName: "about" */ '@/views/admin/pages/category/Add')
//                     }
//                 },
//             ]
//         },
//         {
//             path: '/admin/tag',
//             name: "tag",
//             component: function () {
//                 return import( /* webpackChunkName: "about" */ '@/views/admin/Route')
//             },
//             children: [{
//                     path: '/admin/tag/list',
//                     meta: {
//                         requireAuth: true
//                     },
//                     component: function () {
//                         return import( /* webpackChunkName: "about" */ '@/views/admin/pages/tag/List')
//                     }
//                 },
//                 {
//                     path: '/admin/tag/add',
//                     meta: {
//                         requireAuth: true
//                     },
//                     component: function () {
//                         return import( /* webpackChunkName: "about" */ '@/views/admin/pages/tag/Add')
//                     }
//                 },
//             ]
//         },

//         {
//             path: '/admin/tutorial',
//             name: "tutorial",
//             component: function () {
//                 return import( /* webpackChunkName: "about" */ '@/views/admin/Route')
//             },
//             children: [{
//                 path: '/admin/tutorial/index',
//                 meta: {
//                     requireAuth: true
//                 },
//                 component: function () {
//                     return import( /* webpackChunkName: "about" */ '@/views/admin/pages/tutorial/List')
//                 }
//             }, {
//                 path: '/admin/tutorial/menu',
//                 meta: {
//                     requireAuth: true
//                 },
//                 component: function () {
//                     return import( /* webpackChunkName: "about" */ '@/views/admin/pages/tutorial/menu/Menu')
//                 }
//             }, ]
//         },
//     ]
// }]

// export default routes