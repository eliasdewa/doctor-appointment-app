import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { adminToken, dashboardData, getDashboardData, cancelAppointment } =
    useContext(AdminContext);
  const { formatDate } = useContext(AppContext);
  useEffect(() => {
    if (adminToken) {
      getDashboardData();
    }
  }, [adminToken]);
  if (!dashboardData) return null;
  return (
    <div className="w-full m-5">
      <div className="flex flex-wrap gap-3">
        {/* Total Doctors */}
        <div className="flex-1 flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
          <img className="w-14" src={assets.doctor_icon} alt="" />
          <div>
            <p className="text-gray-600 text-xl font-semibold">
              {dashboardData.doctors}
            </p>
            <p className="text-sm text-gray-500">Total Doctors</p>
          </div>
        </div>
        {/* Total Appointments */}
        <div className="flex-1 flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
          <img className="w-14" src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-gray-600 text-xl font-semibold">
              {dashboardData.appointments}
            </p>
            <p className="text-sm text-gray-500">Total Appointments</p>
          </div>
        </div>
        {/* Total Patients */}
        <div className="flex-1 flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all duration-300">
          <img className="w-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-gray-600 text-xl font-semibold">
              {dashboardData.patients}
            </p>
            <p className="text-sm text-gray-500">Total Patients</p>
          </div>
        </div>
      </div>
      {/* Latest appointments */}
      <div className="bg-white">
        <div className="flex items-center gap-2.5 p-4 mt-10 rounded-t border">
          <img src={assets.list_icon} alt="" />
          <p className="font-semibold">Latest Appointments</p>
        </div>
        {/* List latest appointment */}
        <div className="pt-4 border border-t-0">
          {dashboardData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 py-3 px-6 border-b hover:bg-gray-200"
            >
              <img
                src={item.docData.image}
                alt=""
                className="w-10 rounded-full"
              />
              <div className="flex-1 text-sm">
                <p className="text-gray-800 font-medium">{item.docData.name}</p>
                <p className="text-gray-600">{formatDate(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <p className="text-red-500 text-xs font-medium">Cancelled</p>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  src={assets.cancel_icon}
                  alt=""
                  className="w-10 cursor-pointer"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
