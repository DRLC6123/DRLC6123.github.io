export function Footer(){
return(
  <footer className="footer">
  <div className="footer-container">
    <div className="footer-section">
      <h4>Sobre Nosotros</h4>
      <p>Somos una miscelánea comprometida con ofrecer productos de calidad a precios accesibles.</p>
      <p>Teléfono: +502 51237842</p>

      <div className="location-container">
        <a href="https://www.google.com/maps/place/Mercado+Santa+Cruz,+Mezquital+Villa+Nueva/@14.5535468,-90.5648578,15z/data=!4m6!3m5!1s0x8589a727c0000001:0x10e2a757d022384!8m2!3d14.5535468!4d-90.5648578!16s%2Fg%2F11c1p2rrrh?entry=ttu&g_ep=EgoyMDI0MDkyNC4wIKXMDSoASAFQAw%3D%3D" className="location-link" target="_blank">
          <span>Zona 12 Villa Nueva Mezquital Mercado "Santa Cruz" local 2</span>
        </a>
      </div>
    </div>

    <div className="footer-section">
      <h4>Síguenos</h4>
      <div className="social-links">
        <img src="/public/icons/facebook.png" alt="Facebook" width="24"/>
        <img src="/public/icons/instagram.png" alt="Instagram" width="24"/>
      </div>
    </div>
  </div>
</footer>


)

}