import React from 'react';
import { NavLink } from 'react-router-dom';
export function Banner(){

  return (


    <NavLink to = "/Ofertas">
      <img 
        src="/icons/ofertas.png" // Cambia la ruta a la ubicación de tu imagen
        alt="Banner de Ofertas"
        style={{
          cursor: 'pointer',
          maxWidth: '80%', // Ajusta el ancho máximo según tus necesidades
          height: 'auto',
          display: 'block', // Asegúrate de que se trate como un bloque
          margin: '0 auto' // Centra la imagen
        }}

      />
    </NavLink>
  );
};
