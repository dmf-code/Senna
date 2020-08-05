import Vue from 'vue'
import VueRouter from 'vue-router'
import Frontend from "@/router/frontend"
import Backend from "@/router/backend"
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


router.beforeEach((to, from, next) => {

  if (to.path.search("/admin") != -1) {
    var userInfo = storage.getItem('user_info');
    console.log(isObject(userInfo));
    if (isObject(userInfo)) {
      console.log('routes: ', store.getters.routes);
      if (store.getters.routes == null || store.getters.routes.length === 0) {
        let backendRouter = storage.getItem('backend_router');
        if (backendRouter == null) {
          backendRouter = Backend();
        } else {
          console.log('backend_router: ', backendRouter);
          if (!isArray(backendRouter)) {
            backendRouter = [backendRouter];
          }
          router.addRoutes(backendRouter);
          router.addRoutes([{
            path: '*',
            redirect: '/404',
            hidden: true
          }]);
        }
        store.dispatch('GenerateRoutes', backendRouter);
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

export default router