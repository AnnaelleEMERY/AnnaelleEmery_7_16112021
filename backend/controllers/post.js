const Post = require('../models/post');
const mysql = require('mysql');

// Créer et sauvgarder un post
exports.createPost = (req, res, next) => {
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu de votre post ne peut être vide",
        });
    }
    // Création d'un post
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        image: req.body.image,
        created_at: req.body.created_at,
        user_id: req.body.user_id
    });
    // Sauvegarde dans la base de données
    Post.create(post, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Des erreurs se sont produites",
            });
        }
        console.log(data);
        res.send(data);
    });
};

// Supprimer un post
exports.deletePost = (req, res, next) => {
    Post.deleteOne(req.params.postId)
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};

// Modifier un post
exports.modifyPost = (req, res, next) => {
    let post = req.body;
    let postId = req.params.postId;
    console.log(postId + " " + post);
    Post.updateOne(postId, post)
        .then(() => res.status(200).json({ message: "Le post a bien été modifié" }))
        .catch(error => res.status(404).json({ error }));
};

// Récupérer TOUS les posts de TOUS les utilisateurs
exports.getAllPosts = (req, res, next) => {
    Post.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "des erreurs se sont produites",
            });
        }
        res.send(data);
    })
};

// Récupérer TOUS les posts triés par date de création
exports.getPostsByCreatedAt = (req, res, next) => {
    Post.findAllByCreatedAt((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "des erreurs se sont produites",
            });
        }
        res.send(data);
    })
};

// Récupérer un post précis avec son id
exports.getOnePost = (req, res, next) => {
    Post.findOne(req.params.id)
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
};

// Récupérer tous les posts d'UN utilisateur
exports.getPostsOfOneUser = (req, res, next) => {
    Post.findAllByUser(req.params.user_id)
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(404).json({ error }));
};