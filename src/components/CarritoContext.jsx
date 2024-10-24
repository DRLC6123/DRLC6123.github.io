import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]); // Inicializa el carrito vacío
    const [inventario, setInventario] = useState({}); // Nuevo estado para el inventario

    // Función para vaciar el carrito
    const vaciarCarrito = () => {
        setCarrito([]);
    };

    return (
        <CarritoContext.Provider value={{ carrito, setCarrito, inventario, setInventario, vaciarCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
};

export const useCarrito = () => {
    return useContext(CarritoContext);
};
