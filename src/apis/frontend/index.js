import {
    http
} from "../../requests/request"

// 权限验证接口

const login = (data) => {
    return http("/api/login", data, "POST")
}

const register = (data) => {
    return http("/api/register", data, "POST")
}

const getCaptcha = (data) => {
    return http("/api/getCaptcha", data, "POST")
}

export {
    login,
    register,
    getCaptcha
}

// 文章接口

const getArticleList = () => {
    return http("/api/front/article", {}, "GET")
}

const getArticle = () => {
    return http("/api/front/article/{id}")
}

export {
    getArticleList,
    getArticle
}