import { NavLink } from 'react-router-dom';
import { UserSection } from './UserSection';  // Ajusta la ruta si es necesario

export function Barra() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <NavLink to="/" className="logo">
          <img src="/public/icons/icono.png" alt="Logo" className="logo-image" width="100" />
          <span className="logo-text">El Regalito</span>
        </NavLink>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/productos" className="nav-button">
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink to="/categorias" className="nav-button">
            Categorías
          </NavLink>
        </li>
        <li id="user-section">
          <UserSection />
        </li>
        <li className="carrito-container">
          <NavLink to="/carrito" className="cart-link">
            <img src="/public/icons/carrito de compras.png" alt="Carrito de Compras" className="cart-icon" width="32" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
