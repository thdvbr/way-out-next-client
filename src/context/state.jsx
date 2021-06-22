import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  const handleSearchOpen = () => {
    setSearchIsOpen(!searchIsOpen);
  };

  const searchEndpoint = (searchQuery) => `/api/search?q=${searchQuery}`;

  const handleSearch = (query) => {
    setQuery(query);
    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => setSearchResult(res.results));
    } else {
      setSearchResult([]);
      router.push('/');
    }
  };
  return (
    <AppContext.Provider
      value={{
        query,
        setQuery,
        searchResult,
        handleSearch,
        searchIsOpen,
        setSearchIsOpen,
        handleSearchOpen,
        setSearchResult,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
