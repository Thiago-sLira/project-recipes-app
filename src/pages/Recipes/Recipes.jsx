import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Recipes() {
  return (
    <div>
      <Header />
      <main>
        <h1>Recipes</h1>
        <button
          type="button"
          key={ index }
          data-testid={ `${categoryName}-category-filter` }
        >
          { }
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default Recipes;
