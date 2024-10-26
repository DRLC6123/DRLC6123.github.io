import React, { useEffect, useState } from 'react';
import '../css/index.css';

export function AgregarOferta() {
    const [temporadas, setTemporadas] = useState([]);
    const [productos, setProductos] = useState([]);
    const [oferta, setOferta] = useState({
        id_oferta: 0,
        id_temporada: 0,
        id_producto: 0,
        precio_oferta: 0,
        estado: '1',
    });

    useEffect(() => {
        const fetchTemporadas = async () => {
            try {
                const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Temporada');
                const data = await response.json();
                const temporadasConId = data.map(item => ({
                    id_temporada: item.id_temporada,
                    nombre: item.nombre,
                }));
                setTemporadas(temporadasConId);
            } catch (error) {
                console.error('Error al obtener las temporadas:', error);
            }
        };

        const fetchProductos = async () => {
            try {
                const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Producto/activos');
                const data = await response.json();
                const productosConId = data.map(item => ({
                    id_producto: item.id_producto,
                    nombre: item.nombre,
                }));
                setProductos(productosConId);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        fetchTemporadas();
        fetchProductos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOferta(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Oferta/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(oferta),
            });

            if (!response.ok) {
                throw new Error('Error al crear la oferta');
            }

            const result = await response.json();
            console.log('Oferta creada:', result);
            alert('Oferta creada exitosamente');

            setOferta({
                id_oferta: 0,
                id_temporada: 0,
                id_producto: 0,
                precio_oferta: 0,
                estado: '1',
            });

        } catch (error) {
            console.error('Error al enviar la oferta:', error);
            alert('Hubo un problema al crear la oferta. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div className="agregar-oferta">
            <h1>Agregar Oferta</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Temporada:
                    <select
                        name="id_temporada"
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una temporada</option>
                        {temporadas.map(temporada => (
                            <option key={temporada.id_temporada} value={temporada.id_temporada}>
                                {temporada.nombre}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Producto:
                    <select
                        name="id_producto"
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona un producto</option>
                        {productos.map(producto => (
                            <option key={producto.id_producto} value={producto.id_producto}>
                                {producto.nombre}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Precio de Oferta:
                    <input
                        type="number"
                        name="precio_oferta"
                        value={oferta.precio_oferta}
                        onChange={handleChange}
                        required
                    />
                </label>

                <button type="submit" className="submit-btn">Agregar Oferta</button>
            </form>
        </div>
    );
}
