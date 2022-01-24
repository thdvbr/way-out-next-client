import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = ({ onSearch }) => {
  const router = useRouter();
  const [value, setValue] = useState('');
  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(value);
        router.push('/');
      }}
    >
      <input
        className="join-search-bg py-3.5 sm:pl-4 border-black border-2 font-main w-full text-center rounded sm:rounded-none sm:text-left"
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
