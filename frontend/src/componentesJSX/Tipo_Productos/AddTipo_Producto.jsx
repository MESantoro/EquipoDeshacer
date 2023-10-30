import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'

export function AddTipo_Producto(){
const [nombre, setNombre] = useState('')
const [mensaje, setMensaje] = useState('')

const guardarTipo_Producto = async(event)=>{
    event.preventDefault();
    const respuesta = await API.AddTipo_Producto({nombre})
    if(respuesta.status){
        setMensaje(respuesta.mensaje)
        setTimeout(()=>{
            setMensaje('')
            window.location.href='/tipo_producto'
            }, 5000)
    }
    return;
  }
    return(
        <>
       <main className="form-signin w-100 m-auto">
              <form onSubmit={guardarTipo_Producto}>
                <div>
                    {mensaje}
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  placeholder="Nombre del tipo_producto"
                  />
                  <label for="floatingInput">Nombre del Tipo_Producto</label>
                </div>
               
               
                <button className="btn btn-primary" type="submit" >Guardar</button>
                <Link to="/tipo_producto" >Volver</Link>
                
              </form>
          </main>
        </>
    )
}