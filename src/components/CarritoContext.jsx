import React, { createContext, useContext, useState } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]); // Inicializa el carrito vacío

    return (
        <CarritoContext.Provider value={{ carrito, setCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
};

export const useCarrito = () => {
    return useContext(CarritoContext);
};
