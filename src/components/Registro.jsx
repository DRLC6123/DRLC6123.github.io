import { useForm } from 'react-hook-form';

export function Registro() {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            const payload = {
                nombre: data.nombre,
                apellido: data.apellido,
                correo: data.email,
                password: data.password,
                estado: 1,  // valor quemado
                id_rol: 2,  // valor quemado
            };
    
            const response = await fetch('https://el-regalito-back-cpcbafcrcyb8gsab.canadacentral-01.azurewebsites.net/api/Principal/Registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),  // Enviar datos
            });
    
            // Verifica si la respuesta es JSON, si no, tratarla como texto
            const contentType = response.headers.get('content-type');
            let result;
            if (contentType && contentType.includes('application/json')) {
                result = await response.json();  // Parsear como JSON
            } else {
                result = await response.text();  // Parsear como texto
            }
    
            console.log('Success:', result);  // Mostrar el resultado
        } catch (error) {
            console.error('Error:', error.message);
            // Manejar el error aquí
        }
    };




    
    return (
        <div className="login-container-registro">
            <div className="left-panel">
                <h2>¡Bienvenido!</h2>
                <p>Por favor, ingresa tus datos para crear tu cuenta.</p>
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
                    
                    <button type="submit" className="submit-btn">Registrarse</button>
                </form>
            </div>
        </div>
    );
}
