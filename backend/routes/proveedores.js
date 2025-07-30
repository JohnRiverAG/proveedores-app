//Rutas en: backend/routes/proveedores.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/proveedoresController');

router.get('/', controller.getProveedores);
router.get('/:id', controller.getProveedorPorId);
router.post('/', controller.addProveedor);
router.put('/:id', controller.updateProveedor);
router.delete('/:id', controller.deleteProveedor);


module.exports = router;
