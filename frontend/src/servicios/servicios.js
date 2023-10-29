const URL ='http://localhost:3000';

//FUNCION DE LOGEO
export async function Login(datos){
    
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/login`, Options);
    const data= await respuesta.json();
    return data
}

//FUNCION VALIDACION DE NICK
export async function ValidarNick(dato){
    
    const Options={
        method:'POST',
        body: JSON.stringify(dato),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/validarnick`, Options);
    const data= await respuesta.json();
    console.log('respuesta', data)
    return data
}

//FUNCION DE REGISTRO
export async function Registro(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/registro`, Options)
    const data= await respuesta.json()
    return data
}

//FUNCION USUARIO X ID
export async function getUsuariosByID(id_usuario){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/usuarios/${id_usuario}`, Options)
    const data= await respuesta.json();
    return data[0];
}

//FUNCION MENU X ROL Y TOKEN
export async function getMenuByRol(id_rol){
    const token = JSON.parse(localStorage.getItem('token'));
   const Options={
       method:'GET',
       headers: {
           'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
       }
   }
   const respuesta = await fetch(`${URL}/menu/${id_rol}`, Options)
   const data= await respuesta.json();
   return data;
}

//FUNCION PERMISOS X DATOS Y TOKEN
export async function ver_permisos(datos){    
    const token = JSON.parse(localStorage.getItem('token'));
   const Options={
       method:'POST',
       body: JSON.stringify(datos),
       headers: {
           'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
       }
   }
   const respuesta = await fetch(`${URL}/menu_permisos`, Options)
   const data= await respuesta.json();
   console.log('respuesta de permisos', data)
   return data;
}

// CUENTA ESTADO
export async function getCuenta_Estado(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/cuenta_estado`, Options)
    const data= await respuesta.json()

    return data
}

export async function getCuenta_EstadoByID(id_cue){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/cuenta_estado/${id_cue}`, Options)
    const data= await respuesta.json();
    return data[0];
}

export async function deleteCuenta_Estado(id_cue){
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/cuenta_estado/${id_cue}`, Options)
    
}

export async function ActualizarEstadoCuenta_Estado(id_cue, actulizar){
    const Options={
        method:'DELETE',
        body: JSON.stringify(actulizar),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/cuenta_estado/${id_cue}`, Options)
    const data= await respuesta.json()
    return data;
}

export async function AddCuenta_Estado(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/cuenta_estado`, Options)
    const data= await respuesta.json()
    return data;
}

export async function EditCuenta_Estado(datos, id_cue){
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/cuenta_estado/${id_cue}`, Options)
    const data= await respuesta.json()
    return data;
}
// FIN

// inicio de modelos
export async function getModelos(){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/modelos`, Options)
    const data= await respuesta.json();
    return data
}

export async function deleteModelo(id_modelo){
    const Options={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/modelos/${id_modelo}`, Options)
    const data= await respuesta.json()
    return data;
}

export async function AddModelo(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/modelos`, Options)
    const data= await respuesta.json()
    return data;
}
// fin de  modelos

// PRODUCTOS
export async function getProductos(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/productos`, Options)
    const data= await respuesta.json();
    return data
}

export async function getProductosByID(id_pro){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/productos/${id_pro}`, Options)
    const data= await respuesta.json();
    return data[0];
}

export async function EditProductos(datos, id_pro){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/productos/${id_pro}`, Options)
    const data= await respuesta.json()
    return data;
}

export async function ActualizarEstadoProductos(id_pro, actualizar){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'DELETE',
        body: JSON.stringify(actualizar),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/productos/${id_pro}`, Options)
    const data= await respuesta.json()
    return data;
}

export async function AddProductos(datos){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/productos`, Options)
    const data= await respuesta.json()
    return data;
}
// FIN


// CLIENTE
export async function getCliente(){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/cliente`, Options)
    const data= await respuesta.json()
    return data
}

export async function AddCliente(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/cliente`, Options)
    const data= await respuesta.json()
    return data;
}

export async function EditCliente(datos, id_cli){
    console.log(datos)
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/cliente/${id_cli}`, Options)
    const data= await respuesta.json()
    return data;
}

export async function ActualizarEstadoCliente(id_cli, actualizar){
    const Options={
        method:'PUT',
        body: JSON.stringify(actualizar),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/cambiar_estado_cliente/${id_cli}`, Options)
    const data= await respuesta.json()
    return data;
}

export async function getClienteByID(id_cli){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/cliente/${id_cli}`, Options)
    const data= await respuesta.json();
    console.log(data[0])
    return data[0];
}
// FIN

//inicio de ubicaciones
export async function getUbicaciones(){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/ubicaciones`, Options)
    const data= await respuesta.json();
    return data
}

export async function AddUbicacion(datos){
    const Options={
        method:'POST',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/ubicaciones`, Options)
    const data= await respuesta.json()
    return data;
}

export async function getUbicacionesByID(id_ubicacion){
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/ubicaciones/${id_ubicacion}`, Options)
    const data= await respuesta.json();
    return data[0];
}

export async function EditUbicacion(datos, id_ubicacion){
    const Options={
        method:'PUT',
        body: JSON.stringify(datos),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/ubicaciones/${id_ubicacion}`, Options)
    const data= await respuesta.json()
    return data;
}

export async function ActualizarEstadoUbicacion(id_ubicacion, actulizar){
    const Options={
        method:'DELETE',
        body: JSON.stringify(actulizar),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/ubicaciones/${id_ubicacion}`, Options)
    const data= await respuesta.json()
    return data;
}
// FIN

// USUARIOS
export async function getUsuarios(){
    const token = JSON.parse(localStorage.getItem('token'));
    const Options={
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,
        }
    }
    const respuesta = await fetch(`${URL}/usuarios`, Options)
    const data= await respuesta.json();
    return data
}

export async function ActualizarEstadoUsuario(id_usuario, actualizar){
    const Options={
        method:'DELETE',
        body: JSON.stringify(actualizar),
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/usuarios/${id_usuario}`, Options)
    const data= await respuesta.json()
    return data;
}

export async function ResetUsuariosByID(id_usuario){
    const Options={
        method:'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
    }
    const respuesta = await fetch(`${URL}/resetpass/${id_usuario}`, Options)
    const data= await respuesta.json()
    return data;
}