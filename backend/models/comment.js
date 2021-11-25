const db = require('../database/dbConnection');
const mysql = require('mysql');

// Constructeur
const Comment = function(comment) {
    this.body = comment.body,
    this.users_id = comment.users_id,
    this.posts_id = comment.posts_id
};

// Création d'un commentaire
Comment.create = (newComment, result) => {
    db.query(
        "INSERT INTO groupomania.comments SET ?",
        newComment,
        (err, res) => {
            if (err) {
                console.log('error: ' + err);
                result(err, null);
                return;
            }
            console.log("Commentaire créé " + { id: res.id, ...newComment });
            result(null, {id: res.id, ...newComment});
        }
    );
};

// Chercher tous les commentaires d'un post
Comment.findAll = (postId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM groupomania.comments WHERE posts_id=${postId}`,
            function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        )
    })
};

// Modifier un commentaire
Comment.updateOne = (commentId, body) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE groupomania.comments SET body=${body} WHERE id=${commentId}`,
            function (error, result) {
                if (error) {
                    reject(error);
                    console.log(error + " y a une nouille dans le pâté");
                } else {
                    resolve(result);
                    console.log('Le comentaire a bien été modifié');
                }
            }
        )
    })
};

// Supprimer un commentaire avec son id
Comment.deleteOneComment = (commentId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM groupomania.comments WHERE id=${commentId}`,
            function (error, result) {
                if (error) {
                    reject(error);
                    console.log(error + " pas effacé");
                } else {
                    resolve(result);
                    console.log("utilisateur supprimé");
                }
            }
        )
    })
};

// Trouver un commentaire par son id 
Comment.findById = (commentId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM groupomania.comments WHERE id=${commentId}`,
            function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        )
    })
};

module.exports = Comment;