import axios from 'axios';
import Message from "@/utils/message";
import router from "../router";

axios.interceptors.request.use(config => { //配置axios请求头
    console.log("config: ", config)
    console.log('user_info', localStorage.getItem('user_info'));
    let userInfo = localStorage.getItem("user_info");
    if (userInfo != '' && userInfo != null) {
        config.headers.token = JSON.parse(localStorage.getItem('user_info')).data.token;
    }
    return config;
}, error => {
    Message({
        showClose: true,
        message: error,
        type: "error"
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
                    Message({
                        showClose: true,
                        message: "权限不足",
                        type: "error"
                    });
                    // 返回 401 清除token信息并跳转到登录页面
                    router.app.$options.store.commit("logout");
                    router.push({
                        path: '/login'
                    })
                    console.log(error);
                    return
            }
        }
        console.log(error);
        return Promise.reject(error) // 返回接口返回的错误信息
    }
);