import {
    http
} from "@/requests/request"


const admin = (data = {}, method = "GET") => {
    return http("/api/backend/admin/{id}", data, method)
}

const role = () => {
    return http("/api/backend/role")
}

const adminRole = (data = {}, method = "GET") => {
    return http("/api/backend/adminRole/{admin_id}", data, method)
}

const menu = (data = {}, method = "GET") => {
    return http("/api/backend/menu/{id}", data, method)
}

const menuList = () => {
    return http("/api/backend/menuList")
}

const article = (data = {}, method = "GET") => {
    return http("/api/backend/article/{id}", data, method)
}

const category = (data = {}, method = "GET") => {
    return http("/api/backend/category/{id}", data, method)
}

const tag = (data = {}, method = "GET") => {
    return http("/api/backend/tag/{id}", data, method)
}

const roleMenu = (data = {}, method = "GET") => {
    return http("/api/backend/roleMenu/{id}", data, method)
}

const roleMenuList = (url, data, method) => {
    return http(url, data, method)
}
const menuApiList = (data, method = "GET") => {
    return http("/api/backend/menuApiList/{id}", data, method)
}

export {
    admin,
    role,
    adminRole,
    menu,
    menuList,
    article,
    category,
    tag,
    roleMenu,
    roleMenuList,
    menuApiList
}