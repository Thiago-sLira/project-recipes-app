import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes/Routes';
import RecipesProvider from './context/RecipesProvider';

function App() {
  return (
    <div>
      <RecipesProvider>
        <Routes />
      </RecipesProvider>
    </div>
  );
}

export default App;
