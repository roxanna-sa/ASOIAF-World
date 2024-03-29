import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface DarkModeContextType {
  darkMode: boolean;
  setDarkMode:Dispatch<SetStateAction<boolean>>;
}

export const DarkModeContext = createContext<DarkModeContextType>( { darkMode: false, setDarkMode: () => {}} );

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const values: DarkModeContextType = { darkMode, setDarkMode };

  return (
    <DarkModeContext.Provider value={ values }>
      <div className={ darkMode ? 'dark bg-black h-screen' : 'h-screen' }>
        {children}
      </div>
    </DarkModeContext.Provider>
  );
};

export const useDarkModeContext = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};
