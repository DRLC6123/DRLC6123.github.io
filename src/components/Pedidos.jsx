import React, { useEffect, useState } from 'react';

export function Pedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState('');

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Pedido');
                const data = await response.json();
                console.log('Pedidos obtenidos:', data); // Verificar los pedidos recibidos
                setPedidos(data);
            } catch (error) {
                console.error('Error al obtener los pedidos:', error);
            }
        };

        fetchPedidos();
    }, []);

    // Filtrar pedidos por estado si se selecciona un filtro
    const pedidosFiltrados = pedidos.filter(pedido => 
        filtroEstado ? pedido.estado.trim().toLowerCase() === filtroEstado.toLowerCase() : true
    );

    const handleEstadoChange = async (pedidoId, nuevoEstado) => {
        try {
            const pedidoActual = pedidos.find(pedido => pedido.id_pedido === pedidoId);
            if (!pedidoActual) {
                throw new Error('Pedido no encontrado');
            }

            const jsonBody = {
                id_pedido: pedidoActual.id_pedido,
                id_direccion: pedidoActual.id_direccion,
                id_usuario: pedidoActual.id_usuario,
                estado: nuevoEstado,
                fecha_pedido: pedidoActual.fecha_pedido,
                fecha_entrega: pedidoActual.fecha_entrega,
                costo_envio: pedidoActual.costo_envio
            };

            const url = `https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Pedido/modificar/${pedidoId}/estado/${nuevoEstado}`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonBody),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el estado del pedido');
            }

            // Actualizar el estado localmente
            setPedidos(prevPedidos =>
                prevPedidos.map(pedido =>
                    pedido.id_pedido === pedidoId ? { ...pedido, estado: nuevoEstado } : pedido
                )
            );

            alert('Estado actualizado exitosamente');
        } catch (error) {
            console.error('Error al cambiar el estado:', error);
            alert('Error al cambiar el estado');
        }
    };

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
                        <th>Costo Envío</th>
                        <th>Total</th>
                        <th>Cambiar Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidosFiltrados.map((pedido) => (
                        <tr key={pedido.id_pedido}>
                            <td>{pedido.id_pedido}</td>
                            <td>{new Date(pedido.fecha_pedido).toLocaleDateString()}</td>
                            <td>{pedido.id_usuario}</td>
                            <td>{pedido.costo_envio}</td>
                            <td>{pedido.total}</td>
                            <td>
                                <select
                                    value={pedido.estado.trim()} // Eliminar espacios en blanco
                                    onChange={(e) => handleEstadoChange(pedido.id_pedido, e.target.value)}
                                >
                                    <option value="pendiente">Pendiente</option>
                                    <option value="enviado">Enviado</option>
                                    <option value="entregado">Entregado</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
