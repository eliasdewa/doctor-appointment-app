import { createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const state = {
    // Add your application state here
    // For example, a user's profile, appointments, etc.
    
    // Add more state variables as needed
  }
  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  );
};