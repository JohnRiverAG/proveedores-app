// src/components/ProveedorTable.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProveedorTable({ onEditar, refreshTrigger }) {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    cargarProveedores();
  }, [refreshTrigger]);

  const cargarProveedores = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/api/proveedores');
      setProveedores(data);
    } catch (error) {
      console.error('Error al cargar proveedores:', error);
    }
  };

  const handleEliminarClick = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`¿Eliminar proveedor #${id}?`)) {
      try {
        await axios.delete(`http://localhost:3001/api/proveedores/${id}`);
        alert('Proveedor eliminado correctamente');
        cargarProveedores();
      } catch (error) {
        console.error('Error al eliminar proveedor:', error);
        alert('Ocurrió un error al eliminar');
      }
    }
  };

  return (
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
              <button onClick={() => onEditar(prov.id_proveedor)}>Editar</button>
              <button onClick={() => handleEliminarClick(prov.id_proveedor)} style={{ marginLeft: '8px' }}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
