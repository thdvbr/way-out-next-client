import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';

const AppContext = createContext();
// TODO: Separate your state into different logical pieces rather than in one big store, so a single update to any part of state does NOT trigger an update to every component in your app.
export function AppWrapper({ children, pageData, staffData, bottomAdData, sideAdData }) {

  
  
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [infoIsOpen, setInfoIsOpen] = useState(false);
  const [isTop, setIsTop] = useState(false);
  const [joinIsOpen, setJoinIsOpen] = useState(false);


  return (
    <AppContext.Provider
      value={{
        searchIsOpen,
        setSearchIsOpen,
        infoIsOpen,
        setInfoIsOpen,
        isTop,
        setIsTop,
        bottomAdData,
        sideAdData,
        pageData,
        staffData,
        joinIsOpen,
        setJoinIsOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
