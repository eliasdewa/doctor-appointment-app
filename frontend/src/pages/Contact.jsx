import { assets } from "../assets/assets";
const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          src={assets.contact_image}
          alt=""
          className="w-full md:max-w-[360px]"
        />
        <div className="flex flex-col justify-center items-start gap-6 md:w-2/4 text-sm text-gray-600">
          <p className="text-gray-600 font-semibold text-lg">Our Office</p>
          <p className="text-gray-500">
            54709 Williams Station <br /> Suite 350, Washington, USA
          </p>
          <p className="text-gray-500">
            Tel: (415) 555-0132 <br /> Email: ed@gmail.com
          </p>
          <p className="text-gray-600 font-semibold text-lg">Careers at Ed</p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-300">Explore Jobs</button>
        </div>
      </div>
    </div>
  );
};
export default Contact;
