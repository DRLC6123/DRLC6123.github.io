import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from "./AuthContext";
import { Footer } from "./footer";

export function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Mostrar mensaje de bienvenida si el usuario ya está logueado
  useEffect(() => {
    if (user) {
      alert(`Bienvenido, ${user.nombre}`); // O puedes usar un modal en lugar de alert
      navigate('/'); // Redirigir si el usuario ya está autenticado
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Principal/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }
      const result = await response.json();
      setUser(result); // Guardar datos del usuario en el contexto
      localStorage.setItem('usuario', JSON.stringify(result));
      navigate('/');

    } catch (error) {
      setError(error.message);
    }
  };


  if (user) {
    return null; // O puedes retornar un componente que muestre "Cargando..." mientras redirige
  }

  return (
    <>
      <main className="login-signup-container">
        <div className="left-panel">
          <h2>¡Bienvenido de nuevo!</h2>
          <p>Para mantenerte conectado con nosotros, por favor inicia sesión con tu información personal.</p>
        </div>

        <div className="right-panel">
          <h2>Iniciar Sesión</h2>
          {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="correo">Correo electrónico *</label>
            <input
              type="email"
              id="correo"
              {...register('correo', { required: 'El correo es obligatorio' })}
              placeholder="Ingresa tu correo"
            />
            <span className="error-message">El correo electrónico es inválido</span>

            <label htmlFor="password">Contraseña *</label>
            <input
              type="password"
              id="password"
              {...register('password', { required: 'La contraseña es obligatoria' })}
              placeholder="Ingresa tu contraseña"
            />
            <span className="error-message">El campo es requerido</span>

            <div className="remember-forgot">
            </div>

            <button type="submit" className="submit-btn">Iniciar sesión</button>
          </form>

          <p>¿No tienes cuenta? <NavLink to="/registro">Regístrate aquí</NavLink></p>
        </div>
      </main>
      <Footer />
    </>
  );
}
