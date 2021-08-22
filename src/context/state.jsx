import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoIsOpen, setInfoIsOpen] = useState(false);

  const handleSearchOpen = () => {
    setSearchIsOpen(!searchIsOpen);
  };

  const searchEndpoint = (searchQuery) => `/api/search?q=${searchQuery}`;

  const handleSearch = (query) => {
    setQuery(query);
    if (query.length) {
      setIsLoading(true);
      setErrorMsg('');
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          setSearchResult(res.results);
          res.results.length === 0 ? setErrorMsg('Nothing Found') : setErrorMsg('');
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setErrorMsg('');
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
        isLoading,
        errorMsg,
        infoIsOpen,
        setInfoIsOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
