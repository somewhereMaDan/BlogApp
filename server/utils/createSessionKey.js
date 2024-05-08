const createSessionKey = (userId) => {
    const time = new Date().getTime();

    return `${userId}_${time}`;
}

export default createSessionKey;