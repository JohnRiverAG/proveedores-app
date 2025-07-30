// src/components/ProveedorTable.jsx

export default function ProveedorTable({ proveedores, onEditar }) {
  const handleEliminarClick = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`¿Eliminar proveedor #${id}?`)) {
      try {
        await fetch(`http://localhost:3001/api/proveedores/${id}`, {
          method: 'DELETE'
        });
        alert('Proveedor eliminado correctamente');
        // Aquí podrías emitir un evento o usar alguna función si quieres refrescar
        // Pero ahora ese control está en App.js
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
              <button
                onClick={() => handleEliminarClick(prov.id_proveedor)}
                style={{ marginLeft: '8px' }}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
