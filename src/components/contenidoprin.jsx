import { useFetch } from "../useFetch.js";
import { Productos } from "./productos";

export function Contenido() {
    const { data, error } = useFetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Producto/mas-vendidos');

    return (
        <section>
            <div className="right-side">
                <h2 id="ofertas">Los más vendidos</h2>
                <div className="products">
                    <div id="product-container" className="products">
                        {error && <p>Error: {error}</p>} {/* Muestra el mensaje de error si existe */}
                        
                        {data?.map((producto) => (
                            <Productos
                                key={producto.id_producto}
                                id={producto.id_producto} // Asegúrate de pasar el ID aquí
                                nombre={producto.nombre}
                                precio={producto.precio_final}
                                descripcion={producto.descripcion}
                                imagen={producto.imagen}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
