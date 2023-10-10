import React, { useEffect } from "react";logo
import logoDeshacer from './assets/Deshacer.png';
import { Link } from "react-router-dom";

export function Home() {
  useEffect(() => {
    const datos_usuario = JSON.parse(localStorage.getItem('usuario'));

    if (datos_usuario) {
      window.location.href = '/principal';
      return;
    }
  }, []);

  return (
    <>
      <div>
         <img src={logoDeshacer} className="logo" alt="Deshacer" style={{ width: 'auto', height: '250px' }} />
      </div>
      <div>
        <ul>
          <li><Link to="/">CENTRAL</Link></li>
          <li><Link to="/login">LOGEO</Link></li>
          <li><Link to="/registro">CARGA DE USURIO</Link></li>
        </ul>
      </div>
    </>
  )
}