import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export function ControlPanel() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="custom-control-panel">
            <nav className={`custom-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <button className="custom-toggle-button" onClick={toggleSidebar}>
                    {isSidebarOpen ? 'Ocultar Menú' : 'Mostrar Menú'}
                </button>
                <ul className="custom-nav-links">
                    <li>
                        <NavLink to="/AgregarProducto" className="custom-nav-button">
                            Agregar Producto
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/AgregarCategoria" className="custom-nav-button">
                            Agregar Categorías
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/AgregarOferta" className="custom-nav-button">
                            Agregar Oferta
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/AgregarProveedor" className="custom-nav-button">
                            Agregar Proveedor
                        </NavLink>
                    </li>
                    
                    <li>
                        <NavLink to="/RegistroAdmin" className="custom-nav-button">
                            Registrar Administrador
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Pedidos" className="custom-nav-button">
                            Pedidos
                        </NavLink>
                    </li>
                    
                    <li>
                        <NavLink to="/Inventario" className="custom-nav-button">
                            Inventario
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="custom-content">
                {/* Aquí va el contenido principal */}
            </div>
        </div>
    );
}
