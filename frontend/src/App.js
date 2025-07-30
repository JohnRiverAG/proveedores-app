// src/App.js

import { useState } from 'react';
import ProveedorForm from './components/ProveedorForm';
import ProveedorTable from './components/ProveedorTable';

function App() {
  const [editandoId, setEditandoId] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleEditar = (id) => setEditandoId(id);
  const handleActualizacion = () => {
    setEditandoId(null);
    setRefreshFlag(!refreshFlag); // forza actualización
  };

  return (
    <div className="App">
      <h2>Gestión de proveedores</h2>
      <ProveedorForm
        idProveedor={editandoId}
        onSubmitSuccess={handleActualizacion}
      />
      <ProveedorTable
        onEditar={handleEditar}
        refreshTrigger={refreshFlag}
      />
    </div>
  );
}

export default App;
