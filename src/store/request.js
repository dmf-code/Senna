import axios from 'axios';
import {
    Message
} from "element-ui";
import router from "../router";

axios.interceptors.request.use(config => { //配置axios请求头
    // console.log("config: ", config)
    // console.log(store.state.user_info.token);
    // console.log(JSON.parse(localStorage.getItem('user_info')));
    if (localStorage.getItem("user_info") != '') {
        config.headers.token = JSON.parse(localStorage.getItem('user_info')).data.token;
    }
    return config;
}, error => {
    Message({
        showClose: true,
        message: error,
        type: "error.data.error.message"
    });
    return Promise.reject(error.data.error.message);
})

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
    res => {
        return res;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    router.app.$options.store.commit("logout");
                    router.push({
                        path: '/login'
                    })
            }
        }
        return Promise.reject(error.response.data) // 返回接口返回的错误信息
    }
);