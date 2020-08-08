import Vue from 'vue'
import VueRouter from 'vue-router'
import Frontend from "@/router/frontend"
// import Backend from "@/router/backend"
import storage from "../store/storage"
import store from "../store/store"
import {
  isArray,
  isObject
} from "../utils/common"

Vue.use(VueRouter)

const routes = [{
    path: "/refresh",
    name: "refresh",
    component: () => import('@/views/Refresh')
  },

  ...Frontend,
  // ...Backend

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 定义一个函数来创建router
export const createRouter = routes => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {

  if (to.path.search("/admin") != -1) {
    let userInfo = storage.getItem('user_info');
    if (isObject(userInfo)) {
      if (store.getters.routes == null || store.getters.routes.length === 0) {

        let backendRouter = storage.getItem('backend_router');
        store.dispatch('GenerateRoutes', backendRouter);


        if (!isArray(backendRouter)) {
          backendRouter = [backendRouter];
        }

        next({
          ...to,
          replace: true
        });
      }
    } else {
      router.app.$options.store.dispatch("logout");
      next("/login");
      return
    }
  }
  next();
});


/* 路由异常错误处理，尝试解析一个异步组件时发生错误，重新渲染目标页面 */
// router.onError((error) => {
//   const pattern = /Loading chunk (\d)+ failed/g;
//   const isChunkLoadFailed = error.message.match(pattern);
//   const targetPath = router.history.pending.fullPath;
//   if (isChunkLoadFailed) {
//     router.replace(targetPath);
//   }
// });

export default router