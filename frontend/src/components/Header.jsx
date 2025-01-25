// HeaderSlider.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Header = () => {
  const sliderImages = [
    {
      src: "https://static.vecteezy.com/system/resources/previews/027/298/490/non_2x/doctor-posing-portrait-free-photo.jpg",
      alt: "Quality Healthcare",
      caption: "Your Health, Our Priority",
    },
    {
      src: "https://static.vecteezy.com/system/resources/previews/023/570/077/large_2x/portrait-of-girl-doctor-illustration-ai-generative-free-photo.jpg",
      alt: "Expert Doctors",
      caption: "Connect with Top Specialists",
    },
    {
      src: "https://static.vecteezy.com/system/resources/previews/028/533/270/large_2x/doctor-and-his-team-smiling-generative-ai-free-photo.jpeg",
      alt: "Easy Appointments",
      caption: "Booking Made Simple",
    },
  ];

  const settings = {
    dots: true, // Enable dots navigation
    infinite: true, // Infinite loop
    speed: 3000, // Transition speed
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    //fade: true, // Smooth fading effect
    adaptiveHeight: true,
  };

  return (
    <div className="relative overflow-hidden">
      <Slider {...settings}>
        {sliderImages.map((image, index) => (
          <div key={index} className="relative w-full h-screen">
            <img
              src={image.src}
              alt={image.alt}
              className="relative w-full h-screen object-cover sm:object-fill"
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-end text-white text-center p-5 bg-overlay">
              <h1 className="text-5xl font-bold mb-5">{image.caption}</h1>
              <p className="text-2xl mb-7">
                Book an appointment with ease and confidence.
              </p>
              <button
                className="text-white bg-[#007bff] hover:bg-blue-600 font-semibold rounded-md text-sm px-4 py-2.5"
              >
                <Link to={"/doctors"}>Get Started</Link>
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Header;
