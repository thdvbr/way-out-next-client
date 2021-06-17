import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
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
    }
  };
  return (
    <AppContext.Provider
      value={{
        query, searchResult, handleSearch, searchIsOpen, handleSearchOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
