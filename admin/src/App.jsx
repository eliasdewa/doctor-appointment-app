import { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddDoctor from "./pages/Admin/AddDoctor";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import DoctorsList from "./pages/Admin/DoctorsList";

const App = () => {
  const { adminToken } = useContext(AdminContext);

  return adminToken ? (
    <div className="bg-[#f8f9fd]">
      <ToastContainer />
      <Navbar />
			<div className="flex items-start">
				<Sidebar />
        <Routes>
          <Route exact path="/" element={<></>} />
          <Route exact path="/admin-dashboard" element={<Dashboard />} />
          <Route exact path="/add-doctor" element={<AddDoctor />} />
          <Route exact path="/all-appointments" element={<AllAppointments />} />
          <Route exact path="/doctor-list" element={<DoctorsList />} />
        </Routes>
			</div>
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  );
};
export default App;
