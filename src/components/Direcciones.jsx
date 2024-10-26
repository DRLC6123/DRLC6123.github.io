import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useCarrito } from './CarritoContext';
import { useFetch } from '../useFetch';

export function Direcciones() {
    const [direcciones, setDirecciones] = useState([]);
    const [direccionSeleccionada, setDireccionSeleccionada] = useState(null);
    const [showAlert, setShowAlert] = useState(false); // Estado para manejar la alerta
    const { user } = useContext(AuthContext);
    const { carrito, inventario, vaciarCarrito } = useCarrito(); 
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

        if (carrito.length === 0) {
            alert('Tu carrito está vacío. Agrega productos para continuar.');
            return;
        }

        const fechaActual = new Date().toISOString();
        const costoEnvio = 50;

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
            if (!result.id_pedido) {
                throw new Error('No se pudo obtener el ID del pedido creado.');
            }

            const detallesPedido = carrito.map((producto) => ({
                id_detalle_pedido: 0,
                id_pedido: result.id_pedido,
                id_producto: producto.id,
                cantidad: producto.cantidad,
                estado: '1',
                precio_costo: producto.precio,
            }));

            const detalleResponse = await fetch(
                `https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Pedido/${result.id_pedido}/agregar-detalle`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(detallesPedido),
                }
            );

            if (!detalleResponse.ok) {
                const errorResponse = await detalleResponse.json();
                alert(`Error al agregar el detalle: ${errorResponse.title || detalleResponse.statusText}`);
                throw new Error(`Error al agregar el detalle: ${detalleResponse.statusText}`);
            }

            // Actualizar inventario
            for (const producto of carrito) {
                const cantidadActual = inventario[producto.nombre] || 0;
                const nuevaCantidad = cantidadActual - producto.cantidad;

                if (nuevaCantidad < 0) {
                    console.error(`La nueva cantidad para el producto ${producto.nombre} es negativa: ${nuevaCantidad}`);
                    alert(`No hay suficiente inventario para ${producto.nombre}.`);
                    return;
                }

                const inventarioUpdatePayload = {
                    id_inventario: 0,
                    id_producto: producto.id,
                    cantidad: nuevaCantidad,
                };

                try {
                    const inventarioResponse = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Inventario/modificar', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(inventarioUpdatePayload),
                    });

                    if (!inventarioResponse.ok) {
                        const errorResponse = await inventarioResponse.json();
                        console.error('Error al actualizar el inventario:', errorResponse);
                    }
                } catch (error) {
                    console.error('Error al realizar la solicitud de actualización de inventario:', error);
                }
            }

            setShowAlert(true); // Mostrar alerta al finalizar la compra
            setTimeout(() => {
                setShowAlert(false); // Ocultar alerta después de 2 segundos
                vaciarCarrito(); // Vaciar el carrito después de finalizar la compra
                navigate('/'); // Navegar a la página principal
            }, 2000);

        } catch (error) {
            console.error('Error al finalizar la compra:', error);
            alert('Hubo un problema al finalizar la compra. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className="direcciones-container">
            <h2>Direcciones</h2>
            <table className="direcciones-table">
                <thead>
                    <tr>
                        <th>Seleccionar</th>
                        <th>Municipio</th>
                        <th>Zona</th>
                        <th>Colonia</th>
                        <th>Dirección</th>
                    </tr>
                </thead>
                <tbody>
                    {direcciones.length > 0 ? (
                        direcciones.map((direccion) => (
                            <tr key={direccion.id_direccion} onClick={() => setDireccionSeleccionada(direccion.id_direccion)} style={{ cursor: 'pointer', backgroundColor: direccionSeleccionada === direccion.id_direccion ? '#d3d3d3' : 'transparent' }}>
                                <td>
                                    <input
                                        type="radio"
                                        name="direccion"
                                        value={direccion.id_direccion}
                                        checked={direccionSeleccionada === direccion.id_direccion}
                                        onChange={() => setDireccionSeleccionada(direccion.id_direccion)}
                                    />
                                </td>
                                <td>{direccion.municipio}</td>
                                <td>{direccion.zona}</td>
                                <td>{direccion.colonia}</td>
                                <td>{direccion.direccion}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No tienes direcciones asociadas.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={finalizarCompra} disabled={!direccionSeleccionada}>
                Finalizar Compra
            </button>
            <button onClick={() => navigate('/AgregarDireccion')} className="btn-agregar-direccion">
                Agregar Dirección
            </button>

            {/* Mostrar alerta */}
            {showAlert && <div className="alert">Compra finalizada con éxito.</div>}
        </div>
    );
}
