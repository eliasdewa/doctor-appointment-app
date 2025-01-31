import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const { name, specialty, image, availability } = doctor;

  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/appointment/${doctor._id}`);
        scrollTo(0, 0);
      }}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:translate-y-[-10px] hover:shadow-lg transition-all duration-500"
    >
      {/* Doctor Image */}
      <img src={image} alt={name} className="w-full object-cover" />

      {/* Doctor Details */}
      <div className="p-6">
        {/* Availability */}
        <div
          className={`flex items-center gap-2 text-sm text-center ${
            doctor.available ? "text-green-500" : "text-gray-500"
          }`}
        >
          <p
            className={`w-2 h-2 ${
              doctor.available ? "bg-green-500" : "bg-gray-500"
            } rounded-full`}
          ></p>
          <p>{doctor.available ? "Available" : "Not Available"}</p>
        </div>
        <h3 className="text-xl font-bold text-blue-900 my-2">{name}</h3>
        <p className="text-gray-600 mb-4 text-sm">{specialty}</p>
      </div>
    </div>
  );
};

export default DoctorCard;
