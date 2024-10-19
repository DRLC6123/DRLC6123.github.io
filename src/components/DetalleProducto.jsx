import { useLocation } from 'react-router-dom';
import { useCarrito } from './CarritoContext'; // Hook del carrito
import { useState } from 'react';

export function DetalleProducto() {
    const location = useLocation();
    const { setCarrito } = useCarrito(); // Función para actualizar el carrito
    const { id, nombre, precio, descripcion, imagen } = location.state || {};
    const [showAlert, setShowAlert] = useState(false); // Estado para manejar la alerta

    if (!id) {
        return <p>Error: ID de producto no disponible.</p>;
    }

    const handleAgregarAlCarrito = () => {
        const producto = { id, nombre, precio, descripcion, imagen, cantidad: 1 };
        setCarrito((prev) => {
            const productoExistente = prev.find((prod) => prod.id === id);
            if (productoExistente) {
                return prev.map((prod) =>
                    prod.id === id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
                );
            }
            return [...prev, producto];
        });
        setShowAlert(true); // Mostrar alerta al agregar al carrito
        setTimeout(() => setShowAlert(false), 2000); // Ocultar alerta después de 2 segundos
    };

    if (!nombre) {
        return <p>No se encontraron detalles del producto.</p>;
    }

    return (
        <div className="product-container">
            <img src={imagen} alt={nombre} />
            <h2>{nombre}</h2>
            <p>{descripcion}</p>
            <p>Precio: {precio}</p>
            <button onClick={handleAgregarAlCarrito}>Agregar al Carrito</button>

            {/* Mostrar alerta */}
            {showAlert && <div className="alert">Producto agregado al carrito</div>}
        </div>
    );
}
