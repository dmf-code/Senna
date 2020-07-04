import {
    http
} from "../../requests/request"

const getArticleList = () => {
    return http("/api/front/article", {}, "GET")
}

const getArticle = (id) => {
    return http("/api/front/article/{id}")
}

export {
    getArticleList,
    getArticle
}