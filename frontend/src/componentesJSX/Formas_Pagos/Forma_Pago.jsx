import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios'

import { Menu } from "../../Menu";
import { Vigia } from "../../Vigia";

export function Forma_Pago(){
    const [forma_pago, setForma_Pago]=useState([])
    const [id_pag, setIdForma_Pago]=useState('')
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
    const guardarForma_Pago = async(event)=>{
        event.preventDefault();
        if(id_pag){
            const respuesta = await API.EditForma_Pago({nombre}, id_pag)
    
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/forma_pago'
                    // API.getForma_Pago().then(setForma_Pago)
                    }, 2000)
            }
            return;
        }else{
            const respuesta = await API.AddForma_Pago({nombre})
            if(respuesta.status){
                setMensaje(respuesta.mensaje)
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastBootstrap.show()
                setTimeout(()=>{
                    setMensaje('')
                    window.location.href='/forma_pago'
                    // API.getForma_Pago().then(setForma_Pago)
                    }, 2000)
            }
            return;
        }
        
    }
    
    useEffect(()=>{
        API.getForma_Pago().then(setForma_Pago)
    }, [])

    const cambiar_estado = async (e, id_pag, estado_actual)=>{
        e.preventDefault();
        const actualizar = (estado_actual=="O")?"X":"O";
        console.log(actualizar)
        const respuesta= await API.ActualizarEstadoForma_Pago(id_pag, {actualizar});
        if(respuesta.status){
            setMensaje(respuesta.mensaje)
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()
            API.getForma_Pago().then(setForma_Pago)
            setTimeout(()=>{
                setMensaje('')
                toastBootstrap.hide()
                
                // window.location.href='/forma_pago'
            }, 2000)
        }
        
    }

    const editar_registro = async (e, id_pag)=>{
        e.preventDefault();
        
        console.log('el id que vamos a editar es el ', id_pag)
        setIdForma_Pago(id_pag)
        const datos_forma_pago= await API.getForma_PagoByID(id_pag);
        console.log(datos_forma_pago)
        setNombre(datos_forma_pago.nombre)
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
                <td>Descripcion de Forma_Pago</td>
                <td>Estado</td>
                <td colspan="2">Acciones</td>
            </tr>
            </thead>
            <tbody>
            {forma_pago.map((forma_pago)=>(
                <tr>
                <td >{forma_pago.nombre}</td>    
                <td >{forma_pago.estado}</td>
                <td >
                    
                    <button   data-bs-toggle="modal"  data-bs-target="#exampleModal" onClick={(event)=>editar_registro(event, forma_pago.id_pag)} class="btn btn-outline-warning btn-sm">Editar</button>
                    
                {(forma_pago.estado=="O")?
                <button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, forma_pago.id_pag, forma_pago.estado )} >Desactivar</button>
                :
                <button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, forma_pago.id_pag, forma_pago.estado )} >Activar</button>
                
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
                <form onSubmit={guardarForma_Pago}>
                <div class="modal-body">
                
                    
                    <div className="form-floating">
                    <input required
                    type="text" 
                    value={nombre}
                    onChange={(event)=>setNombre(event.target.value)}
                    className="form-control" 
                    placeholder="Nombre del forma_pago"
                    />
                    <label for="floatingInput">Nombre del forma_pago</label>
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