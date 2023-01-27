import React from 'react';

function Recipescard() {
  return (
    <div
      key={ index }
      data-testid={ `${index}-recipe-card` }
    >
      <img
        alt="recipe"
        data-testid={ `${index}-card-img` }
        src={ img }
      />
      <div data-testid={ `${index}-card-name` }>{}</div>
    </div>
  );
}

export default Recipescard;
