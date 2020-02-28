import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        is_login: false,
        user_info: localStorage.getItem('user_info') ? localStorage.getItem('user_info') : ''
    },
    mutations: {
        login: (state, info) => {
            state.is_login = true;
            localStorage.setItem('user_info', JSON.stringify(info));
        }
    }
});