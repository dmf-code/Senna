import Vue from 'vue'
import VueRouter from 'vue-router'
import Frontend from "@/router/frontend"
import Backend from "@/router/backend"

Vue.use(VueRouter)

const routes = [{
    path: "/refresh",
    name: "refresh",
    component: () => import('@/views/Refresh')
  },

  ...Frontend,
  ...Backend

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