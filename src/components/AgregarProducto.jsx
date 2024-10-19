import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFetch } from '../useFetch';

export function AgregarProducto() {
    const [imagen, setImagen] = useState(null);
    const { register, handleSubmit } = useForm();
    const [proveedores, setProveedores] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [mensajeExito, setMensajeExito] = useState(''); // Para el mensaje de éxito

    // Convertir imagen a base64
    const convertirBase64 = (imagenes) => {
        const archivo = imagenes[0];
        var reader = new FileReader();
        
        reader.readAsDataURL(archivo);
        reader.onload = function () {
            const base64ConEncabezado = reader.result;
            setImagen(base64ConEncabezado);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };

    // Cargar proveedores
    const fetchProveedores = async () => {
        try {
            const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Proveedor/obtener');
            const data = await response.json();
            setProveedores(data.map(item => ({
                id_proveedor: item.id_proveedor,
                nombre: item.nombre,
            })));
        } catch (error) {
            console.error('Error al obtener proveedores:', error);
        }
    };

    // Cargar categorías
    const fetchCategorias = async () => {
        try {
            const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Categoria/activas');
            const data = await response.json();
            setCategorias(data.map(item => ({
                id_categoria: item.id_categoria,
                nombre: item.nombre,
            })));
        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    };

    useEffect(() => {
        fetchProveedores();
        fetchCategorias();
    }, []);

    const onSubmit = async (data) => {
        const payload = {
            id_producto: 0,
            id_proveedor: data.proveedor,
            id_categoria: data.categoria,
            nombre: data.nombre,
            descripcion: data.descripcion,
            codigo_barra: data.codigo_barra,
            precio_base: data.precio_base,
            precio_final: data.precio_final,
            estado: '1',
            imagen: imagen || "string",
            fecha_creacion: new Date().toISOString(),
        };

        try {
            const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Producto/guardar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const contentType = response.headers.get('content-type');
            let result;
            if (contentType && contentType.includes('application/json')) {
                result = await response.json();
            } else {
                result = await response.text();
            }

            setMensajeExito('Producto agregado exitosamente.'); // Mostrar mensaje de éxito
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        convertirBase64(e.dataTransfer.files); // Convertir archivos arrastrados a base64
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleClickArea = () => {
        document.getElementById('fileInput').click(); // Simular clic en el input de archivo
    };

    return (
        <div>
            <h1>Agregar Producto</h1>
            {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>} {/* Mensaje de éxito */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="proveedor">Seleccione un proveedor:</label>
                <select id="proveedor" {...register('proveedor')} required>
                    <option value="">Seleccione...</option>
                    {proveedores.map((item) => (
                        <option key={item.id_proveedor} value={item.id_proveedor}>
                            {item.nombre}
                        </option>
                    ))}
                </select>

                <label htmlFor="categoria">Seleccione una categoría:</label>
                <select id="categoria" {...register('categoria')} required>
                    <option value="">Seleccione...</option>
                    {categorias.map((item) => (
                        <option key={item.id_categoria} value={item.id_categoria}>
                            {item.nombre}
                        </option>
                    ))}
                </select>

                <label htmlFor="nombre">Nombre *</label>
                <input type="text" {...register('nombre')} placeholder="Nombre del producto" required />

                <label htmlFor="descripcion">Descripción *</label>
                <input type="text" {...register('descripcion')} placeholder="Descripción del producto" required />

                <label htmlFor="codigo_barra">Código de barra *</label>
                <input type="text" {...register('codigo_barra')} placeholder="Código de barra" required />

                <label htmlFor="precio_base">Precio base *</label>
                <input type="number" {...register('precio_base')} placeholder="Precio base" required />

                <label htmlFor="precio_final">Precio final *</label>
                <input type="number" {...register('precio_final')} placeholder="Precio final" required />

                {/* Área de arrastrar y seleccionar archivo */}
                <div
                    className="dropzone"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={handleClickArea}
                >
                    <p>Arrastra y suelta la imagen aquí o <span>haz clic</span> para seleccionar una imagen</p>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={(e) => convertirBase64(e.target.files)}
                    />
                </div>

                {imagen && (
                    <div className="imagen-preview">
                        <img src={imagen} alt="Previsualización" />
                    </div>
                )}

                <button type="submit" className="submit-btn">Agregar Producto</button>
            </form>
        </div>
    );
}
