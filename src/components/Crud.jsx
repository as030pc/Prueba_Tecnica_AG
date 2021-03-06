import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useForm } from '../hooks/useForm';

import { agregarAsincrono, Edit } from '../actions/actionCandidato';
import { ListarCandidatos } from './ListarCandidatos';
import { activeCandidato } from "../actions/actionCandidato"

export const Crud = () => {



    const dispatch = useDispatch();

    const [values, handleInputChange, reset, setValues] = useForm({
        nombres: "",
        apellidos: "",
        cedula: "",
        fecha: "",
        correo: "",
        github: ""
    })

    let { nombres, apellidos, cedula, fecha, correo, github } = values;

    const handleRegistro = (e) => {
        e.preventDefault();
        dispatch(agregarAsincrono(nombres, apellidos, correo, cedula, github, fecha));
        reset();
    }


    const [editForm, setEditform] = useState(false)
    const handleEdit = (candidato) => {

        dispatch(activeCandidato(candidato.id, candidato))
        setEditform(true)
        setValues({
            ...candidato
        })
    }
    const handlePut = (e) => {
        e.preventDefault();
        dispatch(Edit(values))
        reset()
        setEditform(false)
    }


    return (
        <div className="crud-container">

            <div className = "formulario">
                <h1> GitInnova</h1>

                <h2> Registro de candidatos</h2>


                <form>

                    <div className="form-group">
                        <div className="form-group col-md-4">
                            <label htmlFor="documento">Nombres </label>
                            <input
                                className="form-control"
                                type="text"
                                name="nombres"
                                id="nombre"
                                value={nombres}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group col-md-4">
                            <label htmlFor="nombres"> Apellidos </label>
                            <input
                                className="form-control"
                                type="text"
                                name="apellidos"
                                id="apellidos"
                                value={apellidos}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group col-md-4">
                            <label htmlFor="nombres"> Cedula</label>
                            <input
                                className="form-control"
                                type="text"
                                name="cedula"
                                id="cedula"
                                value={cedula}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group col-md-4">
                            <label htmlFor="direccion"> Fecha de nacimiento </label>
                            <input
                                className="form-control"
                                type="date"
                                name="fecha"
                                id="fecha"
                                value={fecha}
                                onChange={handleInputChange} />
                        </div>

                        <br />


                        <div className="form-group col-md-4">
                            <label htmlFor="nombres"> Correo electronico </label>
                            <input
                                className="form-control"
                                type="email"
                                name="correo"
                                id="correo"
                                value={correo}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="nombres"> GitHub </label>
                            <input
                                className="form-control"
                                type="text"
                                name="github"
                                id="github"
                                value={github}
                                onChange={handleInputChange}
                                required
                            />
                        </div>





                        <div>


                            <div className="d-grid gap-2 mx-auto">
                                {
                                    !editForm
                                        ?
                                        <button
                                            className="btn btn-dark"
                                            type="submit" onClick={handleRegistro}>Enviar</button>
                                        :
                                        <button
                                            className="btn btn-dark"
                                            type="submit" onClick={handlePut}>Guardar</button>

                                }
                            </div>
                        </div>


                    </div>
                </form>

            </div>



            <ListarCandidatos handleEdit={handleEdit} />

        </div>
    )
}
