import {
    createStore
} from 'vuex'
import storage from "./storage";
import {
    BuildRoutes
} from "../router/index";
import router from '../router/index';


const store = new createStore({
    state: {
        userInfo: storage.getItem('user_info'),
        openMenus: storage.getItem('open_menus') || [],
        addRouters: null
    },
    getters: {
        routes: state => {
            return state.addRouters || null;
        },
    },
    mutations: {
        login: (state, info) => {
            state.userInfo = info;

            storage.setItem({
                name: 'user_info',
                value: info
            });
        },
        logout: (state) => {
            state.userInfo = null;
            storage.removeItem("user_info");
            storage.removeItem("backend_router");
            storage.removeItem("open_menu");
        },
        menu: (state, key) => {
            let idx;
            if ((idx = state.openMenus.indexOf(key)) == -1) {
                state.openMenus.push(key);
            } else {
                state.openMenus.splice(idx, 1);
            }
            storage.setItem({
                name: 'open_menus',
                value: state.openMenus,
                expires: new Date().getTime() + 60 * 60 * 1000
            });
        },
        generateRoutes: (state, routes) => {
            state.addRouters = routes;
            let routers = BuildRoutes(routes);
            router.addRoute(routers);
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


export default store;