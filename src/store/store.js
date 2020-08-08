import Vue from "vue";
import Vuex from "vuex";
import storage from "./storage"
import router from "../router/index";
import {
    isObject,
    isNull,
    isUndefined
} from "../utils/common";

Vue.use(Vuex);

function BuildRoutes(routes) {
    let element = {
        name: routes.name,
        path: routes.path,
        component: () => import(`@/${routes.component}.vue`)
    };

    console.log(routes.name);
    console.log(routes.path);
    console.log(routes.component);
    console.log(routes.children);

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
    console.log(element);
    return element;
}

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
            let routers = BuildRoutes(routes);
            console.log('generateRoutes', routers);
            if (isObject(routers)) {
                routers = [routers];
            }
            console.log('generateRoutes 2', routers);
            router.addRoutes(routers);
            // router.match = createRouter(routers).match;
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