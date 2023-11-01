import React, { useEffect, useState } from "react";
import * as API from '../../servicios/servicios';
import { Link, useParams } from "react-router-dom";

export function EditCliente() {
  const [nombre, setNombre] = useState('');
  const [cli_estado, setCli_estado] = useState('');
  const [cue_estado, setCue_estado] = useState('');
  const [id_cue, setId_cue] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cuentaEstados, setCuentaEstados] = useState([]);

  const cli_estados = ['X', 'O'];

  const { id_cli } = useParams();

  useEffect(() => {
    traerDatos();
  }, []);

  const traerDatos = async () => {
    const cuenta_estados = await API.getCuenta_Estado();
    setCuentaEstados(cuenta_estados);
    const datosCliente = await API.getClienteByID(id_cli);
    setNombre(datosCliente.nombre);
    setDireccion(datosCliente.direccion);
    setCli_estado(datosCliente.cli_estado);
    setId_cue(datosCliente.id_cue);
    //setId_cue(datosCliente.cue_estado);
    setApellido(datosCliente.apellido);
    setCorreo(datosCliente.correo);
  }

  const editarCliente = async (event) => {
    event.preventDefault();
    const respuesta = await API.EditCliente({
      nombre,
      cli_estado,
      //cue_estado,
      id_cue,
      apellido,
      direccion,
      correo,
      mensaje
    }, id_cli);

    if (respuesta.status) {
      setMensaje(respuesta.mensaje);
      setTimeout(() => {
        setMensaje('');
        window.location.href = '/cliente';
      }, 3000);
    }
  }

  return (
    <main className="form-signin w-100 m-auto">
      <form onSubmit={editarCliente}>
        <div>
          {mensaje}
        </div>
        <div className="form-floating">
          <input
            type="text"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            className="form-control"
            placeholder="Nombre del cliente"
          />
          <label htmlFor="floatingInput">Nombre</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            value={apellido}
            onChange={(event) => setApellido(event.target.value)}
            className="form-control"
            placeholder="Apellido"
          />
          <label htmlFor="floatingInput">Apellido</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            value={direccion}
            onChange={(event) => setDireccion(event.target.value)}
            className="form-control"
            placeholder="direccion"
          />
          <label htmlFor="floatingInput">Direccion</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            value={correo}
            onChange={(event) => setCorreo(event.target.value)}
            className="form-control"
            placeholder="correo"
          />
          <label htmlFor="floatingInput">Correo</label>
        </div>
        <div className="form-floating">
          <select
            onChange={(event) => setCli_estado(event.target.value)}
            value={cli_estado}
            className="form-control"
          >
            {cli_estados.map((m) => (
              <option
                key={m}
                value={m}
              >
                {m}
              </option>
            ))}
          </select>
          <label htmlFor="floatingInput">Estado Cliente</label>
        </div>
        <div className="form-floating">
          <select
            onChange={(event) => setCue_estado(event.target.value)}
            value={id_cue}
            className="form-control"
          >
            {cuentaEstados.map((m) => (
              <option
                key={m.id_cue}
                value={m.estado}
              >
                {m.estado}
              </option>
            ))}
          </select>
          <label htmlFor="floatingInput">Cuenta Estado</label>
        </div>
        <button className="btn btn-primary" type="submit">Guardar Edición</button>
        <Link to="/cliente">Volver</Link>
      </form>
    </main>
  );
}
