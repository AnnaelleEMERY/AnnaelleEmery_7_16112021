const mysql = require('mysql');
require('dotenv').config()
const DB = process.env;



const db = mysql.createConnection({
    host: DB.dbHost,
    user: DB.dbUser,
    password: DB.dbPassword,
    database: DB.dbDatabase
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Connecté à la base de données MySQL !');
});