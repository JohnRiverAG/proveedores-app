// backend/db.js
//Conexión a la Base de Datos
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(error => {
  if (error) throw error;
  console.log('🟢 Conectado a la base de datos MySQL');
});

module.exports = connection;
