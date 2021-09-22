const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../models/User')

const TOKEN = process.env.TOKEN;

// Function pour création et connexion utilisateur 

// SIGNUP 

exports.signup = (req, res, next) => {
  // mot de passe non accepté 
  if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{6,})/.test(req.body.password)) {   // test de l'efficasiter du mot de passe 
    return res.status(401).json({ error: 'Le mot de passe doit contenir une lettre majuscule, une minuscule et au moins 1 chiffre (6 caractères min)' });
  } else {
    // si le mot de passe est accepté
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        })
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  }
};

// LOGIN 

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) // cherche l'utilisateur 
    .then(user => {
      if (!user) { // si l'utilisateur n'est pas trouvé
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) // si l'utilisateur est trouvé ont compare le MDP donné avec celui dans la base de donnée
        .then(valid => { 
          if (!valid) { 
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({ 
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              TOKEN,
              { expiresIn: '8h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


