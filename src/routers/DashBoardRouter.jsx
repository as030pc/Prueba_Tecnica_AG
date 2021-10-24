import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import { Crud } from '../components/Crud'







const DashBoardRouter = () => {
    return (

        <Switch>
            <Route
                exact
                path="/crud"
                component={Crud}

            />
            
            <Route
                exact
                path="/"
                component={Crud}

            />
           
            <Redirect to="/" />
        </Switch>

    )
}

export default DashBoardRouter
