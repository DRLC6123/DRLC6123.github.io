import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function AgregarCategoria() {
    const [imagenBase64, setImagenBase64] = useState(null);
    const [mensajeExito, setMensajeExito] = useState('');
    const { register, handleSubmit } = useForm();

    // Convertir imagen a base64
    const convertirBase64 = (imagenes) => {
        const archivo = imagenes[0];
        var reader = new FileReader();

        reader.readAsDataURL(archivo);
        reader.onload = function () {
            const base64ConEncabezado = reader.result;
            setImagenBase64(base64ConEncabezado);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };

    const onSubmit = async (data) => {
        const payload = {
            id_categoria: 0,
            nombre: data.nombre,
            id_padre: 1,
            estado: "1",
            imagen: imagenBase64,
        };

        try {
            const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Categoria/crear', {
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

            setMensajeExito('Categoría agregada exitosamente.');
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    // Manejar drop de archivo
    const handleDrop = (e) => {
        e.preventDefault();
        convertirBase64(e.dataTransfer.files);
    };

    // Manejar drag over
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // Simular clic en el input de archivo
    const handleClickArea = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <div>
            <h1>Agregar Categoría</h1>
            {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="nombre">Nombre *</label>
                <input type="text" {...register('nombre')} placeholder="Nombre de la categoría" required />

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

                {imagenBase64 && (
                    <div className="imagen-preview">
                        <img src={imagenBase64} alt="Previsualización" />
                    </div>
                )}

                <button type="submit" className="submit-btn">Agregar Categoría</button>
            </form>
        </div>
    );
}
