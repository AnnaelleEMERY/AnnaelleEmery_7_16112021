const passwordValidator = require('password-validator');
const alert = require('alert');

const passwordFormat = new passwordValidator();

passwordFormat
    .is().min(6)                              // Longueur minimum : 8
    .is().max(30)                             // Longueur maximum : 30
    .has().uppercase(1)                       // Doit avoir au moins une majuscule
    .has().lowercase()                        // Doit avoir au moins une minuscule
    .has().digits(1)                          // Doit avoir au moins un chiffre
    .has().not().spaces()                     // Ne doit pas avoir d'espaces
    .is().not().oneOf(['123456', '987654', 'password', 'Passw0rd', 'MotDePasse', 'Motdepasse', 'Motdepasse123']);

module.exports = (req, res, next) => {
    if (passwordFormat.validate(req.body.password)) {
        next();
    } else {
        res.status(400).json({ error: 'Votre mot de passe est trop simple !' });
        alert("Mauvais format de mot de passe : 8 caractères min. 30 caractères max. Au moins 1 Majuscule, 1 minuscule, 1 chiffre. Sans espaces");
    }
};