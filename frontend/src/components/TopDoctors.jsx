import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { fadeIn } from "../variant";
import { motion } from "framer-motion";
import DoctorCard from "./DoctorCard";

const TopDoctors = () => {
  const navigate = useNavigate();
  // get all doctors from AppContext
  const { doctors } = useContext(AppContext);
  // console.log(doctors);
  return (
    <div className="container mx-auto py-16 flex flex-col items-center gap-4 text-gray-900 mt-10">
      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        className="mb-6">
        <h2 className="text-3xl font-bold text-center text-blue-900">
          Top Doctors
        </h2>
        <p className="text-center text-sm">
          Browse through our extensive list of trusted doctors
        </p>
      </motion.div>
      <div
        className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6"
      >
        {doctors.slice(0, 10).map((doctor, index) => (
          <DoctorCard doctor={doctor} />
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="text-white bg-[#007bff] hover:bg-blue-600 font-semibold rounded-md text-sm px-4 py-2.5 mt-6"
      >
        See More
      </button>
    </div>
  );
};
export default TopDoctors;
