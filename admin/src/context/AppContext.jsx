import { createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // State variables for currency symbol
  const currencySymbol = "ETB";
  // Backend API URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // Calculate the age
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    return today.getFullYear() - birthDate.getFullYear()
  }
  // To formate the date, from 20-10-200 to 20 October 2000
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formatDate = (date) => {
    const dateArray = date.split("-");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const state = {
    currencySymbol,
    backendUrl,
    calculateAge,
    formatDate
  }
  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  );
};