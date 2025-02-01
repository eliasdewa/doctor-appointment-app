import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointmentsPage = () => {
  const {
    backendUrl,
    token,
    getDoctorsData,
    currencySymbol,
    formatDate,
    userData,
  } = useContext(AppContext);

  const [appointmentsList, setAppointmentsList] = useState([]);

  // get all the appointments
  const getAppointments = async () => {
    try {
      await axios
        .get(`${backendUrl}/user/appointments`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          // console.log(response.data.appointments);
          setAppointmentsList(response.data.appointments);
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

  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-12">
      <h1 className="text-3xl font-bold text-blue-900 mb-8">My Appointments</h1>
      {/* Display appointments */}
      {appointmentsList.length > 0 ? (
        <div className="space-y-6">
          {appointmentsList.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row sm:justify-between justify-start border"
            >
              <div>
                <img
                  src={appointment.docData.image}
                  alt=""
                  className="w-32 bg-indigo-50 mb-4"
                />
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  {appointment.docData.name}
                </h3>
                <p className="text-gray-600 mb-2">
                  <strong>Specialty: </strong>
                  {appointment.docData.specialty}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Address 1: </strong>
                  {appointment.docData.address.line1}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Address 2: </strong>
                  {appointment.docData.address.line2}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Date & Time: </strong>
                  {formatDate(appointment.slotDate)} at {appointment.slotTime}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Fee: </strong>
                  {appointment.amount} {currencySymbol}
                </p>
              </div>

              <div className="flex flex-col gap-2 justify-end">
                {/* Pay */}
                {!appointment.cancelled &&
                  !appointment.payment &&
                  !appointment.isCompleted && (
                    <button
                      onClick={() => handlePayOnline(appointment)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                      Proceed to payment
                    </button>
                  )}
                {/* Paid */}
                {!appointment.cancelled &&
                  !appointment.isCompleted &&
                  appointment.payment && (
                    <button
                      disabled
                      className="text-lg text-center sm:min-w-48 py-2 border rounded bg-green-600 text-white"
                    >
                      Paid
                    </button>
                  )}
                {/* Cancel Button */}
                {!appointment.cancelled &&
                  !appointment.isCompleted &&
                  !appointment.payment && (
                    <button
                      onClick={() => cancelAppointment(appointment._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                      Cancel appointment
                    </button>
                  )}
                {appointment.cancelled && (
                  <button
                    disabled
                    className="bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
                  >
                    Appointment cancelled
                  </button>
                )}
                {/* Completed */}
                {appointment.isCompleted && (
                  <button disabled className="bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300">
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto">
          <h1 className="text-3xl font-bold text-center my-10">
            No Appointment Yet!
          </h1>
        </div>
      )}
    </div>
  );
};

export default MyAppointmentsPage;
