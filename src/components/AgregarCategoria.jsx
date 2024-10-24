import { useState } from 'react';
import { useForm } from 'react-hook-form';


export function AgregarCategoria() {
    const [imagenBase64, setImagenBase64] = useState(null);

    const convertirBase64 = (imagenes) => {
        const archivo = imagenes[0];
        var reader = new FileReader();
        
        reader.readAsDataURL(archivo);
        reader.onload = function () {
            const base64ConEncabezado = reader.result; // Esto ya incluye el encabezado 'data:image/png;base64,'
            setImagen(base64ConEncabezado);
        };
    
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };
    

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const randomIdCategoria = Math.floor(Math.random() * 10) + 1; // Genera un número aleatorio entre 1 y 10

        const payload = {
            id_categoria: 0, // Usa el id aleatorio
            nombre: data.nombre,
            id_padre: 1, // Usa 0 si no hay id_padre
            estado: "1", // Asegúrate de que este campo sea una cadena, puedes ajustarlo si es necesario
            imagen: imagenBase64, // Usa la imagen en formato base64
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

            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="nombre">Nombre *</label>
                <input type="text" {...register('nombre')} placeholder="Nombre de la categoría" required />

                <label htmlFor="imagen">Imagen *</label>
                <input type="file" onChange={(e) => convertirBase64(e.target.files)} required />

                <button type="submit" className="submit-btn">Agregar Categoría</button>
            </form>
        </div>
    );
}
