import React, { useEffect, useState } from 'react';

export function Inventario() {
    const [productos, setProductos] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [selectedProducto, setSelectedProducto] = useState('');
    const [selectedProveedor, setSelectedProveedor] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [idProducto, setIdProducto] = useState(0);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Producto/activos');
                const data = await response.json();
                setProductos(data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        const fetchProveedores = async () => {
            try {
                const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Proveedor/obtener');
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
        if (!selectedProducto || !selectedProveedor) {
            console.error('Selecciona un producto y un proveedor antes de consultar.');
            return;
        }

        try {
            const response = await fetch(`https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Inventario/inventario?nombreProducto=${encodeURIComponent(selectedProducto)}&nombreProveedor=${encodeURIComponent(selectedProveedor)}`);

            if (!response.ok) {
                throw new Error(`Error en la consulta: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Datos de consulta:', data);

            if (data && data.length > 0) {
                setCantidad(data[0].cantidad);
                setIdProducto(data[0].id_producto);
            } else {
                console.error('No se encontraron datos en la consulta');
                setCantidad('');
                setIdProducto(0);
            }
        } catch (error) {
            console.error('Error al consultar el inventario:', error);
        }
    };

    const handleModificacion = async (e) => {
        e.preventDefault();

        if (idProducto <= 0 || cantidad === '') {
            console.error('ID de producto o cantidad no válidos. Verifica las selecciones.');
            return;
        }

        try {
            const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Inventario/modificar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id_inventario: 0, // Si id_inventario siempre es 0 según el requerimiento
                    id_producto: idProducto,
                    cantidad: parseInt(cantidad, 10),
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error al modificar el inventario: ${response.status} - ${errorText}`);
            }

            console.log('Inventario modificado exitosamente');
            setCantidad('');
            setSelectedProducto('');
            setSelectedProveedor('');
            setIdProducto(0);
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
                        onChange={(e) => {
                            const productoSeleccionado = e.target.value;
                            setSelectedProducto(productoSeleccionado);

                            const producto = productos.find(p => p.nombre === productoSeleccionado);
                            if (producto) {
                                setIdProducto(producto.id_producto);
                            } else {
                                setIdProducto(0);
                            }
                        }}
                    >
                        <option value="">Seleccione un producto</option>
                        {productos.map((producto) => (
                            <option key={producto.id_producto} value={producto.nombre}>
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
                        onChange={(e) => {
                            const proveedorSeleccionado = e.target.value;
                            setSelectedProveedor(proveedorSeleccionado);
                        }}
                    >
                        <option value="">Seleccione un proveedor</option>
                        {proveedores.map((proveedor) => (
                            <option key={proveedor.id} value={proveedor.nombre}>
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
        </div>
    );
}
