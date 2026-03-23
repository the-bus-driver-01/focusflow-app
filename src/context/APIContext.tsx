import React, { createContext } from 'react';
import { apiService } from '@services/api';

interface APIContextType {
  apiService: typeof apiService;
}

export const APIContext = createContext<APIContextType | undefined>(undefined);

interface APIProviderProps {
  children: React.ReactNode;
}

export const APIProvider: React.FC<APIProviderProps> = ({ children }) => {
  const value: APIContextType = {
    apiService,
  };

  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
};
