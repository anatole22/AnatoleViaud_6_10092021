const multer = require('multer');

const MIME_types ={
    'image/jpg':'jpg',
    'image/jpeg':'jpg',
    'image/png':'png'
};

const storage = multer.diskStorage({
    destination :(req,fil,callback) =>{
        callback(null,'images');
    },
    filename:(req,file,callback) =>{
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_types[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
})
module.exports = multer({storage}).single('image');