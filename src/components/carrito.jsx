import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from './CarritoContext';

export function Carrito() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { carrito, setCarrito, inventario, setInventario } = useCarrito();
  const costoEnvio = 5;

  // Obtener inventario una vez al cargar el componente
  useEffect(() => {
      const obtenerInventario = async () => {
          const nombresProductos = carrito.map(prod => prod.nombre);
          const nuevasCantidades = {};

          for (const nombre of nombresProductos) {
              const url = `https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Inventario/inventario?nombreProducto=${encodeURIComponent(nombre)}`;
              
              try {
                  const response = await fetch(url);
                  if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                  }

                  const data = await response.json();
                  if (data && Array.isArray(data) && data.length > 0) {
                      nuevasCantidades[nombre] = data[0].cantidad || 0;
                  } else {
                      nuevasCantidades[nombre] = 0;
                  }
              } catch (error) {
                  console.error(`Error al obtener el inventario para el producto ${nombre}:`, error);
                  nuevasCantidades[nombre] = 0;
              }
          }

          setInventario(nuevasCantidades); // Almacena el inventario en el contexto
      };

      if (carrito.length > 0) {
          obtenerInventario();
      }
  }, [carrito, setInventario]);

    const actualizarCantidad = (nombreProducto, nuevaCantidad) => {
        if (nuevaCantidad < 1) return;

        // Verificar que no se exceda la cantidad disponible
        if (nuevaCantidad > (inventario[nombreProducto] || 0)) {
            alert('No puedes agregar más de la cantidad disponible en inventario.');
            return;
        }

        setCarrito((prev) =>
            prev.map((prod) =>
                prod.nombre === nombreProducto ? { ...prod, cantidad: nuevaCantidad } : prod
            )
        );
    };

    const eliminarProducto = (nombreProducto) => {
        setCarrito((prev) => prev.filter((prod) => prod.nombre !== nombreProducto));
    };

    const handleFinalizarCompra = () => {
        if (!user) {
            alert('Debes iniciar sesión para finalizar la compra.');
            navigate('/login');
        } else if (carrito.length === 0) {
            alert('Tu carrito está vacío. Agrega productos para continuar.');
        } else {
            navigate('/Direcciones');
        }
    };

    const calcularSubtotal = () => {
        return carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
    };

    const calcularTotal = () => {
        return calcularSubtotal() + costoEnvio;
    };

    return (
        <main className="cart-container">
            <h2>Tu Carrito de Compras</h2>
            {carrito.length === 0 ? (
                <p>No hay productos en tu carrito. Agrega algunos para continuar.</p>
            ) : (
                <>
                    {carrito.map((prod) => (
                        <div key={prod.nombre} className="product-card">
                            <div className="product-details">
                                <img src={prod.imagen} alt={prod.nombre} />
                                <div className="product-info">
                                    <h4>{prod.nombre}</h4>
                                    <p className="product-price">Precio: Q{prod.precio}</p>
                                </div>
                            </div>
                            <div className="quantity-control">
                                <button
                                    className="decrease"
                                    onClick={() => actualizarCantidad(prod.nombre, prod.cantidad - 1)}
                                >
                                    -
                                </button>
                                <span>{prod.cantidad}</span>
                                <button
                                    className="increase"
                                    onClick={() => actualizarCantidad(prod.nombre, prod.cantidad + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button className="remove-btn" onClick={() => eliminarProducto(prod.nombre)}>
                                Eliminar
                            </button>
                        </div>
                    ))}

                    <div className="cart-total">
                        <div>
                            <span>Subtotal:</span>
                            <span>Q{calcularSubtotal()}</span>
                        </div>
                        <div>
                            <span>Envío:</span>
                            <span>Q{costoEnvio}</span>
                        </div>
                        <div>
                            <h3>Total:</h3>
                            <h3>Q{calcularTotal()}</h3>
                        </div>
                    </div>

                    <button onClick={handleFinalizarCompra} className="checkout-btn">
                        Finalizar Compra
                    </button>
                </>
            )}
        </main>
    );
}
