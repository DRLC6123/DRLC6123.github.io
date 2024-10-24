import React, { useState } from 'react';
import { useFetch } from '../useFetch'; // Asegúrate de importar correctamente tu hook

export function ModificarOferta(){
  const { data: ofertas, error: errorOfertas } = useFetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Oferta/ofertas'); // URL de la API de ofertas
  const { data: productos, error: errorProductos } = useFetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Producto/activos'); // URL de la API de productos
  const { data: temporadas, error: errorTemporadas } = useFetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Temporada'); // URL de la API de temporadas

  const [ofertaSeleccionada, setOfertaSeleccionada] = useState(null);
  const [precioOferta, setPrecioOferta] = useState('');
  const [estadoOferta, setEstadoOferta] = useState('1'); // Estado por defecto

  // Manejar la selección de la oferta
  const handleOfertaChange = (event) => {
    const index = parseInt(event.target.value);
    const oferta = ofertas[index];
    setOfertaSeleccionada(oferta);
    setPrecioOferta('');
    setEstadoOferta('1'); // Valor por defecto para el estado
  };

  // Manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!ofertaSeleccionada || !precioOferta || estadoOferta === '') {
      alert('Por favor completa todos los campos.');
      return;
    }

    // Obtener el ID del producto y de la temporada comparando los nombres
    const producto = productos.find(prod => prod.nombre === ofertaSeleccionada.producto);
    const temporada = temporadas.find(temp => temp.nombre === ofertaSeleccionada.temporada);

    if (!producto || !temporada) {
      alert('No se encontraron los IDs correspondientes para el producto o la temporada.');
      return;
    }

    // Crear el objeto para enviar a la API
    const ofertaModificada = {
      id_oferta: 0, // Debes asegurarte de tener el ID de la oferta
      id_producto: producto.id_producto,
      id_temporada: temporada.id_temporada,
      precio_oferta: parseFloat(precioOferta),
      estado: estadoOferta
    };

    // Usar fetch para enviar los datos modificados
    try {
      const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Oferta/modificar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ofertaModificada)
      });

      if (!response.ok) {
        throw new Error(`Error en la actualización: ${response.statusText}`);
      }

      alert('Oferta actualizada exitosamente');
    } catch (error) {
      console.error('Error al actualizar la oferta:', error);
    }
  };

  return (
    <div>
      <h2>Modificar Oferta</h2>

      {errorOfertas && <p>Error al cargar las ofertas: {errorOfertas}</p>}
      {errorProductos && <p>Error al cargar los productos: {errorProductos}</p>}
      {errorTemporadas && <p>Error al cargar las temporadas: {errorTemporadas}</p>}

      {/* Select para elegir la oferta */}
      <select onChange={handleOfertaChange} defaultValue="">
        <option value="" disabled>Selecciona una oferta</option>
        {ofertas && ofertas.map((oferta, index) => (
          <option key={index} value={index}>
            {oferta.temporada} - {oferta.producto}
          </option>
        ))}
      </select>

      {/* Formulario para modificar la oferta */}
      {ofertaSeleccionada && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Precio de Oferta:</label>
            <input
              type="number"
              value={precioOferta}
              onChange={(e) => setPrecioOferta(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Estado:</label>
            <select 
              value={estadoOferta}
              onChange={(e) => setEstadoOferta(e.target.value)}
              required
            >
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
          </div>

          <button type="submit">Guardar Cambios</button>
        </form>
      )}
    </div>
  );
};

export default ModificarOferta;
