import { useFetch } from "../useFetch.js";
import { Productos } from "./productos";
import { useState, useEffect } from "react";

export function Ofertas() {
    const { data: productos, error: errorProductos } = useFetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Producto/activos');
    const { data: ofertas, error: errorOfertas } = useFetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Oferta/ofertas');
    const [inventarios, setInventarios] = useState({});

    // Filtrar productos que están en oferta
    const productosConOferta = productos?.filter(producto =>
        ofertas.some(oferta => oferta.producto === producto.nombre)
    ) || [];

    // Obtener inventario solo cuando hay productos con oferta
    useEffect(() => {
        const obtenerInventario = async () => {
            const nuevosInventarios = {};

            for (const producto of productosConOferta) {
                const url = `https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Inventario/inventario?nombreProducto=${encodeURIComponent(producto.nombre)}`;
                
                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    const inventoryData = await response.json();
                    nuevosInventarios[producto.id_producto] = (inventoryData[0]?.cantidad || 0);
                } catch (error) {
                    console.error(`Error al obtener el inventario para ${producto.nombre}:`, error);
                    nuevosInventarios[producto.id_producto] = 0; // Asignar 0 en caso de error
                }
            }

            setInventarios(nuevosInventarios);
        };

        // Llama a obtenerInventario solo si hay productos en oferta
        if (productosConOferta.length > 0) {
            obtenerInventario();
        }
    }, [productosConOferta]); // Asegúrate de que esta dependencia sea correcta

    return (
        <div>
            <h1>OFERTAS</h1>
            <div id="product-container" className="products">
                {errorProductos && <p>Error: {errorProductos}</p>}
                {errorOfertas && <p>Error: {errorOfertas}</p>}
                
                {productosConOferta.map((producto) => {
                    const oferta = ofertas.find(oferta => oferta.producto === producto.nombre);
                    return (
                        <div className="producto" key={producto.id_producto}>
                            <Productos 
                                id={producto.id_producto}
                                nombre={producto.nombre}
                                precio={oferta?.precio}    // Precio en oferta
                                precioOriginal={producto.precio_final} // Precio original
                                descripcion={producto.descripcion}
                                imagen={producto.imagen}
                                isDisabled={inventarios[producto.id_producto] === 0}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
