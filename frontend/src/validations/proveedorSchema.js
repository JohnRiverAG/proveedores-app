// src/validations/proveedorSchema.js
//Esquema de validación con Yup

import * as yup from 'yup';

export const proveedorSchema = yup.object().shape({
  proveedor: yup.string().required('El proveedor es obligatorio'),
  contacto: yup.string().required('El contacto es obligatorio'),
  telefono: yup
    .string()
    .matches(/^\d{9}$/, 'Debe tener 9 dígitos numéricos')
    .required('El teléfono es obligatorio'),
  email: yup.string().email('Email inválido').required('El email es obligatorio'),
  direccion: yup.string().required('La dirección es obligatoria')
});
