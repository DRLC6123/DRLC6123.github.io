import { Link } from 'react-router-dom';

export function Productos({ id, nombre, precio, precioOriginal, descripcion, imagen, isDisabled }) {
    const tieneOferta = precioOriginal > precio; // Determina si hay oferta

    return (
        <div className={`producto-card ${isDisabled ? "disabled" : ""}`}>
            {isDisabled ? (
                <div>
                    <img src={imagen} alt={nombre} />
                    <h3>{nombre}</h3>
                    <p className="price">
                        {tieneOferta && (
                            <span style={{ textDecoration: 'line-through', marginRight: '5px' }}>
                                Q{precioOriginal.toFixed(2)} {/* Mostrar precio original tachado solo si hay oferta */}
                            </span>
                        )}
                        Q{precio.toFixed(2)} {/* Mostrar precio en oferta */}
                    </p>
                    <p className="descripcion">{descripcion}</p>
                </div>
            ) : (
                <Link to={`/productos/${id}`} state={{ id, nombre, precio, descripcion, imagen }}>
                    <img src={imagen} alt={nombre} />
                    <h3>{nombre}</h3>
                    <p className="price">
                        {tieneOferta && (
                            <span style={{ textDecoration: 'line-through', marginRight: '5px' }}>
                                Q{precioOriginal.toFixed(2)} {/* Mostrar precio original tachado solo si hay oferta */}
                            </span>
                        )}
                        Q{precio.toFixed(2)} {/* Mostrar precio en oferta */}
                    </p>
                    <p className="descripcion">{descripcion}</p>
                </Link>
            )}
        </div>
    );
}
