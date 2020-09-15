import {
    http
} from "@/requests/request"


const admin = (data = {}, method = "GET", headers = {}) => {
    return http("/api/backend/admin/{id}", data, method, headers = {})
}

const role = (data = {}, method = "GET", headers = {}) => {
    return http("/api/backend/role/{id}", data, method, headers)
}

const adminRole = (data = {}, method = "GET", headers = {}) => {
    return http("/api/backend/adminRole/{admin_id}", data, method, headers = {})
}

const menu = (data = {}, method = "GET", headers = {}) => {
    return http("/api/backend/menu/{id}", data, method, headers = {})
}

const menuList = () => {
    return http("/api/backend/menuList")
}

const article = (data = {}, method = "GET", headers = {}) => {
    return http("/api/backend/article/{id}", data, method, headers = {})
}

const category = (data = {}, method = "GET", headers = {}) => {
    return http("/api/backend/category/{id}", data, method, headers = {})
}

const tag = (data = {}, method = "GET", headers = {}) => {
    return http("/api/backend/tag/{id}", data, method, headers = {})
}

const roleMenu = (data = {}, method = "GET", headers = {}) => {
    return http("/api/backend/roleMenu/{id}", data, method, headers = {})
}

const roleMenuList = (url, data = {}, method = {}, headers = {}) => {
    return http(url, data, method, headers = {})
}
const menuApiList = (data = {}, method = "GET", headers = {}) => {
    return http("/api/backend/menuApiList/{id}", data, method, headers = {})
}

const tutorial = (data = {}, method = "GET", headers = {}) => {
    return http("/api/backend/tutorial/{id}", data, method, headers = {})
}

const coverMenuList = (data = {}, method = "GET", headers = {}) => {
    return http("/api/backend/coverMenuList", data, method, headers = {})
}

const tutorialList = (data = {}, method = "GET", headers = {}) => {
    return http("/api/backend/tutorialList/{pid}", data, method, headers = {})
}

const upload = (data = {}, method = "POST", headers = {}) => {
    return http("/api/common/upload/image", data, method, headers = {})
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
    menuApiList,
    tutorial,
    coverMenuList,
    tutorialList,
    upload
}