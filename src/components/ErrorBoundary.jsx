// src/components/ErrorBoundary.jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Actualiza el estado para mostrar la interfaz de reserva
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Puedes enviar el error a un servicio de monitoreo o registro aquí
        console.error("ErrorBoundary atrapó un error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Renderiza cualquier interfaz de reserva
            return <h2>Algo salió mal. Por favor, intenta más tarde.</h2>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary; // Exportación por defecto
