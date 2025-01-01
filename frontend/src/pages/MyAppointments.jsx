import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData, currencySymbol, formatDate, userData } =
    useContext(AppContext);

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

  // handle payment
  const handlePayOnline = async (appointment) => {
    const firstName = userData.name.split(" ")[0];
    const lastName = userData.name.split(" ")[1];
    try {
      const response = await fetch(`${backendUrl}/user/initialize-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: appointment.amount,
          email: userData.email, // Get user email from auth
          firstName,
          lastName,
          phone: userData.phone,
          appointmentId: appointment._id, // ID of the appointment
        }),
      });

      const data = await response.json();
      if (data.success) {
        window.location.href = data.paymentUrl; // Redirect to payment page
      } else {
        toast.error("Payment initialization failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    }
  };

  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const paymentStatus = queryParams.get("payment");

  // useEffect(() => {
  //   if (paymentStatus === "true") {
  //     toast.success("Payment successful!");
  //   } else if (paymentStatus === "false") {
  //     toast.error("Payment failed. Please try again.");
  //   }
  // }, [paymentStatus]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>
      {/* Display appointments */}
      <div>
        {appointments.map((appointment, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
          >
            <div>
              <img
                src={appointment.docData.image}
                alt=""
                className="w-32 bg-indigo-50"
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {appointment.docData.name}
              </p>
              <p>{appointment.docData.specialty}</p>
              <p
                className="text-zinc-700 font-medium mt-1
                "
              >
                Address:
              </p>

              <p className="text-xs">{appointment.docData.address.line1}</p>
              <p className="text-xs">{appointment.docData.address.line1}</p>

              <p
                className="text-zinc-700 font-medium mt-1
                "
              >
                Date & Time:
              </p>
              <p className="text-xs">
                {formatDate(appointment.slotDate)} @ {appointment.slotTime}
              </p>
              <p
                className="text-zinc-700 font-medium mt-1
                "
              >
                Fees:{" "}
                <span className="text-xs">
                  {appointment.amount} {currencySymbol}
                </span>
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {/* Pay */}
              {!appointment.cancelled && !appointment.payment && (
                <button
                  onClick={() => handlePayOnline(appointment)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Pay Online
                </button>
              )}
              {/* Paid */}
              {!appointment.cancelled && appointment.payment && (
                <button disabled className="text-lg text-center sm:min-w-48 py-2 border rounded bg-green-600 text-white">
                  Paid
                </button>
              )}
              {/* Cancel Button */}
              {!appointment.cancelled && !appointment.payment && (
                <button
                  onClick={() => cancelAppointment(appointment._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel appointment
                </button>
              )}
              {appointment.cancelled && (
                <button disabled className="text-sm text-center sm:min-w-48 py-2 border rounded bg-red-500">
                  Appointment cancelled
                </button>
              )}
              {/* Delete appointment */}
              {(appointment.cancelled || appointment.payment) && (
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
