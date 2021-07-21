import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Frontend from "./frontend"
// import Backend from "@/router/backend"
import storage from "../store/storage"
import Store from "../store/store"

import {
  isArray,
  isObject,
  isNull,
  isUndefined
} from "../utils/common";


const routes = [{
    path: "/refresh",
    name: "refresh",
    component: () => import('../views/Refresh.vue')
  },

  ...Frontend,
  // ...Backend

]


// 定义一个函数来创建router
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})

router.beforeEach((to, from, next) => {


  if (to.path.search("/admin") != -1) {
    let userInfo = storage.getItem('user_info');

    if (isObject(userInfo)) {

      if (Store.getters.routes == null || Store.getters.routes.length === 0) {

        let backendRouter = storage.getItem('backend_router');
        // console.log(backendRouter);
        Store.dispatch('GenerateRoutes', backendRouter);


        if (!isArray(backendRouter)) {
          backendRouter = [backendRouter];
        }

        next({
          ...to,
          replace: true
        });
        // return
      }
    } else {
      router.app.$options.store.dispatch("logout");
      next("/login");
      return
    }
  }
  next();
});

export function BuildRoutes(routes) {
  let element = {
    name: routes.name + '-' + routes.path,
    path: routes.path,
    component: () => import(`../views/${routes.component}.vue`)
  };

  // console.log(element);
  // console.log(routes);
  if (routes.component == "") {
    delete element.component;
  }

  if (!isNull(routes.children) || !isUndefined(routes.children)) {
    element.children = [];
    routes.children.forEach(item => {
      element.children.push(BuildRoutes(item));
    });

    return element;
  }

  return element;
}

export default router