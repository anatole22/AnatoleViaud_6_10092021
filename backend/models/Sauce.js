const mongoose = require('mongoose');
const errorHandle = require('mongoose-mongodb-errors');

const sauceSchema = mongoose.Schema({
    userId:{type: String, required: true, unique: false},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required:true},
    likes: {type: Number},
    dislikes: {type: Number},
    usersLiked: [{type: String}], 
    usersDisliked: [{type: String}] 
})

sauceSchema.plugin(errorHandle);

module.exports = mongoose.model('Sauce', sauceSchema);