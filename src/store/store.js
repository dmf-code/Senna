import Vue from "vue";
import Vuex from "vuex";
import storage from "./storage"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user_info: storage.getItem('user_info'),
        menus: [],
        addRouters: null
    },
    getters: {
        routes: state => {
            return state.addRouters || null;
        },
    },
    mutations: {
        login: (state, info) => {
            state.user_info = info;
            console.log(info);

            storage.setItem({
                name: 'user_info',
                value: info
            });
        },
        logout: (state) => {
            state.user_info = null;
            storage.removeItem("user_info");
            storage.removeItem("backend_router");
        },
        menu: (index) => {
            if ((idx = state.menus.indexOf(index)) == -1) {
                this.openIndex.push(index);
            } else {
                this.openIndex.splice(idx, 1);
            }
        },
        generateRoutes: (state, routes) => {
            state.addRouters = routes;
        }
    },
    actions: {
        logout(state) {
            state.commit("logout");
        },
        GenerateRoutes(state, routes) {
            state.commit('generateRoutes', routes);
        }
    }
});