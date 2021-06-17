import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = ({ onSearch }) => {
  const router = useRouter();
  const [value, setValue] = useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(value);
        router.push('/');
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
