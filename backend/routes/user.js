const express = require('express');
const auth = require('../middlewares/auth');

const validatePassword = require('../middleware/validatePassword');
const userCtrl = require('../controllers/user');

const router = express.Router();

router.post('/signin', validatePassword, userCtrl.signin);
router.post('/login', userCtrl.login);

router.post('/logout', auth, userCtrl.logout);
router.get('/user/:id', auth, userCtrl.getOneUserById);
router.put('/user/update/:userId', auth, userCtrl.updateUser);

// Admin seulement
router.get('/users/', auth, userCtrl.getAllUsers);
router.delete('/user/delete/:userId', auth, userCtrl.deleteUser);

module.exports = router;