import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
const Doctors = () => {
  const { specialty } = useParams();
  // get all doctors
  const { doctors } = useContext(AppContext);
  // filter doctors by specialty
  const [filterDocs, setFilterDocs] = useState([]);

  const [showFiler, setShowFiler] = useState(false);

  const navigate = useNavigate();

  // filter docs by specialty or display all docs
  const applyFilter = () => {
    if (specialty) {
      setFilterDocs(doctors.filter((doc) => doc.specialty === specialty));
    } else {
      setFilterDocs(doctors);
    }
  };
  // Then, to apply the filter when the specialty or doctors is changed
  useEffect(() => {
    applyFilter();
  }, [doctors, specialty]);
  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-20 xl:px-24">
      <div className="flex flex-col items-start gap-5 mt-5">
        <button
          onClick={() => setShowFiler((prev) => !prev)}
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFiler ? "bg-primary text-white" : ""
          }`}
        >
          Filter
        </button>
        {/* Filter option */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`${
            showFiler ? "flex" : "hidden sm:flex"
          } flex gap-4 text-sm text-gray-600 `}
        >
          <p
            onClick={() => navigate("/doctors")}
            className="w-[94vw] sm:w-auto cursor-pointer px-2 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            All
          </p>
          <NavLink
            to={"/doctors/General Physician"}
            className="w-[94vw] sm:w-auto cursor-pointer"
          >
            General Physician
          </NavLink>
          <NavLink
            to={"/doctors/Gynecologist"}
            className="w-[94vw] sm:w-auto cursor-pointer"
          >
            Gynecologist
          </NavLink>
          <NavLink
            to={"/doctors/Dermatologist"}
            className="w-[94vw] sm:w-auto cursor-pointer"
          >
            Dermatologist
          </NavLink>
          <NavLink
            to={"/doctors/Pediatricians"}
            className="w-[94vw] sm:w-auto cursor-pointer"
          >
            Pediatricians
          </NavLink>
          <NavLink
            to={"/doctors/Neurologist"}
            className="w-[94vw] sm:w-auto cursor-pointer"
          >
            Neurologist
          </NavLink>
          <NavLink
            to={"/doctors/Gastroenterologist"}
            className="w-[94vw] sm:w-auto cursor-pointer"
          >
            Gastroenterologist
          </NavLink>
        </motion.div>
        {/* Display doctors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full grid grid-cols-auto gap-4 gap-y-6"
        >
          {filterDocs.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={index}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <img src={item.image} alt="" className="bg-blue-50" />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center ${
                    item.available ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  <p
                    className={`w-2 h-2 ${
                      item.available ? "bg-green-500" : "bg-gray-500"
                    } rounded-full`}
                  ></p>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.specialty}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
export default Doctors;
