import axios from 'axios';
import Message from "@/utils/message";
import router from "../router";

// 创建axios实例
var instance = axios.create({
    timeout: 1000 * 12
});

// 请求超时设置
// axios.defaults.timeout = 10000


//配置axios请求头
instance.interceptors.request.use(config => {
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
instance.interceptors.response.use(
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

export default instance;