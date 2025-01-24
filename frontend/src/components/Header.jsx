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
              className="relative w-full h-screen object-fill"
            />
            <div className="overlay">
              <h1>{image.caption}</h1>
              <p>Book an appointment with ease and confidence.</p>
              <button className="cta-button">
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
