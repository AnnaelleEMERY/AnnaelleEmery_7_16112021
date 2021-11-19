const Sequelize = require('sequelize');
require('dotenv').config()
const DB = process.env;

const sequelize = new Sequelize(DB.DB_DATABASE, DB.BD_USER, DB.BD_PASSWORD, {
    dialect: "mysql",
    host: DB.BD_HOST,
    logging: false
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connecté à la base de données MySQL!');
    })
    .catch(err => {
        console.error('Impossible de se connecter, erreur suivante :', error);
    });

module.exports = sequelize
global.sequelize = sequelize;