import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export function VerPedidos() {
  const { userId } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);
  const [filteredPedidos, setFilteredPedidos] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState('');

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch(`https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Pedido?id_usuario=${userId}`);
        if (!response.ok) {
          throw new Error('Error al obtener los pedidos');
        }
        const data = await response.json();
        setPedidos(data);
        setFilteredPedidos(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchPedidos();
  }, [userId]);

  const handleFilterChange = (event) => {
    const selectedEstado = event.target.value;
    setEstadoFiltro(selectedEstado);
    if (selectedEstado === '') {
      setFilteredPedidos(pedidos); // Show all orders if no filter is selected
    } else {
      setFilteredPedidos(
        pedidos.filter(pedido => 
          pedido.estado.toLowerCase().trim() === selectedEstado.toLowerCase().trim()
        )
      );
    }
  };

  return (
    <div>
      <h2>Mis Pedidos</h2>
      <label htmlFor="estadoFiltro">Filtrar por Estado:</label>
      <select id="estadoFiltro" value={estadoFiltro} onChange={handleFilterChange}>
        <option value="">Todos</option>
        <option value="Pendiente">Pendiente</option>
        <option value="Enviado">Enviado</option>
        <option value="Entregado">Entregado</option>
        <option value="Cancelado">Cancelado</option>
        {/* Add more state options as needed */}
      </select>

      <table>
        <thead>
          <tr>
            <th>ID Pedido</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Costo de Envío</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredPedidos.length > 0 ? (
            filteredPedidos.map((pedido) => (
              <tr key={pedido.id_pedido}>
                <td>{pedido.id_pedido}</td>
                <td>{new Date(pedido.fecha_pedido).toLocaleDateString()}</td>
                <td>{pedido.estado}</td>
                <td>{pedido.costo_envio}</td>
                <td>{pedido.total}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay pedidos que coincidan con el filtro seleccionado</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
