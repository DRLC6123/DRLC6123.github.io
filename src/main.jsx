// dependencias
import React, { useState } from 'react'; 
import { createRoot } from 'react-dom/client';
import { Inicio } from './components/Inicio.jsx';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// css
import './css/login.css';
import './css/carrito.css';
import './css/registro.css';
import './css/barraNavegacionFooter.css';
import './css/index.css';
import './css/detalleproducto.css';
import './css/AgregarProducto.css';
import './css/controlPanel.css';

// Componentes
import { Login } from './components/Login.jsx';
import { Barra } from './components/barra.jsx';
import { Registro } from './components/Registro.jsx';
import { ProductosPagina } from './components/ProductosPagina.jsx';
import { AgregarProducto } from './components/AgregarProducto.jsx';
import { AgregarCategoria } from './components/AgregarCategoria.jsx';
import { AgregarOferta } from './components/AgregarOferta.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { DetalleProducto } from './components/DetalleProducto.jsx';
import { Carrito } from './components/carrito.jsx';
import { AuthProvider } from './components/AuthContext.jsx';
import { Direcciones } from './components/Direcciones.jsx';
import { AgregarDireccion } from './components/AgregarDireccion.jsx';
import { UserSection } from './components/UserSection.jsx';
import { CarritoProvider } from './components/CarritoContext.jsx';
import { Inventario } from './components/Inventario.jsx';
import { ControlPanel } from './components/ControlPanel.jsx';
import { AgregarTemporada } from './components/AgregarTemporada.jsx';
import { Pedidos } from './components/Pedidos.jsx';
import { AgregarProveedor } from './components/AgregarProveedor.jsx';
import { VerPedidos } from './components/VerPedidos.jsx';
import { ModificarCategoria } from './components/ModificarCategoria.jsx';
import ModificarOferta from './components/ModificarOferta.jsx';
import { Ofertas } from './components/OfertasPagina.jsx';
import { Categorias } from './components/Categorias.jsx';
import { ProductosPorCategoria } from './components/ProductosPorCategoria.jsx';
import {RegistroAdmin} from './components/RegistroAdmin.jsx'

const Layout = ({ agregarProducto }) => (
  <>
    <Barra />
    <Outlet context={{ agregarProducto }} />
  </>
);

const App = () => {
  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto) => {
    const existe = carrito.find((prod) => prod.nombre === producto.nombre);
    if (existe) {
      const nuevosProductos = carrito.map((prod) =>
        prod.nombre === producto.nombre
          ? { ...prod, cantidad: (prod.cantidad || 1) + 1 }
          : prod
      );
      setCarrito(nuevosProductos);
    } else {
      setCarrito((prev) => [...prev, { ...producto, cantidad: 1 }]);
    }
  };

  const router = createBrowserRouter([

      {
          path: "/",
          element: <Layout agregarProducto={agregarProducto} />,
          children: [
              { path: "/", element: <Inicio /> },
              { path: "/productos", element: <ProductosPagina /> },
              { path: "/carrito", element: <Carrito carrito={carrito} setCarrito={setCarrito} /> }, // Pasar setCarrito aquí
              { path: "/login", element: <Login/> },
              { path: "/registro", element: <Registro /> },
              { path: "/AgregarProducto", element: <AgregarProducto /> },
              { path: "/ModificarProducto", element: <AgregarProducto /> },


              { path: "/AgregarCategoria", element: <AgregarCategoria /> },
              { path: "/ModificarCategoria", element: <ModificarCategoria /> },

              { path: "/AgregarOferta", element: <AgregarOferta /> },
              { path: "/ModificarOferta", element: <ModificarOferta /> },

              { path: "/Direcciones", element: <Direcciones /> },
              { path: "/AgregarDireccion", element: <AgregarDireccion /> },
              { path: "/productos/:id", element: <DetalleProducto agregarProducto={agregarProducto}/> },
              { path: "/Perfil", element: <UserSection /> },  // Nueva ruta para el perfil
              { path: "/ControlPanel", element: <ControlPanel /> },
              { path: "/Pedidos", element: <Pedidos></Pedidos>},
              { path: "/AgregarProveedor", element:<AgregarProveedor></AgregarProveedor>},
              { path: "/VerPedidos", element:<VerPedidos/>},
              { path: "/Ofertas", element:<Ofertas/>},
              { path: "/RegistroAdmin", element:<RegistroAdmin/>},

              { path: "/Categorias", element:<Categorias/>},
              {path:"/productos/categoria/:id_categoria", element:<ProductosPorCategoria /> },

              { path: "/inventario", element: <Inventario></Inventario>}


          ]
      }
  ]);

  return (
    <CarritoProvider>
      <AuthProvider>
        <ErrorBoundary>
          <RouterProvider path="/" router={router} />

        </ErrorBoundary>
      </AuthProvider>
    </CarritoProvider>
  );
};

createRoot(document.getElementById('root')).render(<App />);
