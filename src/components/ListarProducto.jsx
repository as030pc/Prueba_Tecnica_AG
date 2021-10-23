import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {deleteAsincrono } from '../actions/actionProducto'
export const ListarProductos = ({ handleEdit }) => {
    const { productos } = useSelector(store => store.producto)

    console.log(productos)
    const dispatch = useDispatch()
    const repositorios = async (username) => {
        const res = await fetch(`https://api.github.com/users/${username.github}/repos`);
        const data = await res.json();
        console.log(data)
        setRepos(data)
        setUser(username)

    }

    const [user, setUser] = useState({})

    const [repos, setRepos] = useState([])




    return (
        <div>
            <h1> Información del candidato seleccionado</h1>

            <div class="card">
                <div class="card-body">
                    <h3 class="card-title"> Nombre del candidato: {user.nombres} {user.apellidos}</h3>
                    <p class="card-subtitle mb-2 text-muted"> Cedula: {user.cedula}</p>
                    <p class="card-text"> Fecha de nacimiento: {user.fecha}</p>
                    <p class="card-text"> Email: {user.correo}</p>
                    <p class="card-text"> Usuario de GitHub: {user.github}</p>



                </div>
            </div>








            <h3> Repositorios de {user.nombres} {user.apellidos}</h3>



            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre del repositorio </th>
                        <th> Descripcion </th>
                        <th> Branch por defecto </th>
                        <th> Lenguaje </th>
                        <th> Url del repositorio </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (repos) ?
                            (

                                repos.map((element, index) => (

                                    <tr key={index}>
                                        <td>{element.name}</td>
                                        <td>{element.description}</td>
                                        <td>{element.default_branch}</td>
                                        <td>{element.language}</td>
                                        <td><a href={element.html_url} target = "blank" rel="noopener"> Ir al repositorio </a></td>
                                    </tr>
                                )

                                )




                            ) :
                            <p>Datos no disponibles</p>
                    }


                </tbody>

            </Table>






            <h1> Usuarios registrados </h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombres </th>
                        <th>Apellidos</th>
                        <th> Fecha de nacimiento </th>
                        <th> Cedula </th>
                        <th> Correo </th>
                        <th> Github </th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (productos) ?
                            (

                                productos.map((element, index) => (

                                    <tr key={index}>
                                        <td>{element.nombres}</td>
                                        <td>{element.apellidos}</td>
                                        <td>{element.fecha}</td>
                                        <td>{element.cedula}</td>
                                        <td>{element.correo}</td>
                                        <td>{element.github}</td>


                                        <td>
                                            <button className="btn btn-secondary" onClick={() => handleEdit(element)}
                                            >Editar </button>

                                            <button className="btn btn-primary" onClick={() => repositorios(element)}
                                            > Ver info </button>
                                            <button className="btn btn-danger" onClick={() => dispatch(deleteAsincrono(element.nombres))}
                                            >Eliminar</button>

                                        </td>

                                    </tr>
                                )

                                )




                            ) :
                            <p>Datos no disponibles</p>
                    }


                </tbody>

            </Table>


        </div>
    )
}