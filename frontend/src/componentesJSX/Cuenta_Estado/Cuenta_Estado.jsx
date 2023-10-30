import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'

import { Menu } from "../../Menu";

export function Cuenta_Estado(){
    const [cuenta_estado, setCuenta_Estado]=useState([])
    const [id_cue, setIdCuenta_Estado]=useState('')
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
        API.getCuenta_Estado().then(setCuenta_Estado)
    }, [])


    const editar_registro = async (e, id_cue)=>{
        e.preventDefault();
        setIdCuenta_Estado(id_cue)
        const datos_te= await API.getCuenta_EstadoByID(id_cue);
        setNombre(datos_te.nombre)
    }

     const limpiarModal = async ()=>{
       
        setNombre('')
        setIdCuenta_Estado('')
    }

    const guardarCuenta_Estado = async(event)=>{
        event.preventDefault();
        if(id_cue){
            const respuesta = await API.EditCuenta_Estado({nombre}, id_cue)
    
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    toastBootstrap.hide()
                    API.getCuenta_Estado().then(setCuenta_Estado)
                    }, 2500)
            }
            return;
        }else{
            const respuesta = await API.AddCuenta_Estado({nombre})
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    toastBootstrap.hide()
                    API.getCuenta_Estado().then(setCuenta_Estado)
                    }, 2500)
            }
            return;
        }
        
    }
    const cambiar_estado = async (e, id_cue, estado_actual)=>{
        e.preventDefault();
        const actualizar = (estado_actual=="Pagado")?"Adeuda":"Pagado";
        const respuesta= await API.ActualizarEstadoCuenta_Estado(id_cue, {actualizar});
        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
            API.getCuenta_Estado().then(setCuenta_Estado)
            setTimeout(()=>{
                setMensaje('')
                toastBootstrap.hide()
            }, 2500)
        }
    }
    const ver_permisos =  async (id_rol)=>{
        const menu='/cuenta_estado';
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
        {
        !permisoDenegado? 
            <div className="alert alert-warning" role="alert">
            No tiene  permiso para acceder a esta opcion
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
            {cuenta_estado.map((te)=>(
                <tr>
                <td >{te.nombre}</td>    
                <td >{te.cue_estado}</td>
                <td >
                {(te.cue_estado=="Pagado")?
                    <button data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, te.id_cue)} class="btn btn-outline-warning btn-sm">Editar</button>
                : 
                    <button disabled class="btn btn-warning btn-sm">Editar</button>
                }  
                {(te.cue_estado=="Pagado")?
                <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, te.id_cue, te.cue_estado )} >Desactivar</button>
                :
                <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, te.id_cue, te.cue_estado )} >Activar</button>
                
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
                <form onSubmit={guardarCuenta_Estado}>
                <div class="modal-body">
                
                    
                    <div className="form-floating">
                    <input required
                    type="text" 
                    value={nombre}
                    onChange={(event)=>setNombre(event.target.value)}
                    className="form-control" 
                    placeholder="Cuenta"
                    />
                    <label for="floatingInput">Cuenta Estado</label>
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