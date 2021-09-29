const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js');
require('dotenv').config({path: 'config.env'});

const key = crypto.enc.Base64.parse(process.env.CR_KEY);
const iv = crypto.enc.Base64.parse(process.env.CR_IV);

exports.signup = (req,res,next) =>{
    const secretMail = crypto.AES.encrypt(req.body.email, key, {iv : iv}).toString(); 
    bcrypt.hash(req.body.password,10)
    .then(hash => { 
        const user = new User({ // Créer l'utilisateur, si l'adresse est déjà utilisée on aura une erreur grâce à la vérif mongo
            email: secretMail, 
            password: hash,
        });
        user.save()
        .then(() => res.status(201).json({message: "Utilisateur ajouté à la base de donnée"}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(404).json({error}));
};

exports.login = (req,res,next) =>{
    const secretMail = crypto.AES.encrypt(req.body.email, key, {iv : iv}).toString(); 
    User.findOne({email: secretMail}) 
    .then(user =>{
        if (!user){
            return res.status(404).json({error: "utilisateur inexisant"});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid =>{
            if (!valid){
                return res.status(401).json({error:"Mot de passe incorrect"});
            }
            else{
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        {userId: user._id},
                        process.env.TOKEN,
                    )
                });
            }
        })
        .catch(error => res.status(500).json({error: error}));
    })
    .catch(error => res.status(500).json({error})); 
};

