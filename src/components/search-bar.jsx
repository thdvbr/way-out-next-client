import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(value);
      }}>
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
