import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContextProvider } from "../context/AppContext";

const Layout = () => {
  return (
    <AppContextProvider>
      <ToastContainer autoClose={2500} />
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </AppContextProvider>
  );
};
export default Layout;
