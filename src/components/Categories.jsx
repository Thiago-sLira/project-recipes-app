import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

const NUMBER_FIVE = 5;
function Filter() {
  const {
    handleCategoryRequisition, dataCategory, categories, setCategories,
  } = useContext(RecipesContext);
  const history = useHistory();

  const rederCategories = useCallback(() => {
    if (dataCategory.meals) {
      const slicedArray = dataCategory.meals.slice(0, NUMBER_FIVE);
      return setCategories(slicedArray);
    } if (dataCategory.drinks) {
      const slicedArray = dataCategory.drinks.slice(0, NUMBER_FIVE);
      return setCategories(slicedArray);
    }
  }, [dataCategory.meals, dataCategory.drinks, setCategories]);

  useEffect(() => {
    rederCategories();
  }, [dataCategory, rederCategories]);

  useEffect(() => {
    handleCategoryRequisition(history.location.pathname);
  }, [history.location.pathname]);

  return (
    <aside>
      { categories.map(({ strCategory }) => (
        <button
          type="button"
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
        >
          { strCategory }
        </button>
      )) }
    </aside>
  );
}

export default Filter;
