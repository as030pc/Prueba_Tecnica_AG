import React, { useEffect} from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { agregarAsincrono, agregarProducto, deleteAsincrono } from '../actions/actionProducto'
export const ListarProductos = ({handleEdit}) => {
   const {productos} =  useSelector(store => store.producto )
   console.log(productos)
   const dispatch = useDispatch()
   



    return (
        <div>
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
                                        <button className ="btn btn-secondary" onClick = {()=>handleEdit(element)} 
                                       >Editar </button>
                                            <button className ="btn btn-danger" onClick = {()=>dispatch(deleteAsincrono(element.nombres))}
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