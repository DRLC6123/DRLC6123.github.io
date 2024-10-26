import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

export function RegistroAdmin() {
    const { register, handleSubmit } = useForm();
    const [showAlert, setShowAlert] = useState(false); // Estado para manejar la alerta
    const navigate = useNavigate(); // Inicializar useNavigate

    const onSubmit = async (data) => {
        try {
            const payload = {
                nombre: data.nombre,
                apellido: data.apellido,
                correo: data.email,
                password: data.password,
                estado: 1,  // valor quemado
                id_rol: 1,  // valor quemado
            };
    
            const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Principal/Registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),  // Enviar datos
            });
    
            if (response.ok) {
                setShowAlert(true); // Mostrar alerta de éxito
                setTimeout(() => {
                    navigate('/login'); // Redirigir al login
                }, 2000); // Esperar 2 segundos antes de redirigir
            } else {
                const errorMsg = await response.text();
                setShowAlert(true); // Mostrar alerta de error
                setTimeout(() => {
                    setShowAlert(false); // Ocultar alerta después de 2 segundos
                }, 2000);
            }
        } catch (error) {
            console.error('Error:', error.message);
            setShowAlert(true); // Mostrar alerta de error en caso de excepción
            setTimeout(() => {
                setShowAlert(false); // Ocultar alerta después de 2 segundos
            }, 2000);
        }
    };

    return (
        <div className="login-container-registro">
            <div className="left-panel">
                <h2>Registro usuario Administrador</h2>
                <p>Por favor, ingresa los datos para crear cuenta de administrador.</p>
            </div>
            <div className="right-panel">
                <h2>Regístrate</h2>
                <form id="registration-form" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="nombre">Nombre *</label>
                    <input type="text" {...register('nombre')} name="nombre" placeholder="Ingresa tu nombre" required />
                    
                    <label htmlFor="apellido">Apellido *</label>
                    <input type="text" id="apellido" {...register('apellido')} placeholder="Ingresa tu apellido" required />
                    
                    <label htmlFor="email">Correo Electrónico *</label>
                    <input type="email" id="email" {...register('email')} placeholder="Ingresa tu correo electrónico" required />
                    
                    <label htmlFor="password">Contraseña *</label>
                    <input type="password" id="password" {...register('password')} placeholder="Crea una contraseña" required />
                    
                    <label htmlFor="confirm-password">Confirmar Contraseña *</label>
                    <input type="password" id="confirm-password" name="confirm-password" placeholder="Repite la contraseña" required />
                    
                    <button type="submit" className="submit-btn">Registrar</button>
                </form>

                {/* Mostrar alerta */}
                {showAlert && (
                    <div className="alert">
                        Se registró correctamente
                    </div>
                )}
            </div>
        </div>
    );
}
