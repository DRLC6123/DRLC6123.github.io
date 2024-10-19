import { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Asegúrate de que el contexto esté importado
import { useNavigate } from 'react-router-dom';
import { useCarrito } from './CarritoContext'; // Asegúrate de importar el hook de carrito

export function Carrito() {
    const { user } = useContext(AuthContext); // Obtiene el usuario del contexto
    const navigate = useNavigate();
    const { carrito, setCarrito } = useCarrito(); // Obtiene el carrito y la función para actualizarlo

    const actualizarCantidad = (idProducto, nuevaCantidad) => {
        if (nuevaCantidad < 1) return;
        setCarrito((prev) =>
            prev.map((prod) =>
                prod.id === idProducto ? { ...prod, cantidad: nuevaCantidad } : prod
            )
        );
    };

    const eliminarProducto = (idProducto) => {
        setCarrito((prev) => prev.filter((prod) => prod.id !== idProducto));
    };

    const handleFinalizarCompra = () => {
        if (!user) {
            alert('Debes iniciar sesión para finalizar la compra.'); // Mensaje de advertencia
            navigate('/login'); // Redirige al login
        } else if (carrito.length === 0) {
            alert('Tu carrito está vacío. Agrega productos para continuar.'); // Mensaje de carrito vacío
        } else {
            navigate('/Direcciones'); // Redirige al formulario de dirección
        }
    };

    return (
        <main className="cart-container">
            <h2>Tu Carrito de Compras</h2>
            {carrito.length === 0 ? ( // Verificación del carrito vacío
                <p>No hay productos en tu carrito. Agrega algunos para continuar.</p>
            ) : (
                <>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Subtotal</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carrito.map((prod) => (
                                <tr key={prod.id}>
                                    <td>{prod.nombre}</td>
                                    <td>{prod.precio}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={prod.cantidad}
                                            min="1"
                                            onChange={(e) => actualizarCantidad(prod.id, parseInt(e.target.value))}
                                        />
                                    </td>
                                    <td>{prod.precio * prod.cantidad}</td>
                                    <td>
                                        <button className="remove-btn" onClick={() => eliminarProducto(prod.id)}>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="shipping-info">
                        <p><strong>Costo adicional por envío:</strong> $5.00</p>
                    </div>
                    <div className="cart-total">
                        <h3>Total: {carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0) + 5}</h3>
                        <button onClick={handleFinalizarCompra} className="finalizar-compra-btn">
                            Finalizar Compra
                        </button>
                    </div>
                </>
            )}
        </main>
    );
}
