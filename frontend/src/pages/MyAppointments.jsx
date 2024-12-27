import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  // get all the appointments
  const getAppointments = async () => {
    try {
      await axios
        .get(`${backendUrl}/user/appointments`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          // console.log(response.data.appointments);
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
  // Get appointments on mount
  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token]);
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

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      // console.log(appointmentId);
      await axios
        .post(
          `${backendUrl}/user/cancel-appointment/`,
          { appointmentId },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          toast.success(response.data.message);
          // refresh appointments after canceling an appointment
          getAppointments();
          // refresh doctors data after cancelling an appointment
          getDoctorsData();
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

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>
      {/* Display appointments */}
      <div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
          >
            <div>
              <img
                src={item.docData.image}
                alt=""
                className="w-32 bg-indigo-50"
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.specialty}</p>
              <p
                className="text-zinc-700 font-medium mt-1
                "
              >
                Address:
              </p>

              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line1}</p>

              <p
                className="text-zinc-700 font-medium mt-1
                "
              >
                Date & Time:
              </p>
              <p className="text-xs">
                {formatDate(item.slotDate)} @ {item.slotTime}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && (
                <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                  Pay Online
                </button>
              )}
              {!item.cancelled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel appointment
                </button>
              )}
              {item.cancelled && (
                <p className="text-sm text-center sm:min-w-48 py-2 border rounded bg-red-500">
                  Appointment cancelled
                </p>
              )}
              {item.cancelled && (
                <button className="text-center sm:min-w-48 py-2 border rounded text-red-500 hover:bg-red-700 hover:text-white text-sm">
                  Delete Appointment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyAppointments;
