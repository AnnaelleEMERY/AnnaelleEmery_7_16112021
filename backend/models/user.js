const db = require('../database/dbConnection');
const mysql = require('mysql');

// Constructeur
const User = function(user) {
    this.pseudo = user.pseudo,
    this.nom = user.nom,
    this.prenom = user.prenom,
    this.email = user.email,
    this.photo = user.photo,
    this.password = user.password,
    this.etablissement = user.etablissement,
    this.isAdmin = 0
};

// Création d'un utilisateur
User.create = (newUser, result) => {
    db.query(
        "INSERT INTO groupomania.users SET ?",
        newUser,
        (err, res) => {
            if(err) {
                console.log("Utilisateur non créé" + err);
                result(err, null);
                return;
            }
            console.log("Utilisateur créé !!");
            result(null, {id: res.id, ...newUser});
        }
    );
};

// Supprimer un utilisateur (user ou admin)
User.deleteOne = (userId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `DELETE FROM groupomania.users WHERE id=${userId}`,
            function (error, result) {
                if (error) {
                    reject(error);
                    console.log(error + "Utilisateur non supprimé");
                } else {
                    resolve(result);
                    console.log("Utilisateur supprimé");
                }
            }
        )
    })
};

// Trouver un user par son id (RÔLE ADMIN)
User.findOne = (userId) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM groupomania.users WHERE id=${userId}`,
            function (error, result, fields) {
                if(error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        )
    })
};

// Trouver TOUS les utilisateurs (ADMIN AUSSI)
User.findAll = (result) => {
    db.query("SELECT * FROM groupomania.users", (err, res) => {
        if (err) {
            result(err, null);
            return;
        } else {
            result(null, res);
        }
    });
};

// Mettre à jour les données d'un utilisateur
User.updateOne = (userId, user) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE groupomania.users SET pseudo="${user.pseudo}", nom="${user.nom}", prenom="${user.prenom}", email="${user.email}", photo="${user.photo}", etablissement="${user.etablissement}", isAdmin="${user.isAdmin}" WHERE id=${userId}`,
            function (error, result) {
                if (error) {
                    reject(error);
                    console.log("Loupé : " + error);
                } else {
                    resolve(result);
                    console.log("Utilisateur " + { id: userId } + " a bien été modifié !!");
                }
            }
        )
    })
};

module.exports = User;