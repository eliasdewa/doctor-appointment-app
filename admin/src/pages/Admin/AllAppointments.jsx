import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { adminToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);

  useEffect(() => {
    if (adminToken) {
      getAllAppointments();
    }
  }, [adminToken]);
  // Get the age of the user and function to format the date
  const { calculateAge, formatDate, currencySymbol } = useContext(AppContext);

  return (
    <div className="w-full m-5">
      <h1 className="mb-3 text-lg font-medium">All Appointments</h1>
      {appointments.length > 0 ? (
        <div className="bg-white p-8 border rounded w-full max-w-6xl max-h-[80vh] overflow-y-scroll">
          <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr] grid-flow-col py-3 px-6 border-b">
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p className="">Fees</p>
            <p>Action</p>
          </div>
          {appointments.map((appointment, index) => (
            <div
              key={index}
              className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr] grid-flow-col py-3 px-6 border-b text-xs hover:bg-gray-50 items-center"
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center gap-2">
                <img
                  src={appointment.userData.image}
                  alt=""
                  className="w-8 rounded-full"
                />{" "}
                <p>{appointment.userData.name}</p>
              </div>
              <p className="max-sm:hidden">
                {calculateAge(appointment.userData.dateOfBirth)}
              </p>
              <p className="max-sm:hidden">
                {formatDate(appointment.slotDate)}, {appointment.slotTime}
              </p>
              <div className="flex items-center gap-2">
                <img
                  src={appointment.docData.image}
                  alt=""
                  className="w-8 rounded-full bg-gray-200"
                />{" "}
                <p>{appointment.docData.name}</p>
              </div>
              <p className="max-sm:hidden">
                {appointment.amount} {currencySymbol}
              </p>
              {appointment.cancelled ? (
                <p className="text-red-500 text-xs font-medium">Cancelled</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(appointment._id)}
                  src={assets.cancel_icon}
                  alt=""
                  className="w-10 cursor-pointer"
                />
              )}
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
export default AllAppointments;
