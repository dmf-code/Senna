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

// 教程接口

const tutorial = (data = {}, method = "GET", headers = {}) => {
    return http("/api/front/tutorial/{id}", data, method, headers = {})
}

const tutorialContent = (data = {}, method = "GET", headers = {}) => {
    return http("/api/front/tutorialContent/{id}", data, method, headers = {})
}

const tutorialList = (data = {}, method = "GET", headers = {}) => {
    return http("/api/front/tutorialList/{pid}", data, method, headers = {})
}

export {
    tutorial,
    tutorialList,
    tutorialContent
}

const category = (data = {}, method = "GET", headers = {}) => {
    return http("/api/front/category/{id}", data, method, headers = {})
}

const nav = (data = {}, method = "GET", headers = {}) => {
    return http("/api/backend/nav/{id}", data, method, headers)
}


export {
    category,
    nav
}