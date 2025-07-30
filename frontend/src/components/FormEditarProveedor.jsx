// src/components/FormEditarProveedor.jsx

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { proveedorSchema } from '../validations/proveedorSchema';
import axios from 'axios';

export default function FormEditarProveedor({ idProveedor, onUpdateSuccess }) {
  const [cargando, setCargando] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(proveedorSchema)
  });

  // 🔁 Cargar datos del proveedor al montar
  useEffect(() => {
    const fetchProveedor = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/api/proveedores/${idProveedor}`);
        reset(data); // Carga los datos en el formulario
        setCargando(false);
      } catch (error) {
        console.error('Error al obtener proveedor:', error);
      }
    };

    fetchProveedor();
  }, [idProveedor, reset]);

  // ✅ Enviar datos actualizados al backend
  const onSubmit = async (formData) => {
    try {
      await axios.put(`http://localhost:3001/api/proveedores/${idProveedor}`, formData);
      if (onUpdateSuccess) onUpdateSuccess(); // Callback para recargar o cerrar modal
    } catch (error) {
      console.error('Error al actualizar proveedor:', error);
    }
  };

  if (cargando) return <p>Cargando proveedor...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('proveedor')} placeholder="Nombre del proveedor" />
      <p>{errors.proveedor?.message}</p>

      <input {...register('contacto')} placeholder="Nombre del contacto" />
      <p>{errors.contacto?.message}</p>

      <input {...register('telefono')} placeholder="Teléfono" />
      <p>{errors.telefono?.message}</p>

      <input {...register('email')} placeholder="Email" />
      <p>{errors.email?.message}</p>

      <input {...register('direccion')} placeholder="Dirección" />
      <p>{errors.direccion?.message}</p>

      <button type="submit">Actualizar proveedor</button>
    </form>
  );
}
