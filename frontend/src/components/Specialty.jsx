import { motion } from "framer-motion";
import { fadeIn } from "../variant";
const Specialty = () => {
  return (
    <div
      id="specialty"
      className="bg-blue-50 flex flex-col items-center gap-4 py-16 text-gray-800 mt-10"
    >
      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        className="mb-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-900">
          Our Services
        </h2>
        <p className="text-center text-sm">
          Our team offers a wide range of specialized services to help you
          achieve your health goals. From physical therapy to mental health
          support, we've got you covered.
        </p>
      </motion.div>
      <div
        viewport={{ once: false, amount: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto"
      >
        <div className="bg-blue-100 p-6 mx-2 rounded-lg shadow-md text-center cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            General Checkup
          </h3>
          <p className="text-gray-600">
            Comprehensive health checkups to keep you in the best shape.
          </p>
        </div>
        <div className="bg-blue-100 p-6 mx-2 rounded-lg shadow-md text-center cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Dental Care</h3>
          <p className="text-gray-600">
            Expert dental care for a bright and healthy smile.
          </p>
        </div>
        <div className="bg-blue-100 p-6 mx-2 rounded-lg shadow-md text-center cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Pediatrics</h3>
          <p className="text-gray-600">
            Specialized care for your little ones.
          </p>
        </div>
        <div className="bg-blue-100 p-6 mx-2 rounded-lg shadow-md text-center cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            Emergency medicine
          </h3>
          <p className="text-gray-600">
            Stabilize and treat patients with a wide range of undifferentiated
            physical and behavioral disorders
          </p>
        </div>
        <div className="bg-blue-100 p-6 mx-2 rounded-lg shadow-md text-center cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Surgery</h3>
          <p className="text-gray-600">
            Injury repairs, surgeries, and other procedures for physical health.
          </p>
        </div>
        <div className="bg-blue-100 p-6 mx-2 rounded-lg shadow-md text-center cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            Laboratory services
          </h3>
          <p className="text-gray-600">
            Diagnostic tests, blood tests, and other laboratory procedures.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Specialty;
