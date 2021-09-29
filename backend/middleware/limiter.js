const rateLimit = require('express-rate-limit');

const limit = rateLimit({
    windowMs: 60 * 60 * 1000,  // x * 60 * 1000 => x minutes car 60 000 ms (60*1000) dans une minute
    max: 20,
    message: "Nombre de tentatives dépassées"
})

module.exports = limit;