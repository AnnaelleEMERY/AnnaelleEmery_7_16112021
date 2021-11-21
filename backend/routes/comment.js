const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/createComment/', auth, commentCtrl.createComment);
router.get('/comments/post/:postId', commentCtrl.getAllComments);

// Récupération d'un commentaire par son id (pour modification)
router.get('/comment/:commentId', auth, commentCtrl.getCommentById);

router.put('comment/update/:commentId', auth, commentCtrl.updateComment);
router.delete('/comment/delete/:commentId', auth, commentCtrl.deleteOneComment);


module.exports = router;
