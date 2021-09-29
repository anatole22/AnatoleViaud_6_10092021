const escapeHTML =require('escape-html');

// https://github.com/component/escape-html  -> " ' & < >

/*
* Sanitize les inputs utilisateurs
* @param - la chaine de caractères sur laquelle appliquer le sanitize
* @return string - la chaine après le sanitize, "" si le parametre n'est pas une string
*/
const sanitize = (param) =>{
    if (typeof param != 'string') return "";
    param.trim();
    param = escapeHTML(param);
    const blackList =["\$", "\{", "\}", "\/", "\="];
    let temp = "";

    for (let i = 0; i < param.length; i++)
        if (!blackList.includes(param[i]))
            temp += param[i];
        
    return temp;
}

module.exports = (req,res,next) =>{

    const sauce = req.file ? JSON.parse(req.body.sauce) :  req.body;
    
    sauce.name=sanitize(sauce.name);
    sauce.manufacturer=sanitize(sauce.manufacturer);
    sauce.description=sanitize(sauce.description);
    sauce.mainPepper = sanitize(sauce.mainPepper); 

    if (sauce.name.length === 0 || sauce.manufacturer.length === 0 || sauce.description.length === 0 || sauce.mainPepper.length === 0)
        return res.status(400).json({error: "Modification impossible car champ vide"});
    else{
          //renvoyer l'objet formaté et ayant passé les tests
        req.body.sauce = JSON.stringify(sauce); 
        next();
    }
}

