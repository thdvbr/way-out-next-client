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
        className="join-search-bg text-black sm:pl-4 border-black border-2 font-main text-26.5 py-1 sm:text-24 md:text-26 ml:text-31 lg:text-36 leading-3 w-full text-center rounded sm:rounded-none sm:text-left"
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
