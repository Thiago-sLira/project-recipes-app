import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import RecipesContext from '../context/RecipesContext';

function Filter({ categoryName }) {
  const { handleCategoryClick } = useContext(RecipesContext);
  return (
    <div>
      <Button
        type="button"
        data-testid={ `${categoryName}-category-filter` }
        onClick={ () => handleCategoryClick(categoryName) }
      >
        { `Categories of ${categoryName}` }
      </Button>
    </div>
  );
}

Filter.propTypes = {}.isRequired;

export default Filter;
