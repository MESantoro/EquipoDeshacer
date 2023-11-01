import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'

import { Menu } from "../../Menu";
import { Vigia } from "../../Vigia";

export function Productos(){
    const [productos, setProductos]=useState([])
    const [id_pro, setIdProductos]=useState('')
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    //const [numero, setNumero] = useState('')

    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')
    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger.addEventListener('click', () => {
          toastBootstrap.show()
        })
      }
    const guardarProductos = async(event)=>{
        event.preventDefault();
        if(id_pro){
            const respuesta = await API.EditProductos({nombre}, id_pro)
    
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/productos'
                    // API.getProductos().then(setProductos)
                    }, 2000)
            }
            return;
        }else{
            const respuesta = await API.AddProductos({nombre})
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/productos'
                    // API.getProductos().then(setProductos)
                    }, 2000)
            }
            return;
        }
        
    }
    
    useEffect(()=>{
        API.getProductos().then(setProductos)
    }, [])

    const cambiar_estado = async (e, id_pro, estado_actual)=>{
        e.preventDefault();
        const actualizar = (estado_actual=="O")?"X":"O";
        console.log(actualizar)
        const respuesta= await API.ActualizarEstadoProductos(id_pro, {actualizar});
        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
            API.getProductos().then(setProductos)
            setTimeout(()=>{
                setMensaje('')
                toastBootstrap.hide()
                
                // window.location.href='/productos'
            }, 2000)
        }
        
    }

    const editar_registro = async (e, id_pro)=>{
        e.preventDefault();
        
        console.log('el id que vamos a editar es el ', id_pro)
        setIdProductos(id_pro)
        const datos_productos= await API.getProductosByID(id_pro);
        console.log(datos_productos)
        setNombre(datos_productos.nombre)
    }

    return(
        <>
        <Menu/>
        <Vigia/>
        <table class="table table-striped">
        <thead>
            <tr>
                <th colspan="4">
                <button  class="btn btn-outline-primary  btn-sm"  data-bs-toggle="modal"  data-bs-target="#exampleModal" >Agregar</button>
                </th>    
            </tr>

            <tr>
                <td>Descripcion Estado Cuenta </td>
                <td>Estado</td>
                <td colspan="2">Acciones</td>
            </tr>
            </thead>
            <tbody>
            {productos.map((productos)=>(
                <tr>
                <td >{productos.nombre}</td>    
                <td >{productos.estado}</td>
                <td >
                    
                    <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, productos.id_pro)} class="btn btn-outline-warning btn-sm">Editar</button>
                    
                {(productos.estado=="O")?
                <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, productos.id_pro, productos.estado )} >Desactivar</button>
                :
                <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, productos.id_pro, productos.estado )} >Activar</button>
                
                }
                </td>
                </tr>
            ))}
            </tbody>
            
           
        </table>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Datos </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={guardarProductos}>
                <div class="modal-body">
                
                    
                    <div className="form-floating">
                    <input required
                    type="text" 
                    value={nombre}
                    onChange={(event)=>setNombre(event.target.value)}
                    className="form-control" 
                    placeholder="Nombre del Estado de Cuenta"
                    />
                    <label for="floatingInput">Nombre Estado de Cuenta</label>
                    </div>
                    {/* <div className="form-floating">
                    <input required
                    type="number" 
                    value={numero}
                    onChange={(event) => {
                        setNumero((event.target.value < 0)?event.target.value * -1:event.target.value);
                      }}
                    className="form-control" 
                    placeholder="Numero"
                    />
                    <label for="floatingInput">Numero</label>
                    </div> */}
                </div>
                
                <div class="modal-footer">
                <button className="btn btn-primary" type="submit" >Guardar</button>
                    
                </div>
                </form>
                </div>
            </div>
        </div>

        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                
                <strong class="me-auto">Mensaje</strong>
             
                </div>
                <div class="toast-body">
                {mensaje}
                </div>
            </div>
        </div>
        </>
    )
}