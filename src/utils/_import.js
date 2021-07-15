function view_import(file) {
    return import(`../views/${file}.vue`);
}

export {
    view_import,
}