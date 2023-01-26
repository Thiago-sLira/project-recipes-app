import React, { useState } from 'react';

function SearchBar() {
  const [searchField, setSearchField] = useState({
    searchInput: '',
    radioValue: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setSearchField({
      ...searchField,
      [name]: value,
    });
  };

  return (
    <div>
      <section>
        <label htmlFor="input-search">
          <input
            data-testid="search-input"
            type="text"
            id="input-search"
            name="searchInput"
            value={ searchField.searchInput }
            onChange={ handleChange }
          />
        </label>
      </section>
    </div>
  );
}

export default SearchBar;
