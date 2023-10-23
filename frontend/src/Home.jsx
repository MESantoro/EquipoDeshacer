import React, { useEffect } from "react";
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
    <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column bg-dark text-white text-center">
      <header className="mb-auto">
        <div>
          <h3 className="mb-0">PANTALLA PRINCIPAL</h3>
          
        </div>
      </header>

      <main className="px-3">
        <h1>EQUIPO DESHACER</h1>
        <p className="lead">¡¡¡Creando, Trabajando y Logrando... para luego Deshacer!!!</p>
        <p className="lead"> Ahi Vamos...</p>
      </main>

      <footer className="mt-auto">
        <p>Trabajo realizado por: ®Mieres - ®Baldi - ®Pomar - ®Santoro <a href="https://getbootstrap.com/" className="text-white"></a><a href="https://twitter.com/mdo" className="text-white"></a>.</p>
      </footer>
      <div>
        <nav className="nav nav-masthead justify-content-center">
            <Link to="/login" className="nav-link fw-bold py-1 px-0">LOGEO</Link>
        </nav>
      </div>
      <div>
        <nav className="nav nav-masthead justify-content-center">
            <Link to="/registro" className="nav-link fw-bold py-1 px-0">REGISTRATE</Link>
        </nav>
      </div>
    </div>
    
  );
}
