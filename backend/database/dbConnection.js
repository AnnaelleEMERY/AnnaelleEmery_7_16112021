const mysql = require('mysql');
require('dotenv').config()
const DB = process.env;

const dbConnection = mysql.createConnection({
    host: DB.dbHost,
    user: DB.dbUser,
    password: DB.dbPassword,
    database: DB.dbDatabase
});

dbConnection.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Connecté à la base de données MySQL !');
});

module.exports = dbConnection;