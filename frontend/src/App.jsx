//import { useState } from 'react'
//import './App.css'
import { Home } from './Home'
import { Route, Routes } from 'react-router-dom'

import { Login } from './Login'
import { Principal } from './Principal'
import { Registro } from './Registro'

import { Cuenta_Estado } from './componentesJSX/Cuenta_Estado/Cuenta_Estado' //listo
import { Cliente } from './componentesJSX/Cliente/Cliente' //listo
/* import { Formas_Pago } from './componentesJSX/Formas_Pago/Formas_Pago' //listo */
/* import { AddCuenta_Estado } from './componentesJSX/AddCuenta_Estado/AddCuenta_Estado' //listo */
/* import { AddFormas_Pago } from './componentesJSX/Formas_Pago/AddFormas_Pago' //listo */
/* import { EditCuenta_Estado } from './componentesJSX/Cuenta_Estado/EditCuenta_Estado' //listo */
import { EditCliente } from './componentesJSX/Cliente/EditCliente'//listo
import { AddCliente } from './componentesJSX/Cliente/AddCliente'//listo
/* import { Ubicaciones } from './componentesJSX/ubicacion/Ubicacion' */
import { Usuarios } from './componentesJSX/Usuarios/Usuario'// Listo
import { Producto } from './componentesJSX/Productos/Producto'//listo
/* import { Tipo_Productos } from './componentesJSX/Tipo_Productos/Tipo_Productos'//listo */

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/principal' element={<Principal/>}></Route>
        <Route path='/registro' element={<Registro/>}></Route>
        <Route path='/cliente' element={<Cliente/>}></Route>
        <Route path='/cuenta_estado' element={<Cuenta_Estado/>}></Route>
        {/* <Route path='/ubicaciones' element={<Ubicacion/>}></Route> */}
        <Route path='/usuarios' element={<Usuarios/>}></Route>
        {/* <Route path='/formas_pago' element={<Formas_Pago/>}></Route> */}
        <Route path='/productos' element={<Producto/>}></Route>
        {/* <Route path='/tipo_productos' element={<Tipo_Productos/>}></Route> */}
        {/* <Route path='/agregarcuenta_estado' element={<AddCuenta_Estado/>}></Route> */}
        <Route path='/agregarcliente' element={<AddCliente/>}></Route>
        {/* <Route path='/agregarformas_pago' element={<AddFormas_Pago/>}></Route> */}
        {/* <Route path='/editcuenta_estado/:id_cuenta_estado' element={<EditCuenta_Estado/>}></Route> */}
        <Route path='/editcliente/:id_cliente' element={<EditCliente/>}></Route>
      </Routes>
    </>
  )
}

export default App
