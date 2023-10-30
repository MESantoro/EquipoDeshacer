import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'
import './Productos.css'
import { Link } from "react-router-dom";
import { Menu } from "../../Menu";
import { Vigia } from "../../Vigia";

export function Productos(){
    const [producto, setProductos]=useState([])
    const [id_pro, setIdProductos]=useState('')
    const [nombre, setNombre]=useState('')
    const [mensaje, setMensaje] = useState('')
    const [permisoDenegado, setPermisoDenegado] = useState(false)
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')
    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastTrigger.addEventListener('click', () => {
          toastBootstrap.show()
        })
      }
    useEffect(()=>{
        const datos_usuario = JSON.parse(localStorage.getItem('usuario'));
        ver_permisos(datos_usuario.id_rol);
        API.getProductos().then(setProductos)
    }, [])


    const editar_registro = async (e, id_pro)=>{
        e.preventDefault();
        setIdProductos(id_pro)
        const datos_p= await API.getProductosByID(id_pro);
        setNombre(datos_p.nombre)
    }

     const limpiarModal = async ()=>{
       
        setNombre('')
        setIdProductos('')
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
                    toastBootstrap.hide()
                    API.getProductos().then(setProductos)
                    }, 2500)
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
                    toastBootstrap.hide()
                    API.getProductos().then(setProductos)
                    }, 2500)
            }
            return;
        }
        
    }
    const cambiar_estado = async (e, id_pro, estado_actual)=>{
        e.preventDefault();
        const actualizar = (estado_actual=="O")?"X":"O";
        const respuesta= await API.ActualizarEstadoProductos(id_pro, {actualizar});
        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
            API.getProductos().then(setProductos)
            setTimeout(()=>{
                setMensaje('')
                toastBootstrap.hide()
            }, 2500)
        }
    }
    const ver_permisos =  async (id_rol)=>{
        const menu='/productos';
        const respuesta= await API.ver_permisos({id_rol, menu });
        if(respuesta.status){
            setPermisoDenegado(true)
        }else{
            setPermisoDenegado(false)
        }
    }
    return(
        <>
        <Menu/>
        <Vigia/>
        {
        !permisoDenegado? 
            <div className="alert alert-warning" role="alert">
            No tiene permiso para acceder a esta opcion
            </div>
            :<>
        <table class="table table-striped">
        <thead>
            <tr>
                
                <th colspan="4">
                <button  onClick={(event)=>limpiarModal('')}  class="btn btn-outline-primary  btn-sm"  data-bs-toggle="modal"  data-bs-target="#exampleModal" >Agregar</button>
                </th>    
            </tr>

            <tr>
                <td>Descripcion</td>
                <td>Estado</td>
                <td colspan="2">Acciones</td>
            </tr>
            </thead>
            <tbody>
            {producto.map((p)=>(
                <tr>
                <td >{p.nombre}</td>    
                <td >{p.estado}</td>
                <td >
                {(p.estado=="O")?
                    <button data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, p.id_pro)} class="btn btn-outline-warning btn-sm">Editar</button>
                : 
                    <button disabled class="btn btn-warning btn-sm">Editar</button>
                }  
                {(p.estado=="O")?
                <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, p.id_pro, p.estado )} >Desactivar</button>
                :
                <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, p.id_pro, p.estado )} >Activar</button>
                
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
                    placeholder="Nombre de Producto"
                    />
                    <label for="floatingInput">Nombre de Producto</label>
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
        }
        
        </>
    )
    
}