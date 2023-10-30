//import { useState } from 'react'
//import './App.css'
import { Home } from './Home'
import { Route, Routes } from 'react-router-dom'

import { Login } from './Login'
import { Principal } from './Principal'
import { Registro } from './Registro'

import { Cuenta_Estado } from './componentesJSX/Cuenta_Estado/Cuenta_Estado' //listo
import { Cliente } from './componentesJSX/Cliente/Cliente' //listo
import { Forma_Pago } from './componentesJSX/Formas_Pagos/Forma_Pago' //listo
import { AddCuenta_Estado } from './componentesJSX/Cuenta_Estado/AddCuenta_Estado' //listo
/* import { AddForma_Pago } from './componentesJSX/Formas_Pagos/AddForma_Pago' //listo  */
import { EditCuenta_Estado } from './componentesJSX/Cuenta_Estado/EditCuenta_Estado' //listo
import { EditCliente } from './componentesJSX/Cliente/EditCliente'//listo
import { AddCliente } from './componentesJSX/Cliente/AddCliente'//listo
import { Ubicaciones } from './componentesJSX/Ubicaciones/Ubicacion'
import { Usuarios } from './componentesJSX/Usuarios/Usuario'// Listo
import { Productos } from './componentesJSX/Productos/Productos'//listo
import { EditProductos } from './componentesJSX/Productos/EditProductos'//listo
import { Tipo_Producto } from './componentesJSX/Tipo_Productos/Tipo_Producto'//listo

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
        <Route path='/ubicaciones' element={<Ubicaciones/>}></Route>
        <Route path='/usuarios' element={<Usuarios/>}></Route>
        <Route path='/forma_pago' element={<Forma_Pago/>}></Route>
        <Route path='/productos' element={<Productos/>}></Route>
        <Route path='/editproductos' element={<EditProductos/>}></Route>
        <Route path='/tipo_producto' element={<Tipo_Producto/>}></Route>
        <Route path='/agregarcuenta_estado' element={<AddCuenta_Estado/>}></Route>
        <Route path='/agregarcliente' element={<AddCliente/>}></Route>
        {/* <Route path='/agregarforma_pago' element={<AddFormas_Pagos/>}></Route> */}
        <Route path='/editcuenta_estado/:id_cue' element={<EditCuenta_Estado/>}></Route>
        <Route path='/editcliente/:id_cli' element={<EditCliente/>}></Route>
      </Routes>
    </>
  )
}

export default App
