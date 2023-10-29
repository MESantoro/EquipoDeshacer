import React, { useState } from "react";
import logoDeshacer from './assets/LogoDH23.png';
import { Link } from "react-router-dom";
import './Login.css';
import * as API from './servicios/servicios';

export function Login(){
const [user, setUsername]= useState('')
const [pass, setPasword]= useState('')
const [mensaje, setMensaje]= useState('')

const ingresar = async(event)=>{
  event.preventDefault();
  const usuario = await API.Login({user, pass})
  console.log(usuario);

   if(usuario.status){
    window.localStorage.setItem('usuario',JSON.stringify(usuario.datos[0]) )
    window.localStorage.setItem('token', JSON.stringify(usuario.token))
    window.location.href='/principal';
   }else{    
    setMensaje(usuario.mensaje)
        setTimeout(()=>{
            setMensaje('')
        }, 3000)
   }
  return;
}
return (
  <div className="form-signin d-flex justify-content-center align-items-center h-100">
  <main className="form-signin custom-form">
    <form onSubmit={ingresar} className="form-container">
      <div className="text-center mb-4">
        <a>
          <img src={logoDeshacer} className="logo" alt="LogoDH23" />
        </a>
        <h1 className="h4 mb-3 fw-normal">LOGUEO DH23</h1>
      </div>
      {mensaje ? (
        <div className="alert alert-warning" role="alert">
          {mensaje}
        </div>
      ) : (
        <></>
      )}
      <div className="mb-3">
        <input
          required
          type="text"
          value={user}
          onChange={(event) => setUsername(event.target.value)}
          className="form-control"
          id="floatingInput"
          placeholder="Tu Usuario: TitoPuentes"
        />
        <label htmlFor="floatingInput">Usuario</label>
      </div>
      <div className="mb-3">
        <input
          required
          type="password"
          value={pass}
          onChange={(event) => setPasword(event.target.value)}
          className="form-control"
          id="floatingPassword"
          placeholder="Tu Clave: 12345"
        />
        <label htmlFor="floatingPassword">Clave</label>
      </div>

      <button type="submit" className="btn btn-outline-success btn-block">
        PA' DENTRO
      </button>
      <p className="mt-4 mb-3 text-center text-body-secondary letra-roja">
        ¡¡NO EXISTIS!! JAJAJA{" "}
        <Link to="/registro">ENCHUFALE DATA Y ANDA AL REGISTRO</Link>
      </p>
    </form>
  </main>
</div>

)
}