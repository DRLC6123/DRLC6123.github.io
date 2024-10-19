import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export function AgregarDireccion() {
  const { userId } = useContext(AuthContext); // Obtener el id del usuario logeado desde el contexto
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [mensaje, setMensaje] = useState(null);

  const onSubmit = async (data) => {
    const direccionPayload = {
      id_direccion: 0,
      pais:'Guatemala',
      departamento:'Guatemala',
      municipio: data.municipio,
      zona: data.zona,
      colonia: data.colonia,
      direccion: data.direccion,
      referencias: data.referencias,
      id_usuario: userId, // Agregar el id del usuario al JSON
      estado: '1',
    };

    try {
      const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Direccion/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(direccionPayload),
      });

      if (!response.ok) {
        throw new Error('Error al crear la dirección');
      }

      setMensaje('Dirección agregada con éxito');
      navigate('/direcciones'); // Redirigir a la pantalla de direcciones
    } catch (error) {
      setMensaje(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="municipio">Municipio *</label>
                <select {...register('municipio')} required>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Villa Nueva">Villa Nueva</option>
                </select>

        <label htmlFor="zona">Zona</label>
        <input type="text" {...register('zona')} placeholder="Zona" required />

        <label htmlFor="colonia">Colonia</label>
        <input type="text" {...register('colonia')} placeholder="Colonia" required />

        <label htmlFor="direccion">Dirección</label>
        <input type="text" {...register('direccion')} placeholder="Dirección completa" required />

        <label htmlFor="referencias">Referencias</label>
        <textarea {...register('referencias')} placeholder="Referencias"></textarea>

        <button type="submit" className="submit-btn">Agregar Dirección</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
