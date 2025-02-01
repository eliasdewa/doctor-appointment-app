import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Mail, MapPinned, PhoneCall } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-screen-2xl mx-auto px-8">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mb-6 text-sm">
        {/* Left section */}
        <div>
          <img
            onClick={() => {
              navigate("/");
              scrollTo(0, 0);
            }}
            className="mb-5 w-20"
            src={assets.logo}
            alt=""
          />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            We are a team of experienced doctors dedicated to providing the best
            healthcare services.
          </p>
        </div>
        {/* Center section */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li onClick={() => {
            navigate("/");
            scrollTo(0, 0);
          }
          } className="font-semibold hover:underline underline-offset-4 cursor-pointer">Home</li>
            <li onClick={() => {
            navigate("/about");
            scrollTo(0, 0);
          }
          } className="font-semibold hover:underline underline-offset-4 cursor-pointer">About Us</li>
            <li onClick={() => {
            navigate("/contact");
            scrollTo(0, 0);
          }
          } className="font-semibold hover:underline underline-offset-4 cursor-pointer">Contact Us</li>
            <li className="font-semibold hover:underline underline-offset-4 cursor-pointer">Careers</li>
            <li className="font-semibold hover:underline underline-offset-4 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
        {/* Right section */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <div className="flex flex-col gap-2 text-gray-600">
            <p className="flex gap-2"><Mail /><span>ed-doc@medical.com</span></p>
            <p className="flex gap-2"><PhoneCall /><span>+251 (910) 634-296</span></p>
            <p className="flex gap-2"><MapPinned /><span> Gofa, Addis Ababa, Ethiopia</span></p>
          </div>
        </div>
      </div>
      {/* Copy right */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          © 2025 Ed Doctor Appointment. All rights reserved.
        </p>
      </div>
    </div>
  );
};
export default Footer;
