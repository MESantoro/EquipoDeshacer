import React, { useEffect, useState } from "react";
import './Cliente.css'
import * as API from '../../servicios/servicios'
import { Menu } from "../../menu";
import { Link } from "react-router-dom";

 export function Cliente(){
    const [cliente, setCliente] = useState([])
    const [mensaje , setMensaje] = useState([])

    useEffect(()=>{
        API.getCliente().then(setCliente)}, []
    )

// creamos la funcion para cambiar los estados 
const cambiar_estado = async (e, id_equipo, estado_actual)=>{
    e.preventDefault();
    const actualizar = (estado_actual=="O")?"X":"O";
    const respuesta= await API.ActualizarEstadoEquipo(id_equipo, {actualizar});
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
                <td  colspan="7" ><Link  class="btn btn-outline-success"  to="/agregarequipo">Agregar</Link></td>    
            </tr>
                <tr>
                    <th >Descripcion</th>
                    <th >Modelo</th>
                    <th >Tipo</th>
                    <th >Lugar</th>
                    <th >Estado</th>
                    <th  colspan="2">Acciones</th>
                </tr>
             </thead>
             <tbody>
            {cliente.map((ee)=>(
                <tr>
                <td >{ee.nombre}</td>
                <td >{ee.modelo_fabricante}</td>
                <td >{ee.tipo_equipo}</td>
                <td >{ee.lugar_ubicacion}</td>
                <td >{ee.estado}</td>
                <td >
                    <Link to={`/editequipo/${ee.id_equipo}`} ><button class="btn btn-warning btn-sm">Editar</button></Link>
                </td>
                {(ee.estado=="A")?
                <td><button class="btn btn-danger btn-sm" onClick={(event)=>cambiar_estado(event, ee.id_equipo, ee.estado )}>Desactivar</button></td>
                :
                <td><button class="btn btn-success btn-sm" onClick={(event)=>cambiar_estado(event, ee.id_equipo, ee.estado )} >Activar</button></td>
                }
                
                </tr>
            ))}
           </tbody>
        </table>
        </>
    )
 }