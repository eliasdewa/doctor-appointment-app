// HeaderSlider.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

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
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true, // Smooth fading effect
    adaptiveHeight: true,
  };

  return (
    <div className="relative overflow-hidden">
      <Slider {...settings}>
        {sliderImages.map((image, index) => (
          <div key={index} className="relative w-full">
            <img
              src={image.src}
              alt={image.alt}
              className="relative w-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-end text-white text-center p-5 bg-overlay">
              <h1 className="text-5xl font-bold mb-5">{image.caption}</h1>
              <p className="text-xl text-white mb-8">
                Book an appointment with the best doctors in town. Fast,
                reliable, and hassle-free.
              </p>
              <button
                onClick={() => {
                  navigate("/doctors");
                  scrollTo(0, 0);
                }}
                className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-600 transition duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Header;
