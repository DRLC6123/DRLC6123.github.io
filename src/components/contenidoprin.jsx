import { useFetch } from "../useFetch.js";
import { Productos } from "./productos";
import { useState, useEffect } from "react";

export function Contenido() {
    const { data: productosData, error: productosError } = useFetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Producto/activos');
    const { data: ofertasData, error: ofertasError } = useFetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Oferta/ofertas');
    const [inventarios, setInventarios] = useState({});

    useEffect(() => {
        const obtenerInventario = async () => {
            const nuevosInventarios = {};

            if (productosData) {
                for (const producto of productosData) {
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
            }

            setInventarios(nuevosInventarios);
        };

        obtenerInventario();
    }, [productosData]);

    return (
        <div>
            <h1>PRODUCTOS MAS VENDIDOS</h1>
            <div className="products">
                {productosError && <p>Error: {productosError}</p>}
                {ofertasError && <p>Error al cargar ofertas: {ofertasError}</p>}
                
                {productosData?.map((producto) => {
                    // Verificar si el producto está en oferta
                    const oferta = ofertasData?.find(oferta => oferta.producto === producto.nombre);
                    const precioEnOferta = oferta ? oferta.precio : producto.precio_final;

                    return (
                        <div className="producto" key={producto.id_producto}>
                            <Productos
                                id={producto.id_producto}
                                nombre={producto.nombre}
                                precio={precioEnOferta}
                                precioOriginal={producto.precio_final}
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
