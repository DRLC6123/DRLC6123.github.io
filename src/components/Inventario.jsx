import React, { useEffect, useState } from 'react';

export function Inventario() {
    const [productos, setProductos] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [selectedProducto, setSelectedProducto] = useState('');
    const [selectedProveedor, setSelectedProveedor] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [consultaInventario, setConsultaInventario] = useState(null);

    useEffect(() => {
        // Función para obtener productos de la API
        const fetchProductos = async () => {
            try {
                const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Producto/activos'); // Cambia la URL según tu API
                const data = await response.json();
                setProductos(data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        // Función para obtener proveedores de la API
        const fetchProveedores = async () => {
            try {
                const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Proveedor/obtener'); // Cambia la URL según tu API
                const data = await response.json();
                setProveedores(data);
            } catch (error) {
                console.error('Error al obtener proveedores:', error);
            }
        };

        fetchProductos();
        fetchProveedores();
    }, []);

    const handleConsulta = async () => {
        // Consulta el inventario con los datos seleccionados
        try {
            const response = await fetch(`https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Inventario/inventario?producto=${selectedProducto}&proveedor=${selectedProveedor}`);
            const data = await response.json();
            setConsultaInventario(data);
        } catch (error) {
            console.error('Error al consultar el inventario:', error);
        }
    };

    const handleModificacion = async (e) => {
        e.preventDefault();
        // Modifica la cantidad en el inventario
        try {
            const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Inventario/modificar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_inventario: 0, // ID siempre será 0 según lo especificado
                    id_producto: selectedProducto,
                    cantidad: parseInt(cantidad, 10),
                }),
            });

            if (!response.ok) {
                throw new Error('Error al modificar el inventario');
            }

            console.log('Inventario modificado exitosamente');
            setConsultaInventario(null); // Limpia la consulta actual
        } catch (error) {
            console.error('Error al modificar el inventario:', error);
        }
    };

    return (
        <div className="inventario">
            <h2>Gestión de Inventario</h2>
            <form onSubmit={handleModificacion}>
                <div>
                    <label htmlFor="producto">Seleccionar Producto:</label>
                    <select
                        id="producto"
                        value={selectedProducto}
                        onChange={(e) => setSelectedProducto(e.target.value)}
                    >
                        <option value="">Seleccione un producto</option>
                        {productos.map((producto) => (
                            <option key={producto.id} value={producto.id}>
                                {producto.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="proveedor">Seleccionar Proveedor:</label>
                    <select
                        id="proveedor"
                        value={selectedProveedor}
                        onChange={(e) => setSelectedProveedor(e.target.value)}
                    >
                        <option value="">Seleccione un proveedor</option>
                        {proveedores.map((proveedor) => (
                            <option key={proveedor.id} value={proveedor.id}>
                                {proveedor.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="cantidad">Cantidad:</label>
                    <input
                        type="number"
                        id="cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        required
                    />
                </div>
                <button type="button" onClick={handleConsulta}>
                    Consultar
                </button>
                <button type="submit">Modificar</button>
            </form>
            
            {/* Muestra los resultados de la consulta */}
            {consultaInventario && (
                <div className="resultado-consulta">
                    <h3>Resultado de la Consulta</h3>
                    <p>Producto: {consultaInventario[0]?.producto}</p>
                    <p>Proveedor: {consultaInventario[0]?.proveedor}</p>
                    <p>Cantidad: {consultaInventario[0]?.cantidad}</p>
                </div>
            )}
        </div>
    );
}
