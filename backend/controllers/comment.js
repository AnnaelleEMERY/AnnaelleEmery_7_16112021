const Comment = require('../models/comment');
const mysql = require('mysql');

// Créer un nouveau commentaaaire
exports.createComment = (req, res) => {
    // Si le corps du com est vide
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne doit pas être vide !"
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
