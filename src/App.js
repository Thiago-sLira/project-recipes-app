import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={ <Login /> } />
    </Switch>
  );
}

export default App;
