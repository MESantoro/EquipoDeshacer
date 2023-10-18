//import { useState } from 'react'
//import './App.css'
import { Home } from './Home'
import { Route, Routes } from 'react-router-dom'

import { Login } from './Login'
import { Principal } from './Principal'
import { Registro } from './Registro'

/*import { Cuenta_Estado } from './componentesJSX/cuenta_estado/Cuenta_Estado' //listo
import { Cliente } from './componentesJSX/cliente/Cliente' //listo
import { Formas_Pago } from './componentesJSX/formas_pago/Formas_Pago' //listo
import { AddCuenta_Estado } from './componentesJSX/cuenta_estado/AddCuenta_Estado' //listo
import { AddFormas_Pago } from './componentesJSX/formas_pago/AddFormas_Pago' //listo
import { EditCuenta_Estado } from './componentesJSX/cuenta_estado/EditCuenta_Estado' //listo
import { EditCliente } from './componentesJSX/cliente/EditCliente'//listo
import { AddCliente } from './componentesJSX/cliente/AddCliente'//listo
import { Ubicaciones } from './componentesJSX/ubicaciones/Ubicaciones'
import { Usuarios } from './componentesJSX/usuarios/Usuarios'
import { Producto } from './componentesJSX/producto/producto'//listo
import { Tipo_Producto } from './componentesJSX/tipo_producto/tipo_producto'//listo */

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/principal' element={<Principal/>}></Route>
        <Route path='/registro' element={<Registro/>}></Route>
        {/* <Route path='/cliente' element={<Cliente/>}></Route>
        <Route path='/cuenta_estado' element={<Cuenta_Estado/>}></Route>
        <Route path='/ubicaciones' element={<Ubicaciones/>}></Route>
        <Route path='/usuarios' element={<Usuarios/>}></Route>
        <Route path='/formas_pago' element={<Formas_Pago/>}></Route>
        <Route path='/producto' element={<Producto/>}></Route>
        <Route path='/tipo_producto' element={<Tipo_Producto/>}></Route>
        <Route path='/agregarcuenta_estado' element={<AddCuenta_Estado/>}></Route>
        <Route path='/agregarcliente' element={<AddCliente/>}></Route>
        <Route path='/agregarformas_pago' element={<AddFormas_Pago/>}></Route>
        <Route path='/editcuenta_estado/:id_cuenta_estado' element={<EditCuenta_Estado/>}></Route>
        <Route path='/editcliente/:id_cliente' element={<EditCliente/>}></Route> */}
      </Routes>
    </>
  )
}

export default App
