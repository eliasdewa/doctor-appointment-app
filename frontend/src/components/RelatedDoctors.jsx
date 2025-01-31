import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import DoctorCard from "./DoctorCard";
import { fadeIn } from "../variant";
import { motion } from "framer-motion";

const RelatedDoctors = ({ docId, specialty }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const [relatedDoc, setRelatedDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && specialty) {
      const doctorsData = doctors.filter(
        (doc) => doc.specialty === specialty && doc._id !== docId
      );
      setRelatedDoc(doctorsData);
    }
  }, [doctors, docId, specialty]);

  return (
    <motion.div
      variants={fadeIn("down", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
      className="flex flex-col gap-4 my-16 text-gray-900"
    >
      <h1 className="text-3xl font-medium">Related Doctors</h1>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relatedDoc.slice(0, 5).map((doctor) => (
          <DoctorCard doctor={doctor} />
        ))}
      </div>
    </motion.div>
  );
};
export default RelatedDoctors;
