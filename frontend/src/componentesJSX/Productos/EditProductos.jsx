import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as API from '../../servicios/servicios'

export function EditProductos(){
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

const editarProductos = async(event)=>{
    event.preventDefault();
    const respuesta = await API.EditProductos({nombre}, id_pro)
    
    if(respuesta.status){
        setMensaje(respuesta.mensaje)
        setTimeout(()=>{
            setMensaje('')
            window.location.href='/productos'
            }, 5000)
    }
    return;
  }
    return(
        <>
       <main className="form-signin w-100 m-auto">
              <form onSubmit={editarproductos}>
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
                  <label for="floatingInput">Datos del producto</label>
                </div>
               
               
                <button className="btn btn-primary" type="submit" >Guardar Edicion</button>
                <Link to="/productos" >Volver</Link>
                
              </form>
          </main>
        </>
    )
}