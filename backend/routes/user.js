const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const validatePassword = require('../middleware/validatePassword');
const userCtrl = require('../controllers/user');

router.post('/register', validatePassword, userCtrl.register);
router.get('/login', userCtrl.login);

// Connection de l'utilisateur en cours de login pour vérifier la validité du token et récupérer ses données
router.get('/me', auth, userCtrl.getMyDatas);

router.post('/logout', auth, userCtrl.logout);
router.get('/user/:id', auth, userCtrl.getOneUserById);

router.get('/users/', auth, userCtrl.getAllUsers); // Admin seulement
router.put('/user/update/:userId', auth, userCtrl.updateUser);
router.delete('/user/delete/:userId', auth, userCtrl.deleteUser); // Admin seulement

module.exports = router;