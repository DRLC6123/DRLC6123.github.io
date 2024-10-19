import { Link } from 'react-router-dom';

export function Productos({ id, nombre, precio, descripcion, imagen }) {
    console.log('ID del producto en Productos:', id); // Log para verificar el ID
    return (
        <div className="producto">
            <Link to={`/productos/${id}`} state={{ id, nombre, precio, descripcion, imagen }}>
                <img src={imagen} alt={nombre} />
                <h3>{nombre}</h3>
                <p className="price">{precio}</p>
                <p className="descripcion">{descripcion}</p>
            </Link>
        </div>
    );
}
