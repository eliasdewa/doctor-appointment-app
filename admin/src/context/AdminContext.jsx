import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  // state variables
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken") ? localStorage.getItem("adminToken") : ""
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // Get all doctors
  const [doctors, setDoctors] = useState([]);
  const getAllDoctors = async () => {
    try {
      await axios
        .post(
          `${backendUrl}/admin/all-doctors`,
          {},
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        )
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
  // Change the availability of the doctor
  const changeDoctorAvailability = async (doctorId) => {
    try {
      await axios
        .post(
          `${backendUrl}/admin/change-availability`,
          { doctorId },
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        )
        .then((response) => {
          toast.success(response.data.message);
          getAllDoctors();
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

  const [appointments, setAppointments] = useState([]);
  // Get all appointments
  const getAllAppointments = async () => {
    try {
      await axios
        .get(`${backendUrl}/admin/all-appointments`, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        })
        .then((response) => {
          console.log(response.data.appointments);
          setAppointments(response.data.appointments);
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
  // Cancel the appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      await axios
        .post(
          `${backendUrl}/admin/cancel-appointment`,
          { appointmentId },
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        )
        .then((response) => {
          toast.success(response.data.message);
          getAllAppointments();
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

  const state = {
    adminToken,
    setAdminToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeDoctorAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment
  };
  return (
    <AdminContext.Provider value={state}>{children}</AdminContext.Provider>
  );
};
