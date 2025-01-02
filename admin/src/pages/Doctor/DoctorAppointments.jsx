import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    doctorToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  useEffect(() => {
    if (doctorToken) {
      getAppointments();
    }
  }, [doctorToken]);

  const { calculateAge, formatDate, currencySymbol } = useContext(AppContext);
  return (
    <div className="w-full m-5 max-w-6xl">
      <h1 className="mb-3 text-lg font-medium">All Appointments</h1>
      {appointments.length > 0 ? (
        <div className="bg-white p-8 border rounded w-full max-w-6xl max-h-[80vh] overflow-y-scroll">
          <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-1 grid-flow-col py-3 px-6 border-b">
            <p>#</p>
            <p>Patient</p>
            <p>Payment</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>Action</p>
          </div>
          {appointments.reverse().map((appointment, index) => (
            <div
              key={index}
              className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-1 grid-flow-col py-3 px-6 border-b text-xs hover:bg-gray-50 items-center"
            >
              <p className="max-sm:hidden">{index + 1}</p>
              {/* Patient info */}
              <div className="flex items-center gap-2">
                <img
                  src={appointment.userData.image}
                  alt=""
                  className="w-8 rounded-full"
                />{" "}
                <p>{appointment.userData.name}</p>
              </div>
              {/* Payment method */}
              <div>
                <p className="text-xs inline border border-primary px-2 rounded-full">
                  {appointment.payment ? "Online" : "Cash"}
                </p>
              </div>
              {/* Age */}
              <p className="max-sm:hidden">
                {calculateAge(appointment.userData.dateOfBirth)}
              </p>
              {/* Date and time */}
              <p className="max-sm:hidden">
                {formatDate(appointment.slotDate)}, {appointment.slotTime}
              </p>
              {/* amount */}
              <p className="max-sm:hidden">
                {appointment.amount} {currencySymbol}
              </p>
              {/* action */}
              {appointment.cancelled ? (
                <p className="text-red-500 text-xs font-medium">Cancelled</p>
              ) : appointment.isCompleted ? (
                <p className="text-green-500 text-xs font-medium">Completed</p>
              ) : (
                <div className="flex">
                  <img
                    onClick={() => cancelAppointment(appointment._id)}
                    src={assets.cancel_icon}
                    alt=""
                    className="w-10 cursor-pointer"
                  />
                  <img
                    onClick={() => completeAppointment(appointment._id)}
                    src={assets.tick_icon}
                    alt=""
                    className="w-10 cursor-pointer"
                  />
                </div>
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
export default DoctorAppointments;
