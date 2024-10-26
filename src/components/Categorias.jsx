import { useFetch } from "../useFetch.js"; // Asegúrate de que este hook esté configurado para obtener los datos de las categorías
import { Link } from 'react-router-dom';
import React from 'react';

export function Categorias() {
    const { data: categoriasData, error: categoriasError } = useFetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Categoria/activas');

    return (
        <div>
            <h1>CATEGORÍAS</h1>
            <div className="categorias-container">
                {categoriasError && <p>Error: {categoriasError}</p>}
                {categoriasData?.map((categoria) => (
                    <div className="categoria-card" key={categoria.id_categoria}>
                        <Link to={`/productos/categoria/${categoria.id_categoria}`} state={{ id: categoria.id_categoria }}>
                            <img src={categoria.imagen} alt={categoria.nombre} />
                            <h3>{categoria.nombre}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
