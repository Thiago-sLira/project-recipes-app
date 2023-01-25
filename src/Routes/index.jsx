import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
    Bebidas,
    Comidas,
    DetalhesBebida,
    DetalhesComida,
    Login,
    Perfil,
    ProgressoBebida,
    ProgressoComida,
    
} from '../pages';

const Routes = () => (
    <Switch>
        <Route
            exact path="/"
            component={Login}
        />
        <Route
            exact path="/comidas"
            component={Comidas}
        />
        <Route
            exact path="/comidas/:id"
            component={DetalhesComida}
        />
        <Route
            exact path="/comidas/:id/in-progress"
            component={ProgressoComida}
        />
        <Route
            exact path="/bebidas"
            component={Bebidas}
        />
        <Route
            exact path="/bebidas/:id"
            component={DetalhesBebida}
        />
        <Route
            exact path="/bebidas/:id/in-progress"
            component={ProgressoBebida}
        />

        <Route
            exact path="/perfil"
            component={Perfil}
        />
    </Switch>
);

export default Routes;