import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as API from '../../servicios/servicios'

export function AddProductos(){
const [nombre, setNombre] = useState('')
const [mensaje, setMensaje] = useState('')

const guardarProductos = async(event)=>{
    event.preventDefault();
    const respuesta = await API.AddProductos({nombre})
    if(respuesta.status){
        setMensaje(respuesta.mensaje)
        setTimeout(()=>{
            setMensaje('')
            window.location.href='/productos'
            }, 3000)
    }
    return;
  }
    return(
        <>
       <main className="form-signin w-100 m-auto">
              <form onSubmit={guardarProductos}>
                <div>
                    {mensaje}
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  placeholder="Producto"
                  />
                  <label for="floatingInput">Producto</label>
                </div>
               
               
                <button className="btn btn-primary" type="submit" >Guardar</button>
                <Link to="/productos" >Volver</Link>
                
              </form>
          </main>
        </>
    )
}