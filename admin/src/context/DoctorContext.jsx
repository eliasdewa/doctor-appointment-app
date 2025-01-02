import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

export const DoctorContextProvider = ({ children }) => {
  // Backend API URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // state variables
  const [doctorToken, setDoctorToken] = useState(
    localStorage.getItem("doctorToken")
      ? localStorage.getItem("doctorToken")
      : ""
  );
  // Get doctor appointments
  const [appointments, setAppointments] = useState([]);
  const getAppointments = async () => {
    try {
      await axios
        .get(`${backendUrl}/doctor/doctor-appointments`, {
          headers: { Authorization: `Bearer ${doctorToken}` },
        })
        .then((response) => {
          setAppointments(response.data.appointments);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Complete appointments request
  const completeAppointment = async (appointmentId) => {
    try {
      await axios
        .post(
          `${backendUrl}/doctor/complete-appointment`,
          { appointmentId },
          {
            headers: { Authorization: `Bearer ${doctorToken}` },
          }
        )
        .then((response) => {
          console.log(response.data.message);
          toast.success(response.data.message);
          getAppointments();
        })
        .catch((error) => {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Cancel appointments
  const cancelAppointment = async (appointmentId) => {
    try {
      await axios
        .post(
          `${backendUrl}/doctor/cancel-appointment`,
          { appointmentId },
          {
            headers: { Authorization: `Bearer ${doctorToken}` },
          }
        )
        .then((response) => {
          console.log(response.data.message);
          toast.success(response.data.message);
          getAppointments();
        })
        .catch((error) => {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const state = {
    doctorToken,
    setDoctorToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment
  };
  return (
    <DoctorContext.Provider value={state}>{children}</DoctorContext.Provider>
  );
};
