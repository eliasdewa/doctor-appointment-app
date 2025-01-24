import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between my-20">
      {/* ----Left Side----- */}
      <div className="px-4 py-8 sm:py-10 md:py-16 lg:py-14 lg:pl-5 bg-primary rounded-lg">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
          <p>Book Appointment</p>
          <p className="mt-4">With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all duration-300"
        >
          Create account
        </button>
      </div>
      {/* ----Right Side----- */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px]">
        <img
          className="w-full max-w-md"
          src={assets.appointment_img}
          alt=""
        />
      </div>
    </div>
  );
};
export default Banner;
