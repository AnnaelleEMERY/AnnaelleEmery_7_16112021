const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/likes');
const auth = require('../middleware/auth');

// Ajout d'un like à un post
router.post('/:postId/likeDislike', auth, likeCtrl.addLikeDislike);

module.exports = router;