import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useCarrito } from './CarritoContext';
import { useFetch } from '../useFetch';

export function Direcciones() {
  const [direcciones, setDirecciones] = useState([]);
  const [direccionSeleccionada, setDireccionSeleccionada] = useState(null);
  const { user } = useContext(AuthContext);
  const { carrito } = useCarrito();
  const navigate = useNavigate();

  const { data, error } = useFetch(`https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Direccion/obtener/usuario/${user?.id}`);
  
  useEffect(() => {
    if (data) {
      setDirecciones(data);
    }
    if (error) {
      console.error('Error al obtener las direcciones:', error);
    }
  }, [data, error]);

  const finalizarCompra = async () => {
    if (!user || !user.id) {
        alert('Debes iniciar sesión para finalizar la compra.');
        navigate('/login');
        return;
    }

    console.log('Contenido del carrito antes de finalizar compra:', carrito);

    if (carrito.length === 0) {
        alert('Tu carrito está vacío. Agrega productos para continuar.');
        return;
    }

    const fechaActual = new Date().toISOString();
    const costoEnvio = 50; // Por ejemplo

    const pedido = {
        id_pedido: 0,
        id_direccion: direccionSeleccionada,
        id_usuario: user.id,
        estado: "1",
        fecha_pedido: fechaActual,
        fecha_entrega: fechaActual,
        costo_envio: costoEnvio,
    };

    try {
        const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Pedido/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedido),
        });

        const result = await response.json();
        console.log('Pedido creado:', result);

        if (!result.id_pedido) {
            throw new Error('No se pudo obtener el ID del pedido creado.');
        }

        const detallesPedido = carrito.map((producto) => ({
          id_detalle_pedido: 0,
          id_pedido: result.id_pedido, // Usa el ID del pedido recién creado
          id_producto: producto.id,
          cantidad: producto.cantidad,
          estado: '1',
          precio_costo: producto.precio,
      }));
      
      // Enviar los detalles del pedido como un arreglo
      try {
          const detalleResponse = await fetch(
              `https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Pedido/${result.id_pedido}/agregar-detalle`,
              {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(detallesPedido), // Aquí enviamos el arreglo
              }
          );
      
          if (!detalleResponse.ok) {
              const errorResponse = await detalleResponse.json();
              console.error('Error en la respuesta de la API:', errorResponse);
              alert(`Error al agregar el detalle: ${errorResponse.title || detalleResponse.statusText}`);
              throw new Error(`Error al agregar el detalle: ${detalleResponse.statusText}`);
          }
      
          const detalleResult = await detalleResponse.json();
          console.log('Detalles agregados:', detalleResult);
      } catch (error) {
          console.error('Error al agregar detalles del pedido:', error);
      }
      
      
        alert('Compra finalizada con éxito.');
        navigate('/');
    } catch (error) {
        console.error('Error al finalizar la compra:', error);
        alert('Hubo un problema al finalizar la compra. Por favor, inténtalo de nuevo.');
    }
};

return (
    <div className="direcciones-container">
      <h2>Direcciones</h2>
      <div className="direcciones-list">
        {direcciones.length > 0 ? (
          direcciones.map((direccion) => (
            <div key={direccion.id_direccion} className="direccion">
              <input
                type="radio"
                name="direccion"
                value={direccion.id_direccion}
                checked={direccionSeleccionada === direccion.id_direccion}
                onChange={() => setDireccionSeleccionada(direccion.id_direccion)}
              />
              <p>
                {`${direccion.pais}, ${direccion.departamento}, ${direccion.municipio}, ${direccion.zona}, 
                  ${direccion.colonia}, ${direccion.direccion}`}
              </p>
            </div>
          ))
        ) : (
          <p>No tienes direcciones asociadas.</p>
        )}
      </div>
      <button onClick={finalizarCompra} disabled={!direccionSeleccionada}>
        Finalizar Compra
      </button>
      <button onClick={() => navigate('/AgregarDireccion')} className="btn-agregar-direccion">
        Agregar Dirección
      </button>
    </div>
);
}
