import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'

export function EditProducto(){
const [nombre, setNombre] = useState('')
const [mensaje, setMensaje] = useState('')

const {id_pro} = useParams()

useEffect(()=>{
  traer_datos();
},[])

const traer_datos =  async ()=>{
   const datos_producto= await API.getProductosByID(id_pro);
    setNombre(datos_producto.nombre)
}

const editarProducto = async(event)=>{
    event.preventDefault();
    const respuesta = await API.EditProducto({nombre}, id_pro)
    
    if(respuesta.status){
        setMensaje(respuesta.mensaje)
        setTimeout(()=>{
            setMensaje('')
            window.location.href='/producto'
            }, 5000)
    }
    return;
  }
    return(
        <>
       <main className="form-signin w-100 m-auto">
              <form onSubmit={editarProducto}>
                <div>
                    {mensaje}
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  placeholder="Nombre del producto"
                  />
                  <label for="floatingInput">Datos del Producto</label>
                </div>
               
               
                <button className="btn btn-primary" type="submit" >Guardar Edicion</button>
                <Link to="/producto" >Volver</Link>
                
              </form>
          </main>
        </>
    )
}