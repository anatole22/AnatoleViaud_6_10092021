const pass = require('../models/password');
const escapeHTML =require('escape-html');

// https://github.com/component/escape-html  -> " ' & < >

module.exports = (req, res,next) =>{

    req.body.password = escapeHTML(req.body.password); // Eviter injection de code html 
    const blackList =["\$", "\{", "\}", "\:", "\/"]; // Eviter injection NoSQL 
    for (c of req.body.password)
    {
        if (blackList.includes(c))
        {
            return res.status(400).json({error: "Caractères non autorisés dans le mot de passe"});
        }
    }

    if (pass.validate(req.body.password)){
        next();
    }
    else
    {
        return res.status(400).json({error:"Mot de passe pas assez fort"});
    }
};