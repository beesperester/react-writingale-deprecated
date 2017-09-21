/**
 * Test if an object is empty.
 * 
 * @param {Object} obj
 * 
 * @return {Boolean}
 */
export function is_empty(obj) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }

    return true;
}

/**
 * Get value from object by dot-path-notation.
 * 
 * @param {String} path
 * @param {Object} obj
 * 
 * @return {*}
 */
export function get(path, obj) {
    path = path.split('.')
    const first_key = path.shift()

    if (obj[first_key]) {
        if (path.length > 0) {
            return get(path.join('.'), obj[first_key])
        }

        return obj[first_key]
    }

    return undefined;
}