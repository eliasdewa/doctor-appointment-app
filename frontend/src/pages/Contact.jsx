import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPinned,
  PhoneCall,
  Twitter,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
const Contact = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-96"
      >
        <img
          className="absolute h-full w-full object-contain"
          src="https://static.vecteezy.com/system/resources/previews/027/187/210/large_2x/male-doctor-in-white-coat-and-glasses-smiling-and-gesturing-on-a-white-background-looking-at-the-camera-plenty-of-space-for-text-and-health-related-conten-free-photo.jpg"
          alt="nature image"
        />
        <div className="absolute inset-0 h-full w-full bg-black/50"></div>
        <div className="relative pt-28 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Get in Touch</h2>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="-mt-16 mb-8 px-8 "
      >
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 items-center gap-16 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]  text-[#333] py-12 justify-center rounded-xl border border-white shadow-black/5 saturate-200">
            <div className="my-8 mx-4 grid gap-3 px-4">
              <h1 className="text-3xl font-extrabold">Let's Talk</h1>
              <p className="text-sm text-gray-400 mt-3">
                Do you want to contact us, please use the contact form and send us a message. Or try to reach out on our social media platform
              </p>
              {/* Contact */}
              <div className="flex justify-between">
                {/* Email */}
                <div className="mt-12">
                  <h2 className="text-lg font-extrabold">Email</h2>
                  <a
                    href="mailto:eliasdewa3@gmail.com"
                    target="_blank"
                    className="mt-3 bg-[#e6e6e6cf] h-10 w-10 mx-auto rounded-full flex items-center justify-center shrink-0 hover:bg-blue-400"
                  >
                    <Mail />
                  </a>
                </div>
                {/* Phone */}
                <div className="mt-12">
                  <h2 className="text-lg font-extrabold">Phone</h2>
                  <a
                    href="mailto:eliasdewa3@gmail.com"
                    target="_blank"
                    className="mt-3 bg-[#e6e6e6cf] h-10 w-10 mx-auto rounded-full flex items-center justify-center shrink-0 hover:bg-blue-400"
                  >
                    <PhoneCall />
                  </a>
                </div>
                {/* Location */}
                <div className="mt-12">
                  <h2 className="text-lg font-extrabold">Location</h2>

                  <a
                    href="https://maps.app.goo.gl/tbUV3q4HBcybVyDY8"
                    target="_blank"
                    className="mt-3 bg-[#e6e6e6cf] h-10 w-10 mx-auto rounded-full flex items-center justify-center shrink-0 hover:bg-blue-400"
                  >
                    <MapPinned />
                  </a>
                </div>
              </div>
              {/* Socials */}
              <div className="mt-12">
                <h2 className="text-lg font-extrabold">Socials</h2>
                <ul className="flex mt-3 space-x-4">
                  <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0 hover:bg-blue-400 ">
                    <a href="https://www.facebook.com" target="_blank">
                      <Facebook />
                    </a>
                  </li>
                  <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0 hover:bg-blue-400 ">
                    <a href="https://www.x.com" target="_blank">
                      <Twitter />
                    </a>
                  </li>
                  <li className="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0 hover:bg-blue-400 ">
                    <a href="https://www.instagram.com" target="_blank">
                      <Instagram />
                    </a>
                  </li>
                  <li className="bg-[#e6e6e6cf]/60 h-10 w-10 rounded-full flex items-center justify-center shrink-0 hover:bg-blue-400 transition-all duration-300">
                    <a href="https://www.youtube.com" target="_blank">
                      <Youtube />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* message Form */}
            <div className="p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md text-[#333] font-[sans-serif]">
              <form className="ml-auo space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  name="subject"
                  className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#007bff]"
                />
                <textarea
                  placeholder="Message"
                  rows="6"
                  name="message"
                  className="w-full rounded-md px-4 border text-sm pt-2.5 outline-[#007bff]"
                ></textarea>
                <button
                  type="submit"
                  className="text-white bg-[#007bff] hover:bg-blue-600 font-semibold rounded-md text-sm px-4 py-2.5 w-full"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default Contact;
