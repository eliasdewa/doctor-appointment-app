import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const About = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-screen-2xl mx-auto px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center text-2xl pt-10 mb-10 text-gray-500"
      >
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
          About Us
        </h2>
      </motion.div>
      <div className="flex flex-col-reverse md:flex-row gap-2 justify-between my-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="max-w-full text-xl text-gray-600">
            We are a team of experienced doctors dedicated to providing the best
            healthcare services. Our mission is to make healthcare accessible
            and affordable for everyone.
          </p>
          <div className="flex flex-col  md:flex-row my-10">
            <div className="border p-4 flex flex-col gap-5 text-[15px] hover:bg-blue-50 transition-all duration-300 text-gray-600 cursor-pointer">
              <h3 className="text-xl font-bold text-primary text-center">Our Mission</h3>
              <p>
                We aim to provide exceptional healthcare services that are both
                convenient and accessible for everyone.
              </p>
            </div>
            <div className="border p-4 flex flex-col gap-5 text-[15px] hover:bg-blue-50 transition-all duration-300 text-gray-600 cursor-pointer">
              <h3 className="text-xl font-bold text-primary text-center">Our Vision</h3>
              <p>
                We believe that everyone deserves to live a healthy, fulfilling
                life, and that healthcare should be accessible and affordable
                for everyone.
              </p>
            </div>
            <div className="border p-4 flex flex-col gap-5 text-[15px] hover:bg-blue-50 transition-all duration-300 text-gray-600 cursor-pointer">
              <h3 className="text-xl font-bold text-primary text-center">Values</h3>
              <p>
                We strive to create a healthcare system that is accessible,
                affordable, and equitable for everyone. We believe that everyone
                deserves to live a healthy, fulfilling life, and that healthcare
                should be accessible and affordable for everyone.
              </p>
            </div>
          </div>
          <p className="mt-4 text-xl text-gray-600">
            <span className="relative inline-block">
              <span className=""> Have a question? </span>
            </span>
            <button
              onClick={() => {
                navigate("/contact");
                scrollTo(0, 0);
              }}
              title=""
              className="px-2 transition-all duration-200 text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-500"
            >
              {" "}
              Contact us
            </button>
          </p>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-lg shadow-2xl rounded-lg"
          src="https://static.vecteezy.com/system/resources/previews/048/638/970/large_2x/medical-professionals-with-physician-light-brown-background-studiopresentation-and-organized-free-photo.jpg"
          alt=""
        />
      </div>
    </div>
  );
};
export default About;
