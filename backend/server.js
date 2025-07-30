// backend/server.js
//Servidor Principal
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const proveedoresRoutes = require('./routes/proveedores');
app.use(cors());
app.use(express.json());
app.use('/api/proveedores', proveedoresRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en puerto ${PORT}`);
});
