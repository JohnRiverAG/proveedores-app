// src/App.js

import { useState, useEffect } from 'react';
import ProveedorForm from './components/ProveedorForm';
import ProveedorTable from './components/ProveedorTable';

function App() {
  const [proveedores, setProveedores] = useState([]); // ✅ FALTABA ESTA LÍNEA
  const [editandoId, setEditandoId] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const obtenerProveedores = async () => { 
      const res = await fetch('http://localhost:3001/api/proveedores');
      const data = await res.json();
      console.log('Proveedores recibidos:', data);
      setProveedores(data);
    } catch (error) {
      console.error('Error al obtener proveedores:', error);
    }
  };

  useEffect(() => {
    obtenerProveedores();
  }, [refreshFlag]);

  const handleEditar = (id) => setEditandoId(id);

  const handleActualizacion = () => {
    setEditandoId(null);
    setRefreshFlag(prev => !prev); // ✅ Usar función para evitar errores de sincronía
  };

  return (
    <div className="App">
      <h2>Gestión de proveedores</h2>
      <ProveedorForm
        idProveedor={editandoId}
        onSubmitSuccess={handleActualizacion}
      />
      <ProveedorTable
        proveedores={proveedores} // ✅ AHORA SE PASA LA LISTA
        onEditar={handleEditar}
        refreshTrigger={refreshFlag}
      />
    </div>
  );
}

export default App;
