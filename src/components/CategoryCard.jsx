import React from 'react';

function CategoryCard({ strCategory }) {
  return (
    <li>
      { strCategory }
    </li>
  );
}

CategoryCard.propTypes = {}.isRequired;

export default CategoryCard;
