const express = require('express');
const userCtrl = require ('../controllers/user');
const limiter = require ('../middleware/limiter');
const passwdCheck = require('../middleware/password');
const emailverif = require('../middleware/email-verif');

const router = express.Router();

// Inscription
router.post('/signup' ,emailverif, passwdCheck, userCtrl.signup);
//Connexion
router.post('/login',emailverif, passwdCheck, limiter ,userCtrl.login); 

module.exports = router;