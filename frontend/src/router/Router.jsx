import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Doctors from "../pages/Doctors";
import About from "../pages/About";
import Contact from "../pages/Contact";
// import Profile from "../pages/Profile";
// import MyAppointments from "../pages/MyAppointments";
import Appointment from "../pages/Appointment";
import Login from "../pages/Login";
import ProfilePage from "../pages/ProfilePage";
import MyAppointmentsPage from "../pages/MyAppointmentsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/doctors", exact: true,
        element: <Doctors />,
      },
      {
        path: "/doctors/:specialty", exact: true,
        element: <Doctors />,
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/profile",
        element: <ProfilePage/>
      },
      {
        path: "/my-appointments",
        element: <MyAppointmentsPage/>
      },
      {
        path: "/appointment/:docId",
        element: <Appointment/>
      },
      {
        path: "/login",
        element: <Login/>
      }
    ],
  },
]);

export default router;