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
    console.log('aaaaaaaaaaaaa');
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
                    console.log("into error");
                    console.log(error);
                    return
            }
        }
        console.log(error);
        return Promise.reject(error) // 返回接口返回的错误信息
    }
);

//封装get接口
// params={} 是设置默认值
export function get(url, params = {}) {
    params.t = new Date().getTime(); //get方法加一个时间参数,解决ie下可能缓存问题.
    return instance.request({
        url: url,
        method: 'get',
        // headers: {},
        params
    })
}

//封装post请求
export function post(url, data = {}) {
    //默认配置
    let sendObject = {
        url: url,
        method: "post",
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: data
    };
    sendObject.data = JSON.stringify(data);
    return instance.request(sendObject)
}

//封装put方法 (restfulAPI常用)
function put(url, data = {}) {
    return instance.request({
        url: url,
        method: 'put',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(data)
    })
}

//删除方法(restfulAPI常用)
function deletes(url) {
    return instance.request({
        url: url,
        method: 'delete',
        headers: {}
    })
}

//patch方法(restfulAPI常用)
function patch(url) {
    return instance.request({
        url: url,
        method: 'patch',
        headers: {}
    })
}

function empty(obj) {
    switch (typeof obj) {
        case 'object':
            if (JSON.stringify(obj) == '{}') {
                return true;
            } else {
                return false;
            }
    }
}

//处理格式化URL（/demo/{id}）
function render(url, data) {
    var re = /{([^]+)?}/
    var match = ''
    // restful 处理优点 
    let params = router.history.current.params;
    // let query = router.history.query;
    if (!empty(params)) {
        for (let param in params) {
            data[param] = params[param];
        }
    }
    while ((match = re.exec(url))) {
        if (match[1] in data) {
            url = url.replace(match[0], data[match[1]])
        } else {
            url = url.replace(match[0], '');
            let pos = url.lastIndexOf('/');
            url = url.substr(0, pos);
        }
    }
    console.log('1111111', url)
    return url
}

const fetch = (options) => {
    //process.env.VUE_APP_PATH为环境变量在.env文件中配置
    // let url = process.env.VUE_APP_PATH + options.url;

    let url = render(options.url, options.data)
    switch (options.method.toUpperCase()) {
        case 'GET':
            return get(url, options.data)
        case 'POST':
            return post(url, options.data)
        case 'PUT':
            return put(url, options.data)
        case 'DELETE':
            return deletes(url, options.data)
        case 'PATCH':
            return patch(url, options.data)
        default:
            return instance.request(options)
    }
}

/**
 * 提供一个http方法
 * url 访问路径 不包括域名和项目名
 * data 参数对象
 * method 请求方式
 *  */
export function http(url = '', data = {}, method = "GET") {
    const options = {
        url: url,
        data: data,
        method: method
    }
    console.log(options);
    return fetch(options)
    //     .catch(error => {
    //     console.log("eereeerreerer")
    //     console.log(error)
    //     throw error
    // })
}