const jwt = require('jsonwebtoken');
require ('dotenv').config({path : "config.env"});

module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoder = jwt.verify(token, process.env.TOKEN);
        const userId = decoder.userId;
        req.body.decodedId = userId;
        if (req.body.userId && req.body.userId !== userId){
            throw 'UserId non valable';
        }
        else{
            next();
        }
    }catch(error){
        res.status(401).json({error: error});
    }
}