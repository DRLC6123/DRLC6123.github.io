import React, { useEffect, useState } from 'react';

export function Pedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState('');

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Pedido');
                const data = await response.json();
                setPedidos(data);
            } catch (error) {
                console.error('Error al obtener los pedidos:', error);
            }
        };

        fetchPedidos();
    }, []);

    // Filtrar pedidos por estado si se selecciona un filtro
    const pedidosFiltrados = pedidos.filter(pedido =>
        filtroEstado ? pedido.estado === filtroEstado : true
    );

    return (
        <div>
            <h2>Revisión de Pedidos</h2>

            {/* Filtro por estado */}
            <div>
                <label htmlFor="filtroEstado">Filtrar por estado:</label>
                <select
                    id="filtroEstado"
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="enviado">Enviado</option>
                    <option value="entregado">Entregado</option>
                </select>
            </div>

            {/* Tabla de pedidos */}
            <table>
                <thead>
                    <tr>
                        <th>ID Pedido</th>
                        <th>Fecha Pedido</th>
                        <th>ID Usuario</th>
                        <th>Estado</th>
                        <th>Costo Envío</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidosFiltrados.map((pedido) => (
                        <tr key={pedido.id_pedido}>
                            <td>{pedido.id_pedido}</td>
                            <td>{new Date(pedido.fecha_pedido).toLocaleDateString()}</td>
                            <td>{pedido.id_usuario}</td>
                            <td>{pedido.estado}</td>
                            <td>{pedido.costo_envio}</td>
                            <td>{pedido.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
