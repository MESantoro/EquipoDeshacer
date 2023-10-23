import React, { useState } from "react";
import logoDeshacer from './assets/LogoDH23.png';
import { Link } from "react-router-dom";
import * as API from './servicios/servicios'


export function Registro(){
    
    const [apellido, setApellido]= useState('')
    const [nombre, setNombre]= useState('')
    const [dni, setDni]= useState('')
    const [user, setUser]= useState('')
    const [pass, setPass]= useState('')
    const [nick, setNick]= useState('')
    const [pass2, setPassDos]= useState('')
    const [mensajeAlerta, setMensajeAlerta]= useState('')
    const [mensajeAlertaNick, setMensajeAlertaNick]= useState('')
    const [correo, setCorreo]= useState('')
    const [id_rol, setIdRol]= useState('1')



    const registro = async(event)=>{
      event.preventDefault();
      if(pass == pass2){
        const registro = await API.Registro({apellido, nombre, dni, user, pass, correo, id_rol})
        if(registro.status){
           alert(registro.mensaje)
           window.location.href='/login'
        }else{
          alert(registro.mensaje)
         
        }
       return;
      }else{
        setMensajeAlerta('Hey!! Las contraseñas deben ser iguales')
        setTimeout(()=>{
          setMensajeAlerta('')
          setPassDos('')
            
            }, 2000)
      }
    }

    const validarNick = async(event)=>{
          // event.preventDefault();
          
          const validacion = await API.ValidarNick({user})
          console.log(validacion)
            if(validacion.status){
              setMensajeAlertaNick(validacion.mensaje)
              setNick('')
              setTimeout(()=>{
                setMensajeAlertaNick('')
                  setUser('')
                  // setNick('')
                  }, 5000)
              // un icono rojo
            }else{
              // un icono lojo
              setNick('ok')
            }
         
    }

    return (
      <>
        <main className="form-signin d-flex justify-content-center align-items-center h-100">
          <form onSubmit={registro} className="form-container">
            <a>
              <img src={logoDeshacer} className="logo" alt="LogoDH23" />
            </a>
            <h1 className="h3 mb-3 fw-normal">METELE DATOS CHIMI</h1>
    
            <div className="form-floating mb-3">
              <input
                type="text"
                value={apellido}
                onChange={(event) => setApellido(event.target.value)}
                className="form-control"
                id="apellido"
              />
              <label htmlFor="apellido">Apellido</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                className="form-control"
                id="nombre"
              />
              <label htmlFor="nombre">Nombre</label>
            </div>
    
            <div className="form-floating mb-3">
              <input
                type="number"
                value={dni}
                onChange={(event) => setDni(event.target.value)}
                className="form-control"
                id="dni"
              />
              <label htmlFor="dni">Dni</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                value={correo}
                onChange={(event) => setCorreo(event.target.value)}
                className="form-control"
                id="correo"
              />
              <label htmlFor="correo">Correo</label>
            </div>
    
            <div className="form-floating mb-3">
              <input
                required
                type="text"
                value={user}
                onChange={(event) => setUser(event.target.value)}
                onBlur={(event) => validarNick(event.target.value)}
                className="form-control"
                id="user"
              />
              {nick ? (
                <i className="bi bi-check-circle"></i>
              ) : (
                <></>
              )}
              <label htmlFor="usuario">Usuario</label>
            </div>
            {mensajeAlertaNick ? (
              <div className="alert alert-danger" role="alert">
                {mensajeAlertaNick}
              </div>
            ) : (
              <></>
            )}
            <div className="form-floating mb-3">
              <input
                required
                type="password"
                value={pass}
                onChange={(event) => setPass(event.target.value)}
                className="form-control"
                id="pass"
              />
              <label htmlFor="password">Clave ♫</label>
            </div>
            {mensajeAlerta ? (
              <div className="alert alert-danger" role="alert">
                {mensajeAlerta}
              </div>
            ) : (
              <></>
            )}
            <div className="form-floating mb-3">
              <input
                required
                type="password"
                value={pass2}
                onChange={(event) => setPassDos(event.target.value)}
                className="form-control"
                id="pass2"
              />
              <label htmlFor="password">Igualita a la Clave anterior ♫</label>
            </div>
            <button type="submit" className="btn btn-outline-success">
              PA' DENTRO ESOS DATOS
            </button>
            <p className="mt-4 mb-3 text-body-secondary letra_roja">
              SI TENES CUENTA ANDA PA' SHA BO...{" "}
              <Link to="/login">ARRANQUEMOS Y LOGEATE</Link>
            </p>
          </form>
        </main>
      </>
    )
 }    