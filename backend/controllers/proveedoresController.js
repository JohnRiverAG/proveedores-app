// backend/controllers/proveedoresController.js
// Lógica CRUD con mejoras de verificación
const db = require('../db');

// Obtener todos los proveedores
exports.getProveedores = (req, res) => {
  db.query('SELECT * FROM proveedores', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// Añadir un nuevo proveedor
exports.addProveedor = (req, res) => {
  const { proveedor, contacto, telefono, email, direccion } = req.body;
  db.query(
    'INSERT INTO proveedores (proveedor, contacto, telefono, email, direccion) VALUES (?, ?, ?, ?, ?)',
    [proveedor, contacto, telefono, email, direccion],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, ...req.body });
    }
  );
};

// Actualizar un proveedor existente
exports.updateProveedor = (req, res) => {
  const { id } = req.params;
  const { proveedor, contacto, telefono, email, direccion } = req.body;

  db.query(
    'UPDATE proveedores SET proveedor = ?, contacto = ?, telefono = ?, email = ?, direccion = ? WHERE id_proveedor = ?',
    [proveedor, contacto, telefono, email, direccion, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Proveedor no encontrado' });
      }
      res.json({ message: 'Proveedor actualizado exitosamente' });
    }
  );
};

// Eliminar un proveedor
exports.deleteProveedor = (req, res) => {
  const { id } = req.params;

  db.query(
    'DELETE FROM proveedores WHERE id_proveedor = ?',
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Proveedor no encontrado' });
      }
      res.json({ message: 'Proveedor eliminado correctamente' });
    }
  );
};

// Obtener proveedor por ID
exports.getProveedorPorId = (req, res) => {
  const { id } = req.params;
  db.query(
    'SELECT * FROM proveedores WHERE id_proveedor = ?',
    [id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0) {
        return res.status(404).json({ message: 'Proveedor no encontrado' });
      }
      res.json(results[0]);
    }
  );
};
