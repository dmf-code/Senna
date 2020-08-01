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


function isObject(obj) {
    // typeof 无法检测数组和对象之间的区别
    if (obj instanceof Object) {
        return true;
    }
    return false;
}

function isArray(obj) {
    if (obj instanceof Array) {
        return true;
    }
    return false;
}

function isString(obj) {
    if (obj instanceof String) {
        return true;
    }
    return false;
}

function isNumber(obj) {
    if (obj instanceof Number) {
        return true;
    }
    return false;
}

function isBool(obj) {
    if (obj instanceof Boolean) {
        return true;
    }
    return false;
}

function isNull(obj) {
    if (obj instanceof null) {
        return true;
    }
    return false;
}

function isUndefined(obj) {
    if (obj instanceof undefined) {
        return true;
    }
    return false;
}

function isFunction(obj) {
    if (obj instanceof Function) {
        return true;
    }
    return false;
}

export {
    empty,
    isObject,
    isArray,
    isString,
    isNumber,
    isBool,
    isNull,
    isUndefined,
    isFunction
}