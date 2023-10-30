import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'

export function EditTipo_Producto(){
const [nombre, setNombre] = useState('')
const [mensaje, setMensaje] = useState('')

const {id_tip} = useParams()

useEffect(()=>{
  traer_datos();
},[])

const traer_datos =  async ()=>{
   const datos_tipo_producto= await API.getTipo_ProductoByID(id_tip);
    setNombre(datos_tipo_producto.nombre)
}

const editarTipo_Producto = async(event)=>{
    event.preventDefault();
    const respuesta = await API.EditTipo_Producto({nombre}, id_tip)
    
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
              <form onSubmit={editarTipo_Producto}>
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
                  <label for="floatingInput">Datos del Tipo_Producto</label>
                </div>
               
               
                <button className="btn btn-primary" type="submit" >Guardar Edicion</button>
                <Link to="/tipo_producto" >Volver</Link>
                
              </form>
          </main>
        </>
    )
}