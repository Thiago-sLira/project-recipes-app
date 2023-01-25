import React, { useMemo } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [initialState, setInitialState] = useState([]);

  const values = useMemo(() => ({
    initialState, setInitialState,
  }), [initialState, setInitialState]);

  return (
    <RecipesContext.Provider value={ values }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {}.isRequired;

export default RecipesProvider;
