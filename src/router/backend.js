import {
    menuList
} from "@/apis/backend/index"
import store from "../store/store";
import storage from "../store/storage"

function dynamicRouter() {
    menuList().then(res => {
        let backendRouter;
        backendRouter = dynamicBuild(res.data.data[0]);
        storage.setItem({
            name: 'backend_router',
            value: backendRouter,
            expires: new Date().getTime() + 60 * 60 * 1000
        });
        store.dispatch('GenerateRoutes', backendRouter)
    });
}

function dynamicBuild(source) {
    let element = {
        name: source.label,
        path: source.full_url,
        component: source.component
    };

    if (source.children != null) {
        element.children = [];
        source.children.forEach(item => {
            element.children.push(dynamicBuild(item));
        });

        return element;
    }

    return element;

}


export default dynamicRouter;