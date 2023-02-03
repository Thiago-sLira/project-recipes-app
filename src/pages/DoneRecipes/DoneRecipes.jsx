import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';

function DoneRecipes() {
  const [nameRecipes, setNameRecipes] = useState([]);
  useEffect(() => {
    const test = JSON.parse(localStorage.getItem('doneRecipes'));
    if (test) {
      setNameRecipes(test);
    }
  }, []);
  /*  const {
    removeFilter, filterMeal, filterDrink, share,
  } = useContext(RecipesContext);
 */
  // const history = useHistory();
  const share = () => {
    console.log('oi');
  };

  return (
    <div>
      <Header mainPage={ false } title="Done Recipes" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        // onClick={ () => removeFilter(history.location.pathname) }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        // onClick={ () => filterMeal(history.location.pathname) }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        // onClick={ () => filterDrink(history.location.pathname) }
      >
        Drinks
      </button>
      <section>
        { nameRecipes.length > 0 && (nameRecipes.map((item, index) => (
          <div key={ index }>
            <img
              src=""
              alt="imageCardRecipe"
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              { `${item.nationality} - ${item.category}` }
            </p>
            <p data-testid={ `${index}-horizontal-name` } />
            <p data-testid={ `${index}-horizontal-done-date` } />
            { item.tags.map((tag) => (
              <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` } />
            )) }
            <button
              onClick={ share }
            >
              <img
                src="src/images/shareIcon.svg"
                alt="button"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
          </div>
        ))) }
      </section>
    </div>
  );
}

export default DoneRecipes;
