import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { AuthContext } from './AuthContext';

export function UserSection() {
  const { user, setUser } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUser(null); // Actualiza el contexto para que UserSection se re-renderice
    navigate('/login'); // Redirige al usuario a la página de login
  };

  return (
    <div id="user-section">
      {user ? (
        <div 
          onMouseEnter={() => setIsDropdownOpen(true)} 
          onMouseLeave={() => setIsDropdownOpen(false)} 
          style={{ position: 'relative' }} // Asegura que el menú esté posicionado correctamente
        >
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="dropdown-button custom-menu-button">
            Menú
          </button>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              {user.rol === 'Administrador' && (
                <NavLink to="/ControlPanel" className="nav-link">Panel de Control</NavLink>
              )}
              <NavLink to="/VerPedidos" className="nav-link">Mis pedidos</NavLink>
              <button onClick={handleLogout} className="nav-link">Cerrar Sesión</button>
            </div>
          )}
        </div>
      ) : (
        <NavLink to="/login" className="nav-link">Iniciar Sesión</NavLink>
      )}
    </div>
  );
}
