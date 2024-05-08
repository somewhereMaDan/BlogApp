/*
session = {
    userId : {
        key : ////
        time: 
    }
}

*/

const session = {}

const addSessionKey = (key, value) => {
    session[key] = value
}

const getValue = (key) => {
    return session[key]
}

const removeKey = (key) => {
    delete session[key]
}

const checkSessionKey = (key, value) => {
    if (!session[key] || !key) return false

    return session[key] === value
}

export { addSessionKey, getValue, removeKey, checkSessionKey }