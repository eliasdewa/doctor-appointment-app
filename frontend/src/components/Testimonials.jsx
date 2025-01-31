import { motion } from "framer-motion";
import { fadeIn } from "../variant";
const Testimonials = () => {
  return (
    <div>
      {/* Testimonials Section */}
      <div className="container mx-auto py-16 mt-10">
        <motion.h2
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }} className="text-3xl font-bold text-center text-blue-900 mb-12">
          What Our Patients Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 flex gap-2 rounded-lg shadow-md">
            <img
              src="https://static.vecteezy.com/system/resources/previews/005/180/010/large_2x/portrait-of-cheerful-african-man-looking-at-the-camera-free-photo.jpg"
              alt=""
              className="w-14 h-20 rounded-md object-cover"
            />
            <div>
              <p className="text-gray-600 mb-4">
                "The doctors here are amazing! I got the best treatment and
                care."
              </p>
              <p className="text-blue-900 font-bold">John Doe</p>
            </div>
          </div>
          <div className="bg-white p-6 flex gap-2 rounded-lg shadow-md">
            <img
              src="https://static.vecteezy.com/system/resources/previews/003/492/377/large_2x/closeup-male-studio-portrait-of-happy-man-looking-at-the-camera-image-free-photo.jpg"
              alt=""
              className="w-14 h-20 rounded-md object-cover"
            />
            <div>
              <p className="text-gray-600 mb-4">
                "Highly recommended! The service is fast and professional."
              </p>
              <p className="text-blue-900 font-bold">Clark Smith</p>
            </div>
          </div>
          <div className="bg-white p-6 flex gap-2 rounded-lg shadow-md">
            <img
              src="https://static.vecteezy.com/system/resources/previews/003/162/336/large_2x/close-up-view-senior-attractive-man-smiling-looking-free-photo.JPG"
              alt=""
              className="w-14 h-20 rounded-md object-cover"
            />
            <div>
              <p className="text-gray-600 mb-4">"Best Services! Keep going!"</p>
              <p className="text-blue-900 font-bold">Alex D</p>
            </div>
          </div>
          <div className="bg-white p-6 flex gap-2 rounded-lg shadow-md">
            <img
              src="https://static.vecteezy.com/system/resources/previews/003/492/056/non_2x/closeup-portrait-of-a-beautiful-girl-over-blue-background-touches-herself-face-image-free-photo.jpg"
              alt=""
              className="w-14 h-20 rounded-md object-cover"
            />
            <div>
              <p className="text-gray-600 mb-4">
                "I'm happy to be your customer. Thank you for care and support"
              </p>
              <p className="text-blue-900 font-bold">Jena Curt</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Testimonials;
