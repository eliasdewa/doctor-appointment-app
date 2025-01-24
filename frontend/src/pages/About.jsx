import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
const About = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-20 xl:px-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center text-2xl pt-10 mb-10 text-gray-500"
      >
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </motion.div>
      <div className="flex flex-col md:flex-row gap-2 justify-between">
        <div>
          <p className="max-w-full text-xl text-gray-600">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora deleniti, consectetur nulla explicabo dignissimos totam at. Enim reprehenderit doloribus recusandae!
          </p>
          <p className="mt-4 text-xl text-gray-600 md:mt-8">
            <span className="relative inline-block">
              <span className=""> Have a question? </span>
            </span>
            <Link
              to="/contact"
              title=""
              className="transition-all duration-200 text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-500 hover:underline"
            >
              {" "}
              Contact us
            </Link>
          </p>
        </div>

        <img
          className="max-w-lg"
          src="https://static.vecteezy.com/system/resources/previews/048/638/970/large_2x/medical-professionals-with-physician-light-brown-background-studiopresentation-and-organized-free-photo.jpg"
          alt=""
        />
      </div>

      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-wrap text-center justify-center">
          <div className="p-4 md:w-1/4 sm:w-1/2">
            <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
              <div className="flex justify-center">
                <img
                  src="https://image3.jdomni.in/banner/13062021/58/97/7C/E53960D1295621EFCB5B13F335_1623567851299.png?output-format=webp"
                  className="w-32 mb-3"
                />
              </div>
              <h2 className="title-font font-regular text-2xl text-gray-900">
                Latest Milling Machinery
              </h2>
            </div>
          </div>

          <div className="p-4 md:w-1/4 sm:w-1/2">
            <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
              <div className="flex justify-center">
                <img
                  src="https://image2.jdomni.in/banner/13062021/3E/57/E8/1D6E23DD7E12571705CAC761E7_1623567977295.png?output-format=webp"
                  className="w-32 mb-3"
                />
              </div>
              <h2 className="title-font font-regular text-2xl text-gray-900">
                Reasonable Rates
              </h2>
            </div>
          </div>

          <div className="p-4 md:w-1/4 sm:w-1/2">
            <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
              <div className="flex justify-center">
                <img
                  src="https://image3.jdomni.in/banner/13062021/16/7E/7E/5A9920439E52EF309F27B43EEB_1623568010437.png?output-format=webp"
                  className="w-32 mb-3"
                />
              </div>
              <h2 className="title-font font-regular text-2xl text-gray-900">
                Time Efficiency
              </h2>
            </div>
          </div>

          <div className="p-4 md:w-1/4 sm:w-1/2">
            <div className="px-4 py-6 transform transition duration-500 hover:scale-110">
              <div className="flex justify-center">
                <img
                  src="https://image3.jdomni.in/banner/13062021/EB/99/EE/8B46027500E987A5142ECC1CE1_1623567959360.png?output-format=webp"
                  className="w-32 mb-3"
                />
              </div>
              <h2 className="title-font font-regular text-2xl text-gray-900">
                Expertise in Industry
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
