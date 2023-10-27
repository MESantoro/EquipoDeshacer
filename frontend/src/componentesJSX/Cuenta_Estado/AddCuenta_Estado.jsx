import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'

export function AddCuenta_Estado(){
const [nombre, setNombre] = useState('')
const [mensaje, setMensaje] = useState('')

const guardarCuenta_Estado = async(event)=>{
    event.preventDefault();
    const respuesta = await API.AddCuenta_Estado({nombre})
    if(respuesta.status){
        setMensaje(respuesta.mensaje)
        setTimeout(()=>{
            setMensaje('')
            window.location.href='/cuenta_estado'
            }, 3000)
    }
    return;
  }
    return(
        <>
       <main className="form-signin w-100 m-auto">
              <form onSubmit={guardarCuenta_Estado}>
                <div>
                    {mensaje}
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  placeholder="Cuenta Estado"
                  />
                  <label for="floatingInput">Cuenta Estado</label>
                </div>
               
               
                <button className="btn btn-primary" type="submit" >Guardar</button>
                <Link to="/cuenta_estado" >Volver</Link>
                
              </form>
          </main>
        </>
    )
}