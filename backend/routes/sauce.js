const express = require('express');
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sanitizer = require('../middleware/sauce-sanitize');
const router = express.Router();

//Obtenir toutes les sauces pour la liste d'accueil
router.get('/', auth, sauceCtrl.getAll);
//Consulter les infos pour une sauce lors de la sélection depuis la liste d'accueil
router.get('/:id',auth, sauceCtrl.getOne);
//Ajouter une sauce
router.post('/', auth, multer,sanitizer, sauceCtrl.addSauce);
//Modifier une sauce
router.put('/:id', auth, multer, sanitizer, sauceCtrl.modifySauce);
//Supprimer une sauce
router.delete('/:id', auth, sauceCtrl.deleteOneSauce);
//Post un like/dislike
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;
