import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Productos } from './productos'; 

export function ProductosPorCategoria() {
    const { id_categoria } = useParams();
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Producto/activos');
                if (!response.ok) throw new Error('Error al obtener productos');
                const productosData = await response.json();
                // Filtrar productos por id_categoria
                const productosFiltrados = productosData.filter(producto => producto.id_categoria === parseInt(id_categoria));
                setProductos(productosFiltrados);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProductos();
    }, [id_categoria]);

    return (
        <div >
            <h1>Productos en la Categoría</h1>
            {error && <p>Error: {error}</p>}

            <div id="product-container" className="products">
            <div className="producto">
                {productos.map(producto => (
                    <Productos
                        key={producto.id_producto}
                        id={producto.id_producto}
                        nombre={producto.nombre}
                        precio={producto.precio_final}
                        descripcion={producto.descripcion}
                        imagen={producto.imagen}
                    />
                ))}
            </div>

            </div>
           
        </div>
    );
    
}
