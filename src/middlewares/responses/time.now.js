function timeNow (req, res, next) {
    const today = new Date()
    console.log('Time:', today.toLocaleDateString(), today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds())
    next()
};

export default timeNow;