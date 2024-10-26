import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export function AgregarProveedor() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [mensaje, setMensaje] = useState(null);

  const onSubmit = async (data) => {
    const proveedorPayload = {
      id_proveedor: 0, // Siempre será 0
      nombre: data.nombre,
      telefono: Number(data.telefono), // Convertir a número
      correo_electronico: data.correo, // Usar el nombre correcto
      direccion: data.direccion, // Incluir la dirección
      estado: "1", // Valor por defecto
    };

    try {
      const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Proveedor/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proveedorPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el proveedor');
      }

      const result = await response.json();
      alert('Proveedor agregado con éxito');
      
      // Aquí puedes agregar lógica adicional, como redirigir a otra página o limpiar el formulario
      setMensaje('Proveedor agregado con éxito');

    } catch (error) {
      setMensaje(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Agregar Proveedor</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="nombre">Nombre *</label>
        <input 
          type="text" 
          {...register('nombre', { required: 'El nombre es obligatorio' })} 
          placeholder="Nombre del proveedor" 
        />
        {errors.nombre && <p>{errors.nombre.message}</p>}

        <label htmlFor="telefono">Teléfono *</label>
        <input 
          type="number" 
          {...register('telefono', { required: 'El teléfono es obligatorio', valueAsNumber: true })} 
          placeholder="Teléfono del proveedor" 
        />
        {errors.telefono && <p>{errors.telefono.message}</p>}

        <label htmlFor="correo">Correo electrónico *</label>
        <input 
          type="email" 
          {...register('correo', { required: 'El correo es obligatorio' })} 
          placeholder="Correo del proveedor" 
        />
        {errors.correo && <p>{errors.correo.message}</p>}

        <label htmlFor="direccion">Dirección *</label>
        <input 
          type="text" 
          {...register('direccion', { required: 'La dirección es obligatoria' })} 
          placeholder="Dirección del proveedor" 
        />
        {errors.direccion && <p>{errors.direccion.message}</p>}

        <button type="submit" className="submit-btn">Agregar Proveedor</button>
      </form>
      {mensaje && <p className="alert">{mensaje}</p>}
    </div>
  );
}
