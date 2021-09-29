const validator = require('password-validator');

// https://www.npmjs.com/package/password-validator - sécurisation

const pass = new validator();

pass
.is().min(8)
.is().max(30)
.has().uppercase()
.has().lowercase()
.has().digits()
.has().not().spaces()
.is().not().oneOf(['PassW0rd','Password123','Azerty01'])

module.exports = pass;