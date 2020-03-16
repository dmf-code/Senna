import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        is_login: localStorage.getItem('is_login') ? Boolean(localStorage.getItem('is_login')) : false,
        user_info: localStorage.getItem('user_info') ? JSON.parse(localStorage.getItem('user_info')) : ''
    },
    mutations: {
        login: (state, info) => {
            state.is_login = true;
            state.user_info = info;
            localStorage.setItem('is_login', true);
            localStorage.setItem('user_info', JSON.stringify(info));
        },
        logout: (state) => {
            state.is_login = false;
            state.user_info = "";
            localStorage.setItem('is_login', false);
            localStorage.setItem('user_info', "");
        }
    }
});