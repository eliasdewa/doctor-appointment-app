import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { CalendarRange, ChevronDown, LogIn, LogOut, Menu, UserRoundPen, X } from "lucide-react";
import { toast } from "react-toastify";

const navLink = [
  {
    id: 1,
    title: "HOME",
    link: "",
  },
  {
    id: 2,
    title: "ALL DOCTORS",
    link: "doctors",
  },
  {
    id: 3,
    title: "ABOUT",
    link: "about",
  },
  {
    id: 4,
    title: "CONTACT",
    link: "contact",
  },
];
const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  // const [token, setToken] = useState(true);
  const { token, setToken, userData } = useContext(AppContext);

  // logout function
  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    toast.success("User logged out");
    navigate("/login");
  };
  return (
    <header className="max-w-screen-2xl mx-auto px-8 top-0 left-0 right-0 transition-all duration-300 ease-in-out">
      <div
        className={`flex items-center justify-between text-sm ${
          isSticky
            ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out"
            : ""
        }`}
      >
        {/* logo */}
        <img
          onClick={() => navigate("/")}
          className="w-20 cursor-pointer"
          src={assets.logo}
          alt=""
        />
        {/* navItem */}
        <ul className="hidden md:flex items-start gap-5 font-medium">
          {navLink.map((item) => (
            <NavLink key={item.id} to={`/${item.link}`}>
              <li className="py-1">{item.title}</li>
            </NavLink>
          ))}
        </ul>
        {/* user login */}
        <div className="flex items-center gap-4">
          {token && userData ? (
            <div className="flex items-center justify-center gap-2 cursor-pointer group relative">
              {/* User name */}
              <p className="text-gray-400 text-sm">{userData.name}</p>
              {/* Profile pic */}
              <img className="w-8 rounded-full" src={userData.image} alt="" />
              {/* Dropdown menu icon */}
              <ChevronDown />
              {/* Dropdown menu */}
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <p
                    onClick={() => navigate("profile")}
                    className="flex items-center transition duration-300 ease-in-out hover:text-black cursor-pointer"
                  >
                    <UserRoundPen /><span className="ml-2">My Profile</span>
                  </p>
                  <p
                    onClick={() => navigate("my-appointments")}
                    className="flex items-center transition duration-300 ease-in-out hover:text-black cursor-pointer"
                  >
                    <CalendarRange /><span className="ml-2">My Appointment</span>
                  </p>
                  <p
                    className="flex items-center transition duration-300 ease-in-out hover:text-black cursor-pointer"
                    onClick={logout}
                  >
                    <LogOut />
                    <span className="ml-2">Log Out</span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to={"/login"}
                className="bg-primary/70 hover:bg-primary text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
              >
                <LogIn className="mr-2" size={18} />
                Login
              </Link>
            </div>
          )}
          <span
            onClick={() => setShowMenu(!showMenu)}
            className="text-3xl md:hidden w-10 h-10 inline-flex items-center justify-center rounded-full text-designColor cursor-pointer"
          >
            <Menu size={30} />
          </span>
        </div>
        {/* Mobile menu */}
        {showMenu && (
          <div className="md:hidden w-[40%] h-screen absolute top-0 right-0 bg-slate-200 p-4 z-50">
            <div className="flex flex-col gap-8 py-4 relative">
              <ul className="flex flex-col gap-4 pt-3">
                {navLink.map((item) => (
                  <li
                    key={item.id}
                    className="font-semibold cursor-pointer hover:bg-slate-600 p-2 rounded-md"
                  >
                    <Link
                      onClick={() => setShowMenu(false)}
                      activeClass="active"
                      to={item.link}
                      // spy={true}
                      // smooth={true}
                      // offset={-70}
                      // duration={500}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <span
                onClick={() => setShowMenu(false)}
                className="absolute top-0 right-3 text-gray-400 dark:text-gray-900 hover:text-red-500 text-2xl cursor-pointer"
              >
                <X size={30} />
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
export default Navbar;
