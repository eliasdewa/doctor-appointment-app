import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";
import { fadeIn } from "../variant";
import { motion } from "framer-motion";
const Appointment = () => {
  // Get doctor ID from URL parameters
  const { docId } = useParams();
  // to navigate
  const navigate = useNavigate();
  // Fetch doctor data from API when the component mounts
  const { currencySymbol, token, doctors, getDoctorsData, backendUrl } =
    useContext(AppContext);
  // to store doctor data in state
  const [docInfo, setDocInfo] = useState(null);
  // get doctor data information
  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };
  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Get available slots and set them to state
  const getAvailableSlots = async () => {
    setDocSlots([]);
    // get current date
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      // get date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // set end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0, 0);

      // set hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getDate() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // To make inactive/remove the selected date and time
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "-" + month + "-" + year;
        const slotTime = formattedTime;

        // Check if the slot is already booked
        const isSlotAvailable =
          docInfo?.slots_booked[slotDate] &&
          docInfo?.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;
        // If slot is available, show it in the list
        if (isSlotAvailable) {
          // add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        // Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };
  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  // Book appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book an appointment");
      return navigate("/login");
    }
    try {
      // get the date
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "-" + month + "-" + year;
      // console.log(slotDate) // 26-12-2024
      await axios
        .post(
          `${backendUrl}/user/book-appointment`,
          {
            docId,
            slotDate,
            slotTime,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          toast.success(response.data.message);
          getDoctorsData();
          navigate("/my-appointments");
        })
        .catch((error) => {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="max-w-screen-2xl mx-auto px-8">
      {/* Doctor details */}
      <div className="flex flex-col sm:flex-row gap-4 mt-5">
        {/* Image */}
        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
        >
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={docInfo?.image}
            alt=""
          />
        </motion.div>
        <motion.div
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="flex-1 border border-gray-400 rounded-lg px-8 py-7 bg-white mx-2 sm:mx-0 mt-[80px] sm:mt-0"
        >
          {/* Doc Info: name, degree, experience */}
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo?.name}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo?.degree} - {docInfo?.specialty}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo?.experience}
            </button>
          </div>
          {/* Doctor about */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo?.about}
            </p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee:{" "}
            <span>
              {currencySymbol}
              {docInfo?.fees}
            </span>
          </p>
        </motion.div>
      </div>
      {/* Booking slots */}
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        className="mt-4 font-medium text-gray-700"
      >
        <p className="text-xl font-medium">Booking slots</p>
        <div className="flex gap-2 items-center w-full overflow-x-scroll mt-4">
          <p className="text-sm font-medium">Select Date:</p>
          {docSlots.length &&
            docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`text-center py-2 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? "bg-primary text-white"
                    : "border border-gray-200"
                }`}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>
        <div className="flex items-center gap-2 w-full overflow-x-scroll mt-4">
          <p className="text-sm font-medium">Select Time:</p>
          {docSlots.length &&
            docSlots[slotIndex].map((item, index) => (
              <p
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 text-center min-w-12 rounded-full cursor-pointer ${
                  item.time === slotTime
                    ? "bg-primary text-white"
                    : "border border-gray-200"
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>
        <button
          onClick={bookAppointment}
          className="bg-primary text-white text-sm font-light px-14 py-3 my-6 rounded-full"
        >
          Book an appointment
        </button>
      </motion.div>
      {/* List related doctors */}
      <RelatedDoctors docId={docId} specialty={docInfo?.specialty} />
    </div>
  );
};
export default Appointment;
