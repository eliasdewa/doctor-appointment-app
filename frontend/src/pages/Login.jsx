import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, LogIn, Mail, User, UserPlus } from "lucide-react";
// import { Link } from "react-router-dom";
// import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);

  const [state, setState] = useState("Login");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Sign Up") {
        await axios
          .post(`${backendUrl}/user/register`, {
            name,
            phone,
            email,
            password,
          })
          .then((response) => {
            // store the token on local storage
            localStorage.setItem("token", response.data.token);
            // update the token
            setToken(response.data.token);
            toast.success(response.data.message);
            // clear the input fields
            setName("");
            setPhone("");
            setEmail("");
            setPassword("");
          })
          .catch((error) => {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
          });
      } else {
        await axios
          .post(`${backendUrl}/user/login`, {
            email,
            password,
          })
          .then((response) => {
            // store the token on local storage
            localStorage.setItem("token", response.data.token);
            // update the token
            setToken(response.data.token);
            toast.success(response.data.message);
            // clear the input fields
            setEmail("");
            setPassword("");
          })
          .catch((error) => {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
          });
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  // if there is token, navigate to home page
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="flex flex-col gap-3 m-auto items-center min-w-[340px] sm:min-w-96">
          <h2 className="text-center text-3xl font-extrabold">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </h2>
          <h2 className="text-center text-xl font-extrabold text-emerald-400">
            Please {state === "Sign Up" ? "sign up" : "login"} to book
            appointment
          </h2>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="border shadow-2xl bg-white mx-auto p-8 sm:rounded-lg sm:px-10">
          <form onSubmit={onSubmitHandler} className="space-y-6">
            {/* Name */}
            {state === "Sign Up" && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium"
                >
                  Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className=" block w-full px-3 py-2 pl-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    placeholder="Your name"
                  />
                </div>
              </div>
            )}
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium"
              >
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" block w-full px-3 py-2 pl-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            {/* password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className=" block w-full px-3 py-2 pl-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
            {/* Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
							hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
            >
              {state === "Sign Up" ? (
                <>
                  <UserPlus className="mr-2 h-5 w-5" aria-hidden="true" />{" "}
                  Create Account
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" aria-hidden="true" /> Login
                </>
              )}
            </button>
            {state === "Sign Up" ? (
              <p className="mt-8 text-center text-sm">
                Already have an account?{" "}
                <span
                  onClick={() => setState("Login")}
                  className="text-primary hover:text-primary-dark cursor-pointer"
                >
                  Login
                </span>
              </p>
            ) : (
              <p className="mt-8 text-center text-sm">
                Don't have an account?{" "}
                <span
                  onClick={() => setState("Sign Up")}
                  className="text-primary hover:text-primary-dark cursor-pointer"
                >
                  Sign Up
                </span>
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};
export default Login;
