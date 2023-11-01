import React, { useEffect, useState } from "react";
import './Cliente.css'
import * as API from '../../servicios/servicios'
import { Menu } from "../../Menu";
import { Link } from "react-router-dom";

 export function Cliente(){
    const [cliente, setCliente] = useState([])
    const [mensaje , setMensaje] = useState([])

    useEffect(()=>{
        API.getCliente().then(setCliente)}, []
    )

// Funcion para cambio de estados 
const cambiar_estado = async (cc, id_cli, estado_actual)=>{
    cc.preventDefault();
    const actualizar = (estado_actual=="O")?"X":"O";
    const respuesta= await API.ActualizarEstadoCliente(id_cli, {actualizar});
    if(respuesta.status){
        setMensaje(respuesta.mensaje)
        setTimeout(()=>{
            setMensaje('')
            window.location.href='/cliente'
        }, 3000)
    }
    
}

    return(
        <>
        <div>
            {mensaje}
        </div>
        <Menu/>
        <table class="table table-striped-columns">
             <thead>
             <tr>
                <td  colspan="7" ><Link  class="btn btn-outline-success"  to="/agregarcliente">Agregar</Link></td>    
            </tr>
                <tr>
                    <th >Nombre</th>
                    <th >Apellido</th>
                    <th >Direccion</th>
                    <th >Correo</th>
                    <th >Estado</th>
                    <th >Cuenta</th>
                    <th  colspan="2">Acciones</th>
                </tr>
             </thead>
             <tbody>
            {cliente.map((cc)=>(
                <tr>
                <td >{cc.nombre}</td>
                <td >{cc.apellido}</td>
                <td >{cc.direccion}</td>
                <td >{cc.correo}</td>
                <td >{cc.cli_estado}</td>
                <td >{cc.cue_estado}</td>
                <td >
                    <Link to={`/editcliente/${cc.id_cli}`} ><button class="btn btn-warning btn-sm">Editar</button></Link>
                </td>
                {(cc.cli_estado=="O")?
                <td><button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, cc.id_cli, cc.cli_estado )}>Desactivar</button></td>
                :
                <td><button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, cc.id_cli, cc.cli_estado )} >Activar</button></td>
                }
                
                </tr>
            ))}
           </tbody>
        </table>
        </>
    )
 }