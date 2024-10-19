import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export function AgregarTemporada() {
    const { register, handleSubmit, reset } = useForm();
    const [imagen, setImagen] = useState(null);

    // Función para convertir la imagen a base64
    const convertirBase64 = (imagenes) => {
        const archivo = imagenes[0];
        var reader = new FileReader();

        reader.readAsDataURL(archivo);
        reader.onload = function () {
            const base64ConEncabezado = reader.result; // Incluye el encabezado 'data:image/png;base64,' o similar
            setImagen(base64ConEncabezado);
        };

        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };

    // Función para manejar el envío del formulario
    const onSubmit = async (data) => {
        const payload = {
            id_temporada: 0,  // Siempre será 0 según lo especificado
            nombre: data.nombre,
            fecha_inicio: new Date(data.fecha_inicio).toISOString(),
            fecha_final: new Date(data.fecha_final).toISOString(),
            estado: '1',  // El estado siempre será "1"
            imagen: imagen || "string",  // Si no hay imagen, se puede ajustar aquí
        };

        try {
            const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Temporada/crear', {  // Cambia la URL según tu API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Error al agregar la temporada');
            }

            console.log('Temporada agregada exitosamente');
            reset(); // Reinicia el formulario
            setImagen(null); // Reinicia la imagen
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div>
            <h1>Agregar Temporada</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="nombre">Nombre *</label>
                    <input
                        type="text"
                        {...register('nombre', { required: true })}
                        placeholder="Nombre de la temporada"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="fecha_inicio">Fecha de Inicio *</label>
                    <input
                        type="date"
                        {...register('fecha_inicio', { required: true })}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="fecha_final">Fecha Final *</label>
                    <input
                        type="date"
                        {...register('fecha_final', { required: true })}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="imagen">Imagen *</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => convertirBase64(e.target.files)}
                        required
                    />
                </div>

                <button type="submit">Agregar Temporada</button>
            </form>
        </div>
    );
}
