/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-closing-bracket-location */
import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export function DataProvider({
  children,
  pageData,
  staffData,
  bottomAds,
  sideAds,
}) {
  const [bottomAdData, setBottomAdData] = useState(bottomAds || []);
  const [sideAdData, setSideAdData] = useState(sideAds || []);

  useEffect(() => {
    if (bottomAds?.length) setBottomAdData(bottomAds);
    if (sideAds?.length) setSideAdData(sideAds);
  }, [bottomAds, sideAds]);

  return (
    <DataContext.Provider
      value={{
        bottomAdData,
        sideAdData,
        pageData,
        staffData,
      }}>
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  return useContext(DataContext);
}
