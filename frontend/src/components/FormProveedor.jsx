// src/components/FormProveedor.jsx
//Formulario React con React Hook Form y Yup

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { proveedorSchema } from '../validations/proveedorSchema';

export default function FormProveedor({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(proveedorSchema)
  });

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

      <button type="submit">Guardar proveedor</button>
    </form>
  );
}
