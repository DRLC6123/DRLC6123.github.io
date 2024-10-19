import { NavLink } from 'react-router-dom';


export function ControlPanel(){
return(
    <div>
    <nav className="">

      <ul className="">
        <li>
          <NavLink to="/AgregarProducto" className="nav-button">
            AgregarProducto
          </NavLink>
        </li>
        <li>
          <NavLink to="/AgregarCategoria" className="nav-button">
            Agregar Categorias
          </NavLink>
        </li>
        <li className="">
        <NavLink to="/AgregarOferta" className="nav-button">
            Agregar Oferta
          </NavLink>
        </li>
        <li className="">
        <NavLink to="/AgregarTemporada" className="nav-button">
            Agregar Temporada
          </NavLink>
        </li>
        
        <li className="">
        <NavLink to="/Pedidos" className="nav-button">
            Pedidos
          </NavLink>
        </li>

        <li className="">
        <NavLink to="/Inventario" className="nav-button">
            Inventario
          </NavLink>
        </li>
   

      </ul>
    </nav>
    </div>
)
}