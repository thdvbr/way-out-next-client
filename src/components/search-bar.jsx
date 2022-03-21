import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const router = useRouter();
  const [value, setValue] = useState('');

  // TODO : FORM VALIDATION 
  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        router.push({ pathname: '/search', query: { keyword: value } });
      }}
    >
      <input
        className="join-search-bg text-black sm:pl-4 border-black border-2 font-main text-26.5 py-1 sm:py-0 sm:text-26.5 md:text-30 ml:text-33 lg:text-40 leading-3 w-full text-center rounded sm:rounded-none sm:text-left"
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
