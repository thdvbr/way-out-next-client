import React, { createContext, useContext, useState } from 'react';

const UIContext = createContext();

export function UIProvider({ children }) {
  const [errorMsg, setErrorMsg] = useState('');
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const [isTop, setIsTop] = useState(false);
  const [joinIsOpen, setJoinIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(false);
  const [infoDrawerSection, setInfoDrawerSection] = useState(null);

  return (
    <UIContext.Provider
      value={{
        errorMsg,
        setErrorMsg,
        searchIsOpen,
        setSearchIsOpen,
        infoIsOpen,
        setInfoIsOpen,
        isTop,
        setIsTop,
        joinIsOpen,
        setJoinIsOpen,
        isLoading,
        setIsLoading,
        hasMorePosts,
        setHasMorePosts,
        infoDrawerSection,
        setInfoDrawerSection,
      }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUIContext() {
  return useContext(UIContext);
}
