import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import { Link, useParams } from "react-router-dom";

export function EditCliente(){
    const [nombre_cliente, setNombre] = useState('')
    const [id_modelo, setModelo] = useState('')
    const [id_ubicacion, setUbicacion] = useState('')
    const [serial, setSerial] = useState('')
    const [id_tipo_cliente, setTipoCliente] = useState('')

    const [modelos, setModelos] = useState([])
    const [tiposclientes, setTiposClientes] = useState([])
    const [ubicaciones, setUbicaciones] = useState([])
    const [mensaje, setMensaje] = useState('')

    const {id_cli} = useParams()
   
    useEffect(()=>{
        traer_datos();
        API.getModelos().then(setModelos)
        API.getTiposClientes().then(setTiposClientes)
        API.getUbicaciones().then(setUbicaciones)
      },[])
      
    

      const traer_datos =  async ()=>{
         const datos_cliente= await API.getClienteByID(id_cli);
         console.log(datos_cliente)
         setNombre(datos_cliente.nombre)
         setModelo(datos_cliente.id_modelo)
         setUbicacion(datos_cliente.id_ubicacion)
         setSerial(datos_cliente.serial)
         setTipoCliente(datos_cliente.id_tipo_cliente)
      }

    const editarCliente = async(event)=>{
        event.preventDefault();
        const respuesta = await API.EditCliente({nombre_cliente, id_modelo, id_ubicacion, id_tipo_cliente, serial}, id_cli)
        
        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            setTimeout(()=>{
                setMensaje('')
                window.location.href='/cliente'
                }, 3000)
        }
        return;
    }
    return(
        <>
        <main className="form-signin w-100 m-auto">
              <form onSubmit={editarCliente}>
                <div>
                    {mensaje}
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={nombre_cliente}
                  onChange={(event)=>setNombre(event.target.value)}
                  className="form-control" 
                  placeholder="Nombre del cliente"
                  />
                  <label for="floatingInput">Nombre del Cliente</label>
                </div>
                <div className="form-floating">
                  <input 
                  type="text" 
                  value={serial}
                  onChange={(event)=>setSerial(event.target.value)}
                  className="form-control" 
                  placeholder="Serial"
                  />
                  <label for="floatingInput">Serial</label>
                </div>
                <div className="form-floating">
                  
                 <select onChange={(event)=>setModelo(event.target.value)} className="form-control">
                    {modelos.map((m)=>(
                      
                    <option selected={(m.id_modelo==id_modelo)?`selected`:``} value={m.id_modelo}>{m.nombre}-{m.fabricante}</option>
                    ))}
                 </select>
                 <label for="floatingInput">Modelo</label>
                </div>
                <div className="form-floating">
                  
                 <select onChange={(event)=>setTipoCliente(event.target.value)} className="form-control">
                    {tiposclientes.map((te)=>(
                      
                    <option selected={(te.id_tipo_cliente==id_tipo_cliente)?`selected`:``} value={te.id_tipo_cliente}>{te.nombre}</option>
                    ))}
                 </select>
                 <label for="floatingInput">Tipo de Cliente</label>
                </div>  
                <div className="form-floating">
                  
                 <select onChange={(event)=>setUbicacion(event.target.value)} className="form-control">
                    {ubicaciones.map((u)=>(
                      
                    <option selected={(u.id_ubicacion==id_ubicacion)?`selected`:``} value={u.id_ubicacion}>{u.nombre}</option>
                    ))}
                 </select>
                 <label for="floatingInput">Ubicacion</label>
                </div>  
               
                <button className="btn btn-primary" type="submit" >Guardar Edicion</button>
                <Link to="/cliente" >Volver</Link>
                
              </form>
          </main>
        </>
    )
}