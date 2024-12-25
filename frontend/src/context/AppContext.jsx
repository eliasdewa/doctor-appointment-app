import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create a new context
export const AppContext = createContext();

// Provider component
export const AppContextProvider = ({ children }) => {
  const currencySymbol = "$";

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // When refresh the page, to fetch the token from local storage
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  // Get all doctors
  const [doctors, setDoctors] = useState([]);
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
  // get user data
  const [userData, setUserData] = useState(false);
  const getUserProfile = async () => {
    try {
      await axios
        .get(`${backendUrl}/user/get-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserData(response.data.userData);
          console.log(response.data.userData);
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
  useEffect(() => {
    if (token) {
      getUserProfile();
    } else {
      setUserData(false);
    }
  }, [token]);

  const state = {
    currencySymbol,
    backendUrl,
    token,
    setToken,
    doctors,
    getDoctorsData,
    userData,
    setUserData,
    getUserProfile,
  };
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};
