const verif = require('email-validator');

module.exports = (req, res, next) => {

    req.body.email = req.body.email.trim();

    if (verif.validate(req.body.email))
        next();
    else   
        return res.status(400).json({error : "Format de mail incorrect"});
}