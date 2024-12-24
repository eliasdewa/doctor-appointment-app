import { createContext } from "react";

export const DoctorContext = createContext();

export const DoctorContextProvider = ({ children }) => {
  const state = {
    // Add your application state here
    // For example, a user's profile, appointments, etc.
    
    // Add more state variables as needed
  }
  return (
    <DoctorContext.Provider value={state}>
      {children}
    </DoctorContext.Provider>
  );
};