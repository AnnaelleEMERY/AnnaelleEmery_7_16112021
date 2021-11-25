const db = require('../database/dbConnection');
const mysql = require('mysql');

const Post = function (post) {
    this.title = post.title,
        this.body = post.body,
        this.image = post.image,
        this.user_id = post.user_id
};

// Création d'un post
Post.create = (newPost, result) => {
    db.query(
        "INSERT INTO groupomania.posts SET ?",
        newPost,
        (err, res) => {
            if (err) {
                console.log("error: " + err);
                result(err, null);
                return;
            }
            console.log("Post créé " + { id: res.id, ...newPost });
            result(null, { id: res.id, ...newPost });
        }
    );
};
// Supprimer un post par son id
Post.deleteOne = (postId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM groupomania.posts WHERE id=${postId}`,
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

// Modification d'un post
Post.updateOne = (postId, post) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE groupomania.posts SET title="${post.title}", body="${post.body}", image="${post.image}" WHERE id="${postId}"`,
            function (error, result) {
                if (error) {
                    reject(error);
                    console.log("error: " + error);
                } else {
                    resolve(result);
                    console.log("Post " + { id: postId, ...post } + " a bien été modifié");
                }
            }
        )

    })
};

// Chercher tous les posts
Post.findAll = (result) => {
    db.query(
        "SELECT * FROM groupomania.posts", (err, res) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, { posts: res });
            }
        }
    )
};

// Chercher tous les posts par date de création 
Post.findAllByCreatedate = (result) => {
    db.query(
        "SELECT * FROM groupomania.posts", (err, res) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, { posts: res });
            }
        }
    )
};

// Chercher tous les articles par date de mise à jour
Post.findAllByUpdatedDate = (result) => {
    db.query(
        "SELECT * FROM groupomania.posts ORDER BY updatedAt DESC", (err, res) => {
            if (err) {
                result(err, null);
                return;
            } else {
                result(null, { posts: res });
            }
        }
    )
};

// Chercher un post par son id
Post.findOne = (postId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT p.id AS postId, p.user_id AS user_id, p.title AS title, p.body AS body, p.image AS image, p.createdDate AS createdDate, p.updatedDate AS updatedDate, SUM(l.likes) AS likeCount, SUM(l.dislikes) AS dislikeCount FROM groupomania.posts p, groupomania.likes l WHERE p.id=${postId} AND l.posts_id = p.id`,
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

// Chercher tous les posts d'un auteur en particulier
Post.findAllUser = (user_id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM groupomania.posts WHERE user_id=${user_id}`,
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

module.exports = Post;