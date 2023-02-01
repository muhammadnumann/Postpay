import { createContext, useState } from 'react';

export const DashboardContext = createContext({
  currency: '',
  setCurrency: (currency: string) => {},
});

export const DashboardContextProvider: React.FC = ({ children }) => {
  const [currency, setCurrency] = useState('AED');
  const value = {
    currency,
    setCurrency,
  };
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
