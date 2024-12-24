import { assets } from "../assets/assets";
const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          src={assets.about_image}
          alt=""
          className="w-full md:max-w-[360px]"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias
            fugit quo tenetur mollitia fuga repellendus illo inventore odit
            veritatis ipsum! Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Sit accusantium dolor eveniet quos? Reprehenderit fuga
            deleniti quia. Eum, ducimus ullam.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias
            fugit quo tenetur mollitia fuga repellendus illo inventore odit
            veritatis ipsum! Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Alias, repudiandae.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Dignissimos, illum distinctio quas ullam culpa odit soluta delectus
            voluptatibus hic ipsum.
          </p>
        </div>
      </div>
      <div className="text-xl my-4">
        <p>WHY <span className="text-gray-700 font-semibold">CHOOSE US</span></p>
      </div>
      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency</b>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet sequi, voluptas ea odit ducimus iure reiciendis ratione esse culpa at.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenience</b>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet sequi, voluptas ea odit ducimus iure reiciendis ratione esse culpa at.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalization</b>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet sequi, voluptas ea odit ducimus iure reiciendis ratione esse culpa at.</p>
        </div>
      </div>
    </div>
  );
};
export default About;
