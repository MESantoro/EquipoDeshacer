import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import './Tipo_Producto.css'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";
import { Vigia } from "../../Vigia";

export function Tipo_Producto(){
    const [tipo_producto, setTipo_Producto]=useState([])
    const [id_tip, setIdTipo_Producto]=useState('')
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')

    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')
    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger.addEventListener('click', () => {
          toastBootstrap.show()
        })
      }
    const guardarFabricante = async(event)=>{
        event.preventDefault();
        if(id_tip){
            const respuesta = await API.EditFabricante({nombre}, id_tip)
    
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/tipo_producto'
                    // API.getTipo_Producto().then(setTipo_Producto)
                    }, 2500)
            }
            return;
        }else{
            const respuesta = await API.AddFabricante({nombre})
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/tipo_producto'
                    // API.getTipo_Producto().then(setTipo_Producto)
                    }, 2500)
            }
            return;
        }
        
    }
    
    useEffect(()=>{
        API.getTipo_Producto().then(setTipo_Producto)
    }, [])

    const cambiar_estado = async (e, id_tip, estado_actual)=>{
        e.preventDefault();
        const actualizar = (estado_actual=="O")?"X":"O";
        console.log(actualizar)
        const respuesta= await API.ActualizarTipo_Producto(id_tip, {actualizar});
        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
            setTimeout(()=>{
                setMensaje('')
                toastBootstrap.hide()
                API.getTipo_Producto().then(setTipo_Producto)
                // window.location.href='/tipo_producto'
            }, 2500)
        }
        
    }

    const editar_registro = async (e, id_tip)=>{
        e.preventDefault();
        
        console.log('el id que vamos a editar es el ', id_tip)
        setIdTipo_Producto(id_tip)
        const datos_tipo_producto= await API.getTipo_ProductoByID(id_tip);
        console.log(datos_tipo_producto)
        setNombre(datos_tipo_producto.nombre)
    }

    

    return(
        <>
        
        <Menu/>
        <Vigia/>
        <table class="table table-striped">
        <thead>
            <tr>
                
                <th colspan="4">
                <Link class="btn btn-outline-primary btn-sm" to="/agregartipo_producto">Agregar</Link>
                <button  class="btn btn-outline-primary  btn-sm"  data-bs-toggle="modal"  data-bs-target="#exampleModal" >Agregar Modal</button>
                </th>    
            </tr>

            <tr>
                <td>Descripcion</td>
                <td>Estado</td>
                <td colspan="2">Acciones</td>
            </tr>
            </thead>
            <tbody>
            {tipo_producto.map((tipo_producto)=>(
                <tr>
                <td >{tipo_producto.nombre}</td>    
                <td >{tipo_producto.estado}</td>
                <td >
                    <Link to={`/edittipo_producto/${tipo_producto.id_tip}`} ><button class="btn btn-warning btn-sm">Editar Link</button></Link>
                    <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, tipo_producto.id_tip)} class="btn btn-outline-warning btn-sm">Editar modal</button>
                    
                {(tipo_producto.estado=="O")?
                <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, tipo_producto.id_tip, tipo_producto.estado )} >Desactivar</button>
                :
                <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, tipo_producto.id_tip, tipo_producto.estado )} >Activar</button>
                
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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Datos del modelo </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={guardarFabricante}>
                <div class="modal-body">
                
                    
                    <div className="form-floating">
                    <input 
                    type="text" 
                    value={nombre}
                    onChange={(event)=>setNombre(event.target.value)}
                    className="form-control" 
                    placeholder="Nombre del tipo_producto"
                    />
                    <label for="floatingInput">Nombre del tipo_producto</label>
                    </div>
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