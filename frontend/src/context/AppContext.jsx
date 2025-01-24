import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create a new context
export const AppContext = createContext();

// Provider component
export const AppContextProvider = ({ children }) => {
  // State variables for currency symbol
  const currencySymbol = "ETB";
  // Backend API URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // State variables for token
  // const [token, setToken] = useState('');
  // When refresh the page, to fetch the token from local storage
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  // State variables for doctors data
  const [doctors, setDoctors] = useState([]);
  // Get all doctors
  const getDoctorsData = async () => {
    try {
      await axios
        .get(`${backendUrl}/doctor/list`)
        .then((response) => {
          setDoctors(response.data.doctors);
          console.log(response.data.doctors);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  // When ever we load the page, we need to call the getDoctorsData function
  useEffect(() => {
    getDoctorsData();
  }, []);

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
  // State variables for user data
  const [userData, setUserData] = useState(false);
  // get user data
  const getUserProfile = async () => {
    try {
      await axios
        .get(`${backendUrl}/user/get-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserData(response.data.userData);
          // console.log(response.data.userData);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  // When ever we load the page, we need to call the getUserProfile function if user token is available
  useEffect(() => {
    if (token) {
      getUserProfile();
    } else {
      setUserData(false);
    }
  }, [token]);
  // state
  const state = {
    currencySymbol,
    backendUrl,
    token,
    setToken,
    doctors,
    getDoctorsData,
    formatDate,
    userData,
    setUserData,
    getUserProfile,
  };
  
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};
