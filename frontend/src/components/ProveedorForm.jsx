// src/components/ProveedorForm.jsx
//Formulario React con React Hook Form y Yup


import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProveedorForm({ idProveedor, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    proveedor: '',
    contacto: '',
    telefono: '',
    email: '',
    direccion: ''
  });

  useEffect(() => {
  if (idProveedor) {
    axios.get(`/api/proveedores/${idProveedor}`).then(res => {
      setFormData(res.data); // cargar datos en el form
    }).catch(err => {
      console.error("Error al obtener proveedor:", err);
    });
  }
}, [idProveedor]);


  const cargarDatos = async () => {
    try {
      const { data } = await axios.get(`/api/proveedores/${idProveedor}`)
      setFormData(data);
    } catch (error) {
      console.error('Error al cargar proveedor:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (idProveedor) {
        await axios.put(`http://localhost:3001/api/proveedores/${idProveedor}`, formData);
        alert('Proveedor actualizado con éxito');
      } else {
        await axios.post('http://localhost:3001/api/proveedores', formData);
        alert('Proveedor creado con éxito');
      }
      onSubmitSuccess();
      setFormData({
        proveedor: '',
        contacto: '',
        telefono: '',
        email: '',
        direccion: ''
      });
    } catch (error) {
      console.error('Error al guardar proveedor:', error);
      alert('Ocurrió un error al guardar');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{idProveedor ? 'Editar proveedor' : 'Agregar nuevo proveedor'}</h3>
      <input name="proveedor" value={formData.proveedor} onChange={handleChange} placeholder="Proveedor" required />
      <input name="contacto" value={formData.contacto} onChange={handleChange} placeholder="Contacto" required />
      <input name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Dirección" />
      <button type="submit">{idProveedor ? 'Actualizar' : 'Guardar'}</button>
    </form>
  );
}
