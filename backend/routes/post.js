const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');

router.post('/createPost/', auth, postCtrl.createPost);
router.put('/post/update/:postId', auth, postCtrl.modifyPost);
router.delete('/post/delete/:postId', auth, postCtrl.deletePost);

router.get('/posts/', postCtrl.getAllPosts);

// Récupération d'un post par son id
router.get('/post/:id', auth, postCtrl.getOnePost);



// Récupération des posts par date de création
router.get('/posts/createdAt', auth, postCtrl.getPostsByCreatedAt);

// Récupération de tous les posts d'un utilisateur
router.get('/posts/user/:user_id', auth, postCtrl.getPostsOfOneUser);


module.exports = router;