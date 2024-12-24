import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Left section */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perferendis alias debitis quisquam, maiores autem quam mollitia ipsa
            ad fugiat qui.
          </p>
        </div>
        {/* Center section */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        {/* Right section */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Email: 123@example.com</li>
            <li>Phone: +1 (123) 456-7890</li>
            <li>Address: 123 Main St, City, State, ZIP</li>
            <li>Hours: Mon-Fri 9:00 AM - 5:00 PM</li>
          </ul>
        </div>
      </div>
      {/* Copy right */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2024 @ Doctor Appointment. All rights reserved.</p>
      </div>
    </div>
  );
};
export default Footer;
