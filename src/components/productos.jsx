import { Link } from 'react-router-dom';

export function Productos({ id, nombre, precio, precioOriginal, descripcion, imagen, isDisabled }) {
    const tieneOferta = precioOriginal > precio; // Determina si hay oferta

    return (
        <div className={`producto-card ${isDisabled ? "disabled" : ""}`} style={{ position: 'relative' }}>
            {isDisabled ? (
                <>
                    <img src={imagen} alt={nombre} />
                    <h3>{nombre}</h3>
                    <p className="price">
                        {tieneOferta && (
                            <span className="precio-original">
                                Q{precioOriginal.toFixed(2)} {/* Mostrar precio original tachado solo si hay oferta */}
                            </span>
                        )}
                        <span className="precio-oferta">
                            Q{precio.toFixed(2)} {/* Mostrar precio en oferta */}
                        </span>
                    </p>
                    <p className="descripcion">{descripcion}</p>
                    <div className="agotado-text">Agotado</div>
                </>
            ) : (
                <Link to={`/productos/${id}`} state={{ id, nombre, precio, descripcion, imagen }}>
                    <img src={imagen} alt={nombre} />
                    <h3>{nombre}</h3>
                    <p className="price">
                        {tieneOferta && (
                            <span className="precio-original">
                                Q{precioOriginal.toFixed(2)} {/* Mostrar precio original tachado solo si hay oferta */}
                            </span>
                        )}
                        <span className="precio-oferta">
                            Q{precio.toFixed(2)} {/* Mostrar precio en oferta */}
                        </span>
                    </p>
                    <p className="descripcion">{descripcion}</p>
                </Link>
            )}
        </div>
    );
}
