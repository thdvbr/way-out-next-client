import React, {
  createContext, useContext, useState, useEffect,
} from 'react';

const DataContext = createContext();

export function DataProvider({
  children,
  pageData,
  staffData,
  bottomAds,
  sideAds,
}) {
  const [bottomAdData, setBottomAdData] = useState([]);
  const [sideAdData, setSideAdData] = useState([]);

  useEffect(() => {
    setBottomAdData(bottomAds);
    setSideAdData(sideAds);
  }, [bottomAds, sideAds]);

  return (
    <DataContext.Provider
      value={{
        bottomAdData,
        sideAdData,
        pageData,
        staffData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  return useContext(DataContext);
}
