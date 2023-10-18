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
        <p className="lead">¡¡¡Creando, Trabajando y Logrando... para Deshacer!!!</p>
        <p className="lead">
          <a href="#" className="btn btn-lg btn-light fw-bold border-white bg-white">Ahi Vamos...</a>
        </p>
        <Div>
        <nav className="nav nav-masthead justify-content-center">
            <Link to="/" className="nav-link fw-bold py-1 px-0 active">INICIO</Link>
            <Link to="/login" className="nav-link fw-bold py-1 px-0">LOGEO</Link>
            <Link to="/registro" className="nav-link fw-bold py-1 px-0">REGISTRATE</Link>
        </nav>
        </Div>
      </main>

      <footer className="mt-auto">
        <p>Trabajo realizado por Mieres, Baldi, Pomar y Santoro <a href="https://getbootstrap.com/" className="text-white"></a><a href="https://twitter.com/mdo" className="text-white"></a>.</p>
      </footer>
    </div>
  );
}
