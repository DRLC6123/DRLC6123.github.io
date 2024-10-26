import React, { useEffect, useState } from 'react';
import '../css/index.css';


export function DetallePedido({ pedido, setPedidoSeleccionado }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const response = await fetch(`https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Pedido/${pedido.id_pedido}/obtener-detalle`);
        if (!response.ok) {
          throw new Error('Error al obtener el detalle del pedido');
        }
        const detalles = await response.json();
        fetchProductos(detalles); // Llamar a la función para obtener los productos
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    const fetchProductos = async (detalles) => {
      try {
        const productosPromises = detalles.map(detalle =>
          fetch(`https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Producto/${detalle.id_producto}/detalle`)
            .then(response => response.json())
            .then(productoData => ({
              ...detalle,
              nombre: productoData.nombre, // Obtener el nombre del producto
              precio_costo: detalle.precio_costo // Usar precio_costo del detalle
            }))
        );

        const productosConNombre = await Promise.all(productosPromises);
        setProductos(productosConNombre);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchDetalle();
  }, [pedido]);

  const handleVolver = () => {
    setPedidoSeleccionado(null); // Volver al componente de pedidos
  };

  return (
    <div>
      <h2>Detalle del Pedido ID: {pedido.id_pedido}</h2>
      <button onClick={handleVolver}>Volver a Mis Pedidos</button>
      
      <table>
        <thead>
          <tr>
            <th>Nombre del Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? (
            productos.map((producto) => (
              <tr key={producto.id_producto}>
                <td>{producto.nombre}</td>
                <td>{producto.precio_costo.toFixed(2)}</td> {/* Usar precio_costo */}
                <td>{producto.cantidad}</td>
                <td>{(producto.precio_costo * producto.cantidad).toFixed(2)}</td> {/* Calcular el total */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay productos en este pedido.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
