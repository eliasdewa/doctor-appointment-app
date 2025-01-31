import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { fadeIn } from "../variant";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-50 flex items-center justify-between mt-10">
      {/* ----Left Side----- */}
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        className="px-4 py-8 sm:py-10 md:py-16 lg:py-14 lg:pl-5  rounded-lg mx-auto sm:mx-0 text-center sm:text-left">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
          <p className="text-blue-900">Book Appointment</p>
          <p className="mt-4 text-gray-600 mb-8">With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-600 transition duration-300"
        >
          Create account
        </button>
      </motion.div>
      {/* ----Right Side----- */}
      <motion.div
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }} className="hidden md:block md:w-1/2 lg:w-[370px]">
        <img
          className="w-full max-w-md"
          src={assets.appointment_img}
          alt=""
        />
      </motion.div>
    </div>
  );
};
export default Banner;
