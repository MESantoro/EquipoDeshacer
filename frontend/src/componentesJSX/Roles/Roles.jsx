import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'

import { Menu } from "../../Menu";
import { Vigia } from "../../Vigia";

export function Roles(){
    const [roles, setRoles]=useState([])
    const [id_rol, setIdRoles]=useState('')
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
    const guardarRoles = async(event)=>{
        event.preventDefault();
        if(id_rol){
            const respuesta = await API.EditRoles({nombre}, id_rol)
    
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/roles'
                    // API.getRoles().then(setRoles)
                    }, 2000)
            }
            return;
        }else{
            const respuesta = await API.AddRoles({nombre})
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/roles'
                    // API.getRoles().then(setRoles)
                    }, 2000)
            }
            return;
        }
        
    }
    
    useEffect(()=>{
        API.getRoles().then(setRoles)
    }, [])

    const cambiar_estado = async (e, id_rol, estado_actual)=>{
        e.preventDefault();
        const actualizar = (estado_actual=="O")?"X":"O";
        console.log(actualizar)
        const respuesta= await API.ActualizarEstadoRoles(id_rol, {actualizar});
        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
            API.getRoles().then(setRoles)
            setTimeout(()=>{
                setMensaje('')
                toastBootstrap.hide()
                
                // window.location.href='/roles'
            }, 2000)
        }
        
    }

    const editar_registro = async (e, id_rol)=>{
        e.preventDefault();
        
        console.log('el id que vamos a editar es el ', id_rol)
        setIdRoles(id_rol)
        const datos_roles= await API.getRolesByID(id_rol);
        console.log(datos_roles)
        setNombre(datos_roles.nombre)
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
                <td>Descripcion de Rol</td>
                <td>Estado</td>
                <td colspan="2">Acciones</td>
            </tr>
            </thead>
            <tbody>
            {roles.map((roles)=>(
                <tr>
                <td >{roles.nombre}</td>    
                <td >{roles.estado}</td>
                <td >
                    
                    <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, roles.id_rol)} class="btn btn-outline-warning btn-sm">Editar</button>
                    
                {(roles.estado=="O")?
                <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, roles.id_rol, roles.estado )} >Desactivar</button>
                :
                <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, roles.id_rol, roles.estado )} >Activar</button>
                
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
                <form onSubmit={guardarRoles}>
                <div class="modal-body">
                
                    
                    <div className="form-floating">
                    <input required
                    type="text" 
                    value={nombre}
                    onChange={(event)=>setNombre(event.target.value)}
                    className="form-control" 
                    placeholder="Nombre del roles"
                    />
                    <label for="floatingInput">Nombre del roles</label>
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