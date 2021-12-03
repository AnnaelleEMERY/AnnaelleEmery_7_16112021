const LikeDislike = require('../models/likes');
const mysql = require('mysql');

/*exports.addLike= (req, res) => {
    const likeDislike = new LikeDislike({
        userId: req.body.userId,
        postId: req.body.postId,
        likes: req.body.likes,
        dislikes: req.body.dislikes
    }); 
    LikeDislike.like(likeDislike, (err, data) => {
        if(err) {
            res.status(500).send({
                message : err.message || "raté !"
            });
            console.log(data)
            res.send(data);
        }
    })
}*/

// Intéragir avec les likes dislikes
exports.addLikeDislike = (req, res) => {
    //définir le constructeur
    const likeDislike = new LikeDislike({
        userId: req.body.userId,
        postId: req.body.postId,
        likes: req.body.likes,
        dislikes: req.body.dislikes
    });
    // Récupérer les likes/dislikes d'un post
    LikeDislike.findByPostId(req.body.postId)
    .then(like => {
        let userId = req.body.userId;
        let userWantsToLike = (req.body.likes === 1);
        let userWantsToDislike = (req.body.dislikes === 1);
        let userWantsToCancel = (req.body.likes === 0 & req.body.dislikes === 0);
        let userCanLikeDislike = (!like.includes(userId));
        let userCanCancel = (like.includes(userId));
        // Vérifier qu el'utilisateur peut intéragir ou qu'il n'a pas déjà intéragit
        // Vérifier qu'il peut bien annuler son like/dislike
        if (userWantsToLike && userCanLikeDislike) {
            // Lancer l'intéraction correspondante
            LikeDislike.like(likeDislike, (err, data) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "raté !!!"
                    });
                    console.log(data);
                    res.send(data);
                }
            })
        }
        if (userWantsToDislike && userCanLikeDislike) {
            LikeDislike.dislike(likeDislike, (err, data) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "raté !!"
                    });
                    console.log(data);
                    res.send(data);
                }
            })
        }
        if (userWantsToCancel && userCanCancel) {
            LikeDislike.cancelLikeDislike(req.body.postId, req.body.userId, (err, data) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "raté !"
                    });
                    console.log(data);
                    res.send(data);
                }
            })
        }
    })
    .catch(error => res.status(404).json({error: error | "ça marche pô :/"}))
}