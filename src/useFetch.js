import { useEffect, useState } from 'react';

export function useFetch(url, options = null) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: options?.method || 'GET', // 'GET' por defecto si no se especifica el método
          headers: {
            'Content-Type': 'application/json',
            ...options?.headers // Puedes agregar headers adicionales si es necesario
          },
          body: options?.body ? JSON.stringify(options.body) : null // Solo se envía body en métodos POST/PUT
        });

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        console.log('Datos recibidos:', jsonData); // Aquí se agregará el log para ver los datos
        setData(jsonData);
      } catch (err) {
        setError(err.message); // Captura el mensaje de error
      }
    };

    fetchData();
  }, [url, options]);

  return { data, error };
}
