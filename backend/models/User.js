const mongoose = require('mongoose');
const uValidator = require('mongoose-unique-validator');
const mongooseErrorHandle = require('mongoose-mongodb-errors');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type:String, required:true}
});

userSchema.plugin(uValidator);
userSchema.plugin(mongooseErrorHandle);

module.exports = mongoose.model('User', userSchema);