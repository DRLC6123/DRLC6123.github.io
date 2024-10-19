import { useLocation } from 'react-router-dom';
import { useCarrito } from './CarritoContext'; // Asegúrate de importar el hook de carrito

export function DetalleProducto() {
    const location = useLocation();
    const { setCarrito } = useCarrito(); // Obtiene la función para actualizar el carrito
    const { id, nombre, precio, descripcion, imagen } = location.state || {};

    if (!id) {
        return <p>Error: ID de producto no disponible.</p>;
    }
    

    const handleAgregarAlCarrito = () => {
        const producto = { id, nombre, precio, descripcion, imagen, cantidad: 1 };
        setCarrito((prev) => {
            const productoExistente = prev.find((prod) => prod.id === id); // Busca si el producto ya está en el carrito por 'id'
            if (productoExistente) {
                // Si existe, actualiza la cantidad
                return prev.map((prod) =>
                    prod.id === id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
                );
            }
            // Si no existe, agrega el nuevo producto
            return [...prev, producto];
        });
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
            
        </div>
    );
}
