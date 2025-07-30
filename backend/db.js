// backend/db.js
// Conexión robusta a la Base de Datos
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
  if (error) {
    console.error('❌ Error al conectar a la base de datos:', error.message);
    process.exit(1); // Termina la ejecución si no hay conexión
  }
  console.log(`🟢 Conectado a la base de datos MySQL (${process.env.DB_NAME}) en ${process.env.DB_HOST}`);
});

module.exports = connection;
