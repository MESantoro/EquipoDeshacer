import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'

import { Menu } from "../../Menu";
import { Vigia } from "../../Vigia";

export function Cuenta_Estado(){
    const [cuenta_estado, setCuenta_Estado]=useState([])
    const [id_cue, setIdCuenta_Estado]=useState('')
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
                    window.location.href='/cuenta_estado'
                    // API.getCuenta_Estado().then(setCuenta_Estado)
                    }, 2000)
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
                    window.location.href='/cuenta_estado'
                    // API.getCuenta_Estado().then(setCuenta_Estado)
                    }, 2000)
            }
            return;
        }
        
    }
    
    useEffect(()=>{
        API.getCuenta_Estado().then(setCuenta_Estado)
    }, [])

    const cambiar_estado = async (e, id_cue, estado_actual)=>{
        e.preventDefault();
        const actualizar = (estado_actual=="Pagado")?"Adeuda":"Pagado";
        console.log(actualizar)
        const respuesta= await API.ActualizarEstadoCuenta_Estado(id_cue, {actualizar});
        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
            API.getCuenta_Estado().then(setCuenta_Estado)
            setTimeout(()=>{
                setMensaje('')
                toastBootstrap.hide()
                
                // window.location.href='/cuenta_estado'
            }, 2000)
        }
        
    }

    const editar_registro = async (e, id_cue)=>{
        e.preventDefault();
        
        console.log('el id que vamos a editar es el ', id_cue)
        setIdCuenta_Estado(id_cue)
        const datos_cuenta_estado= await API.getCuenta_EstadoByID(id_cue);
        console.log(datos_cuenta_estado)
        setNombre(datos_cuenta_estado.nombre)
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
            {cuenta_estado.map((cuenta_estado)=>(
                <tr>
                <td >{cuenta_estado.nombre}</td>    
                <td >{cuenta_estado.estado}</td>
                <td >
                    
                    <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, cuenta_estado.id_cue)} class="btn btn-outline-warning btn-sm">Editar</button>
                    
                {(cuenta_estado.estado=="Pagado")?
                <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, cuenta_estado.id_cue, cuenta_estado.estado )} >Desactivar</button>
                :
                <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, cuenta_estado.id_cue, cuenta_estado.estado )} >Activar</button>
                
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