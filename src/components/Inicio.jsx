import { Barra } from "./barra";
import { Contenido } from "./contenidoprin";
import { Footer } from "./footer";
import { Banner} from "./banner"
import { Productos } from "./productos";
import { BrowserRouter } from "react-router-dom";


export function Inicio(){

return(
    <section>      
        <Banner></Banner>
        <Contenido/>    
        <Footer/>
    </section>
 
   


)

}