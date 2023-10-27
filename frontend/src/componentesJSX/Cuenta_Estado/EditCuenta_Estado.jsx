import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'

export function EditCuenta_Estado(){
const [nombre, setNombre] = useState('')
const [mensaje, setMensaje] = useState('')

const {id_cue} = useParams()

useEffect(()=>{
  traer_datos();
},[])

const traer_datos =  async ()=>{
   const datos_cuenta_estado= await API.getCuenta_EstadosByID(id_cue);
    setNombre(datos_cuenta_estado.nombre)
}

const editarCuenta_Estado = async(event)=>{
    event.preventDefault();
    const respuesta = await API.EditCuenta_Estado({nombre}, id_cue)
    
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
              <form onSubmit={editarCuenta_Estado}>
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
               
               
                <button className="btn btn-primary" type="submit" >Guardar Edicion</button>
                <Link to="/cuenta_estado" >Volver</Link>
                
              </form>
          </main>
        </>
    )
}