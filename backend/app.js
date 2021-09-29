require('dotenv').config({path :'./config.env'});
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const helmet = require('helmet');
const cookiesession = require('cookie-session');

const app = express();

mongoose.connect(process.env.DB_ACCESS,
{
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => console.log("Connexion à MongoDB réussie"))
    .catch(() => console.log("Connexion à MongoDB échouée"));

// Rendre plus difficile l'exploitation des Headers
app.use(helmet());
app.disable('x-powered-by');

app.use(cookiesession({
    name:'session',
    secret:'session cookie',
    maxAge: 24 * 60 * 60 * 1000, //si on a des cookies, max 24h de durée
    options:{
        httpOnly:true,
    }
}))

app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,  OPTIONS, PATCH');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;