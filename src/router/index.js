import Vue from 'vue'
import VueRouter from 'vue-router'
import Frontend from "@/router/frontend"
import Backend from "@/router/backend"
import storage from "../store/storage"
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
    if (userInfo) {
      let backendRouter = storage.getItem('backend_router');
      console.log('2222', backendRouter);
      if (backendRouter == null) {
        console.log('into');
        Backend();
      } else {
        console.log('backend_router: ', backendRouter);
        if (!isArray(backendRouter)) {
          backendRouter = [backendRouter];
        }
        router.addRoutes(backendRouter);
      }
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