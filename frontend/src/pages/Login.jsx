import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book
          appointment
        </p>

        {/* Full name and Phone number */}
        {state === "Sign Up" && (
          <div className="w-full">
            <div>
              <p>Full Name</p>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                className="border border-zinc-300 rounded w-full p-2 mt-1"
              />
            </div>

            <div>
              <p>Phone Number</p>
              <input
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
                className="border border-zinc-300 rounded w-full p-2 mt-1"
              />
            </div>
          </div>
        )}

        {/* email */}
        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          />
        </div>
        {/* password */}
        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          />
        </div>
        {/* Button */}
        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p className="text-center mt-3">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary hover:text-primary-dark cursor-pointer"
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary hover:text-primary-dark cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </form>
  );
};
export default Login;
