import axios from 'axios';
import {
    ElMessage
} from 'element-plus'
import router from "../router";
import storage from "../store/storage"
import {
    empty
} from "../utils/common"

// 创建axios实例
var instance = axios.create({
    timeout: 1000 * 12
});

// 请求超时设置
// axios.defaults.timeout = 10000


export {
    instance
}

//配置axios请求头
instance.interceptors.request.use(config => {
    let userInfo = storage.getItem('user_info');
    if (userInfo != '' && userInfo != null) {
        config.headers.token = userInfo.token;
    }
    return config;
}, error => {
    ElMessage({
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
                    ElMessage({
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

//封装get接口
// params={} 是设置默认值
export function get(url, params = {}, headers = {}) {
    if ('t' in params) {
        params.t = new Date().getTime(); //get方法加一个时间参数,解决ie下可能缓存问题.
    }
    return instance.request({
        url: url,
        method: 'get',
        headers: headers,
        params
    })
}

//封装post请求
export function post(url, data = {}, headers = {
    'Content-Type': 'application/json;charset=UTF-8'
}) {
    //默认配置
    let sendObject = {
        url: url,
        method: "post",
        headers: headers,
        data: data
    };
    // JSON数据序列化
    if (headers['Content-Type'] == "application/json;charset=UTF-8") {
        sendObject.data = JSON.stringify(data);
    }
    return instance.request(sendObject)
}

//封装put方法 (restfulAPI常用)
function put(url, data = {}, headers = {
    'Content-Type': 'application/json;charset=UTF-8'
}) {
    return instance.request({
        url: url,
        method: 'put',
        headers: headers,
        data: JSON.stringify(data)
    })
}

//删除方法(restfulAPI常用)
function deletes(url, headers = {}) {
    return instance.request({
        url: url,
        method: 'delete',
        headers: headers
    })
}

//patch方法(restfulAPI常用)
function patch(url, headers = {}) {
    return instance.request({
        url: url,
        method: 'patch',
        headers: headers
    })
}

//处理格式化URL（/demo/{id}）
function render(url, data) {
    var re = /{([^]+)?}/
    var match = ''
    // restful 处理优点
    let params;
    if (router) {
        params = router.currentRoute.value.params;
    } else {
        params = null;
    }
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
    return url
}

const fetch = (options) => {
    //process.env.VUE_APP_PATH为环境变量在.env文件中配置
    // let url = process.env.VUE_APP_PATH + options.url;
    let url = render(options.url, options.data)
    switch (options.method.toUpperCase()) {
        case 'GET':
            return get(url, options.data, options.headers)
        case 'POST':
            return post(url, options.data, options.headers)
        case 'PUT':
            return put(url, options.data, options.headers)
        case 'DELETE':
            return deletes(url, options.data, options.headers)
        case 'PATCH':
            return patch(url, options.data, options.headers)
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
export function http(url = '', data = {}, method = "GET", headers = {}) {
    const options = {
        url: url,
        data: data,
        method: method,
        headers: headers
    }
    return fetch(options)
        .catch(error => {
            console.log(error)
            throw error
        })
}