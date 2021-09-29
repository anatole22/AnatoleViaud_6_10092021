const Sauce = require('../models/sauce');
const fs =require('fs');

exports.getAll = (req,res,next) =>{
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
};


exports.getOne = (req,res,next) =>{
    Sauce.findOne( {_id : req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}));
};

exports.addSauce = (req,res,next) =>{
    const sauceObj = JSON.parse(req.body.sauce);
    delete sauceObj._id;
    const sauce = new Sauce({
        ...sauceObj,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
    .then(() => res.status(201).json({message : "Sauce Ajoutée"}))
    .catch(error => res.status(400).json({error}));
};

exports.modifySauce = (req,res,next) =>{
    const sauceObj = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};

    Sauce.updateOne({_id : req.params.id}, {...sauceObj, _id : req.params.id})
    .then(() => res.status(200).json({message: "Sauce mise à jour"}))
    .catch(error => res.status(404).json({error}));
};

exports.deleteOneSauce = (req,res,next) =>{
    Sauce.findOne({_id: req.params.id})
    .then(sauce =>{
        console.log(req.body.decodedId);
        if (sauce.userId != req.body.decodedId){
            return res.status(403).json({error : "Utilisateur non authentifié"});
        }

        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () =>{
            Sauce.deleteOne({_id:req.params.id})
            .then(() => res.status(200).json({message : "Sauce supprimée"}))
            .catch(error => res.status(404).json({error}));
        })
    })
    .catch(error => res.status(500).json({error}));
};

exports.likeSauce = (req,res,next) =>{
    const likeValue = req.body.like;
    const userId = req.body.userId;

    if (likeValue === 1)
    {
        Sauce.updateOne({_id : req.params.id},{
        $inc: {likes: 1},
        $push: {usersLiked : userId}
        })
        .then(() => res.status(200).json({message :"Like ajouté"}))
        .catch(error => res.status(404).json({error}));
    }
    else if (likeValue === -1)
    {
        Sauce.updateOne({_id : req.params.id},{
            $inc: {dislikes: 1},
            $push: {usersDisliked : userId}
            })
            .then(() => res.status(200).json({message :"Dislike ajouté"}))
            .catch(error => res.status(404).json({error}));
    }
    else {
        Sauce.findOne({_id : req.params.id}) // trouver la sauce et regarder quel tableau doit être modifié
        .then(sauce => {
            if (sauce.usersLiked.includes(userId))
            {
                Sauce.updateOne({_id : req.params.id},{
                    $inc: {likes: -1},
                    $pull: {usersLiked : userId}
                    })
                    .then(() => res.status(200).json({message :"Like retiré"}))
                    .catch(error => res.status(400).json({error}));
            }
            if (sauce.usersDisliked.includes(userId))
            {
                Sauce.updateOne({_id : req.params.id},{
                    $inc: {dislikes: -1},
                    $pull: {usersDisliked : userId}
                    })
                    .then(() => res.status(200).json({message :"Dislike retiré"}))
                    .catch(error => res.status(400).json({error}));
            }
        })
        .catch(error => res.status(400).json({error}));
    }
};