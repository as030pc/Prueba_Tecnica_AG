import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { CrudProducto } from '../components/CrudProducto'


import PaginaPrincipal from '../pages/PaginaPrincipal'



const DashBoardRouter = () => {
    return (

        <Switch>
            <Route
                exact
                path="/crud"
                component={CrudProducto}

            />
            
            <Route
                exact
                path="/"
                component={CrudProducto}

            />
           
            <Redirect to="/" />
        </Switch>

    )
}

export default DashBoardRouter
