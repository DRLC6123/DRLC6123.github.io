import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export function AgregarDireccion() {
    const { user } = useContext(AuthContext); // Acceder al usuario logueado
    const userId = user?.id; // Obtener el ID del usuario
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [mensaje, setMensaje] = useState(null);
  const onSubmit = async (data) => {
    const direccionPayload = {
      id_direccion: 0,
      pais: 'Guatemala',
      departamento: 'Guatemala',
      municipio: data.municipio,
      zona: data.zona,
      colonia: data.colonia,
      direccion: data.direccion,
      referencias: data.referencias,
      id_usuario: userId || 'no-id', // Maneja el caso de undefined
      estado: '1',
    };

    console.log("Payload a enviar:", direccionPayload); // Verifica el payload

    try {
      const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Direccion/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(direccionPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear la dirección');
      }

      const result = await response.json();
      alert('Dirección agregada con éxito');
      navigate('/direcciones');
    } catch (error) {
      setMensaje(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="municipio">Municipio *</label>
        <select {...register('municipio', { required: 'El municipio es obligatorio' })}>
          <option value="Guatemala">Guatemala</option>
          <option value="Villa Nueva">Villa Nueva</option>
        </select>
        {errors.municipio && <p>{errors.municipio.message}</p>}

        <label htmlFor="zona">Zona *</label>
        <input type="text" {...register('zona', { required: 'La zona es obligatoria' })} placeholder="Zona" />
        {errors.zona && <p>{errors.zona.message}</p>}

        <label htmlFor="colonia">Colonia *</label>
        <input type="text" {...register('colonia', { required: 'La colonia es obligatoria' })} placeholder="Colonia" />
        {errors.colonia && <p>{errors.colonia.message}</p>}

        <label htmlFor="direccion">Dirección *</label>
        <input type="text" {...register('direccion', { required: 'La dirección es obligatoria' })} placeholder="Dirección completa" />
        {errors.direccion && <p>{errors.direccion.message}</p>}

        <label htmlFor="referencias">Referencias</label>
        <textarea {...register('referencias')} placeholder="Referencias"></textarea>

        <button type="submit" className="submit-btn">Agregar Dirección</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
