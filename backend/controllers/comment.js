const Comment = require('../models/comment');
const mysql = require('mysql');

// Créer un nouveau commentaaaire
exports.createComment = (req, res) => {
    // Si le corps du com est vide
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne doit pas être vide !",
        });
    }
    // Création d'un commentaire
    const comment = new Comment({
        body: req.body.body,
        users_id: req.body.users_id,
        posts_id: req.body.posts_id
    });
    // Sauvegarde dans la base de données
    Comment.create(comment, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Des erreurs se sont produites !!!!!",
            });
        }
        console.log(data)
        res.send(data);
    });
};

// Récupérer les commentaires par l'id du post concerné
exports.getAllComments = (req, res) => {
    Comment.findAll(req.params.postId)
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(404).json({ error }));
};

// Modifier un commentaire
exports.updateComment = (req, res) => {
    let commentId = req.params.commentId;
    let body = JSON.stringify(req.body.body);
    console.log(commentId + body);
    Comment.updateOne(commentId, body)
        .then(() => res.status(200).json({ message: "Le commentaire a bien été modifié !" }))
        .catch(error => res.status(404).json({ error }));
};

//Supprimer un commentaire
exports.deleteOneComment = (req, res) => {
    Comment.deleteOneComment(req.params.commentId)
    .then(() => res.status(404).json({ error }))
    .catch(error => res.status(404).json({ error }));
};

// Trouver un commentaire par son ID (modif de commentaire)
exports.getCommentById = (req, res, next) => {
    Comment.findById(req.params.commentId)
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(404).json({ error }));
};