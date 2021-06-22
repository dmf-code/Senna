import {
    defineAsyncComponent
} from 'vue';

// function view_import(file) {
//     return defineAsyncComponent(() => import(`../views/${file}.vue`))
// }

function view_import(file) {
    return import(`../views/${file}.vue`);
}

export {
    view_import,
}