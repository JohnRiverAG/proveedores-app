// src/components/ProveedorTable.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import FormEditarProveedor from './FormEditarProveedor';

export default function ProveedorTable() {
  const [proveedores, setProveedores] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    cargarProveedores();
  }, []);

  const cargarProveedores = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/api/proveedores');
      setProveedores(data);
    } catch (error) {
      console.error('Error al cargar proveedores:', error);
    }
  };

  const handleEditarClick = (id) => {
    setEditandoId(id);
  };

  const handleActualizacion = () => {
    setEditandoId(null);
    cargarProveedores();
  };

  const handleEliminarClick = async (id) => {
    if (confirm(`¿Seguro que quieres eliminar el proveedor #${id}?`)) {
        try {
        await axios.delete(`http://localhost:3001/api/proveedores/${id}`);
        alert('Proveedor eliminado correctamente');
        cargarProveedores();
        } catch (error) {
        console.error('Error al eliminar proveedor:', error);
        alert('Error al eliminar proveedor');
        }
    }
  };


  return (
    <div>
      <h2>Lista de proveedores</h2>
      <table>
        <thead>
          <tr>
            <th>Proveedor</th>
            <th>Contacto</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((prov) => (
            <tr key={prov.id_proveedor}>
              <td>{prov.proveedor}</td>
              <td>{prov.contacto}</td>
              <td>{prov.telefono}</td>
              <td>{prov.email}</td>
              <td>{prov.direccion}</td>
              <td>
                  <button onClick={() => handleEditarClick(prov.id_proveedor)}>Editar</button>
                  <button onClick={() => handleEliminarClick(prov.id_proveedor)} style={{ marginLeft: '8px' }}>
                      Eliminar
                  </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {editandoId && (
        <div>
          <h3>Editando proveedor #{editandoId}</h3>
          <FormEditarProveedor
            idProveedor={editandoId}
            onUpdateSuccess={handleActualizacion}
          />
        </div>
      )}
    </div>
  );
}
