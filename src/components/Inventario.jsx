import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

export function Inventario() {
    const [inventario, setInventario] = useState([]);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // Fetch inventory data
        const fetchInventario = async () => {
            try {
                const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Inventario/inventario');
                const data = await response.json();
                setInventario(data);
            } catch (error) {
                console.error('Error al obtener el inventario:', error);
            }
        };

        // Fetch products data
        const fetchProductos = async () => {
            try {
                const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Producto/activos');
                const data = await response.json();
                setProductos(data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        fetchInventario();
        fetchProductos();
    }, []);

    // Handle cell edit
    const handleEdit = (index, field, value) => {
        const updatedInventario = [...inventario];
        updatedInventario[index][field] = value;
        setInventario(updatedInventario);
    };

    // Save changes to the API
    const handleSave = async (index) => {
        const item = inventario[index];
        const producto = productos.find(p => p.nombre === item.producto);
        if (!producto) {
            console.error('Producto no encontrado');
            return;
        }

        const dataToSend = {
            id_inventario: 0,
            id_producto: producto.id_producto,
            cantidad: item.cantidad
        };

        try {
            const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Inventario/modificar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                console.log('Inventario actualizado');
                alert('Inventario actualizado exitosamente.');
            } else {
                console.error('Error al actualizar el inventario:', response.statusText);
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };

     // Función para exportar la tabla a un archivo Excel
     const exportarExcel = () => {
        const hoja = XLSX.utils.json_to_sheet(inventario);
        const libro = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(libro, hoja, 'Inventario');
        XLSX.writeFile(libro, 'inventario.xlsx');
    };

    return (
        <div>
            <h2>Inventario</h2>
            <button onClick={exportarExcel}>Exportar a Excel</button>
            <table border="1" cellPadding="10">
            <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Proveedor</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {inventario.map((item, index) => (
                        <tr key={index}>
                            <td>{item.producto}</td>
                            <td>{item.proveedor}</td>
                            <td>
                                <input
                                    type="number"
                                    value={item.cantidad}
                                    onChange={(e) => handleEdit(index, 'cantidad', e.target.value)}
                                />
                            </td>
                            <td>
                                <button onClick={() => handleSave(index)}>Guardar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
