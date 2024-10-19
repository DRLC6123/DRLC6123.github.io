import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Asegúrate de importar el contexto

export function UserSection() {
  const { user, setUser } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUser(null); // Actualiza el contexto para que UserSection se re-renderice
  };

  useEffect(() => {
    if (user) {
      const storedUser = JSON.parse(localStorage.getItem('usuario'));
      setUser(storedUser);
    }
  }, [user, setUser]);

  return (
    <div id="user-section">
      {user ? (
        <div>
          <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="dropdown-button">
            Menu
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {user.rol === 'Administrador' && (
                <NavLink to="/ControlPanel" className="nav-link">Panel de Control</NavLink>
              )}
              <NavLink to="/perfil" className="nav-link">Perfil</NavLink>
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
