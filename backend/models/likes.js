const db = require('../database/dbConnection');
const mysql = require('mysql');

// Constructeur
const LikeDislike = function (likeDislike) {
    this.likes = likeDislike.likes,
    this.dislikes = likeDislike.dislikes,
    this.users_id = likeDislike.userId,
    this.posts_id = likeDislike.postId
};

// Liker un post
LikeDislike.like = (newLike, result) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO groupomania.likes SET ?",
            newLike,
            (err, res) => {
                if (err) {
                    console.log("error: " + err);
                    result(err, null);
                    return;
                }
                console.log("Like créé " + { id: res.id, ...newLike });
                result(null, { id: res.id, ...newLike });
            }
        )
    })
};

//  Disliker un post
LikeDislike.dislike = (newLike, result) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO groupomania.likes SET ?",
            newLike,
            (err, res) => {
                if (err) {
                    console.log("error: " + err);
                    result(err, null);
                    return;
                }
                console.log("Dislike créé " + { id: res.id, ...newLike });
                result(null, {id: res.id, ...newLike});
            }
        )
    })
};

// Annuler un like/dislike d'un post
LikeDislike.cancelLikeDislike = (postId, userId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM groupomania.likes WHERE posts_id=${postId} AND users_id=${userId}`,
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

// Trouver les likes/dislikes d'un post
LikeDislike.findByPostId = (postId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM groupomania.likes WHERE posts_id=${postId}`,
            function (error, result, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        )
    })
};

module.exports = LikeDislikes;