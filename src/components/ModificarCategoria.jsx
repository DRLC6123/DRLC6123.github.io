import React, { useState } from 'react';
import { useFetch } from '../useFetch';// Asegúrate de importar correctamente tu hook

export function ModificarCategoria(){
  const { data: categorias, error } = useFetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Categoria'); // Reemplaza con la URL correcta de la API
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [imagenBase64, setImagenBase64] = useState(null);

  // Manejar la selección de la categoría
  const handleCategoriaChange = (event) => {
    const idCategoria = parseInt(event.target.value);
    const categoria = categorias.find(cat => cat.id_categoria === idCategoria);
    setCategoriaSeleccionada(categoria);
    setImagenBase64(categoria.imagen); // Establecer la imagen actual en base64
  };

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!categoriaSeleccionada) {
      alert('Por favor selecciona una categoría.');
      return;
    }

    // Crear el objeto para enviar a la API
    const categoriaModificada = {
      id_categoria: categoriaSeleccionada.id_categoria,
      nombre: categoriaSeleccionada.nombre,
      id_padre: 1, // Fijo en 1
      estado: "1", // Fijo en "1"
      imagen: imagenBase64 // Imagen en base64
    };

    // Usar fetch para enviar los datos modificados
    try {
      const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Categoria/modificar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoriaModificada)
      });

      if (!response.ok) {
        throw new Error(`Error en la actualización: ${response.statusText}`);
      }

      alert('Categoría actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar la categoría:', error);
    }
  };

  // Manejar cambios en el formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategoriaSeleccionada({
      ...categoriaSeleccionada,
      [name]: value
    });
  };

  // Convertir imagen a base64
  const convertirBase64 = (imagenes) => {
    const archivo = imagenes[0];
    var reader = new FileReader();

    reader.readAsDataURL(archivo);
    reader.onload = function () {
      const base64ConEncabezado = reader.result; // Incluye el encabezado 'data:image/png;base64,'
      setImagenBase64(base64ConEncabezado);
    };

    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  return (
    <div>
      <h2>Modificar Categoría</h2>

      {error && <p>Error al cargar las categorías: {error}</p>}

      {/* Select para elegir la categoría */}
      <select onChange={handleCategoriaChange} defaultValue="">
        <option value="" disabled>Selecciona una categoría</option>
        {categorias && categorias.map(categoria => (
          <option key={categoria.id_categoria} value={categoria.id_categoria}>
            {categoria.nombre}
          </option>
        ))}
      </select>

      {/* Formulario para modificar la categoría */}
      {categoriaSeleccionada && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={categoriaSeleccionada.nombre}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Imagen:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => convertirBase64(e.target.files)}
            />
          </div>
          <button type="submit">Guardar Cambios</button>
        </form>
      )}
    </div>
  );
};

