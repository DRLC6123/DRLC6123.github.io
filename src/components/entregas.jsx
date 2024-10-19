export function Entregas(){
return(
    <main className="delivery-container">
        <h2>Direcciones de Entrega</h2>
        
        <div id="no-directions-message" className="message">
            <p>No hay direcciones añadidas.</p>
        </div>

        <div id="address-form"> 


        </div>
            <h3>Añadir Nueva Dirección</h3>
            <form id="add-address-form"> 
            <label for="recipient-name">Nombre de quien recibe:</label>
                <input type="text" id="recipient-name" required/>

                <label for="recipient-lastname">Apellido de quien recibe:</label>
                <input type="text" id="recipient-lastname" required/>

                <label for="phone-number">Número de Teléfono:</label>
                <input type="tel" id="phone-number" required/>

                <label for="exact-address">Dirección Exacta:</label>
                <input type="text" id="exact-address" required/>

                <label for="references">Referencias (opcional):</label>
                <input type="text" id="references"/>

                <button type="submit" className="add-address-btn">Añadir Dirección</button>
            </form>
                
        <div id="address-list">
            <h3>Direcciones Añadidas</h3>
            <ul id="addresses"></ul>
        </div>
    </main>



)

}