import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { adminToken } = useContext(AdminContext);
  const { doctorToken } = useContext(DoctorContext);
  return (
    <div className="min-h-screen bg-white border-r">
      {/* Sidebar for admin */}
      {adminToken && (
        <ul className="text-[#515151] mt-5">
          {/* dashboard */}
          <NavLink
            to={"/admin-dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          {/* all appointments */}
          <NavLink
            to={"/all-appointments"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          {/* all doctors */}
          <NavLink
            to={"/doctor-list"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Doctor List</p>
          </NavLink>
          {/* add doctor */}
          <NavLink
            to={"/add-doctor"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.add_icon} alt="" />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>
        </ul>
      )}
      {/* Sidebar for doctor */}
      {doctorToken && (
        <ul className="text-[#515151] mt-5">
          {/* dashboard */}
          <NavLink
            to={"/doctor-dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          {/* all appointments */}
          <NavLink
            to={"/doctor-appointments"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          {/* doctor profile */}
          <NavLink
            to={"/doctor-profile"}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
          >
            <img src={assets.add_icon} alt="" />
            <p className="hidden md:block">Doctor Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};
export default Sidebar;
