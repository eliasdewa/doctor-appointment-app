import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
const AddDoctor = () => {
  const { adminToken } = useContext(AdminContext);
  const { backendUrl } = useContext(AppContext);

  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("");
  const [gender, setGender] = useState("");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [degree, setDegree] = useState("");
  const [address, setAddress] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Add doctor to the database
    try {
      if (!docImg) {
        return toast.error("Please select a doctor image");
      }
      const formData = new FormData();
      // Append form data to the request
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("gender", gender);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("specialty", specialty);
      formData.append("degree", degree);
      formData.append("address", address);
      // to console log formData;
      // formData.forEach((value, key) => {
      //   console.log(`${key} : ${value}`);
      // });
      // Send request to the server with the form data
      await axios
        .post(`${backendUrl}/admin/add-doctor`, formData, {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        })
        .then((response) => {
          toast.success(response.data.message);
          setName("");
          setEmail("");
          setPassword("");
          setExperience("");
          setGender("");
          setFees("");
          setAbout("");
          setSpecialty("");
          setDegree("");
          setAddress("");
          setDocImg(false);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white p-8 border rounded w-full max-w-6xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          {/* Left side */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            {/* name */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            {/* email */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            {/* password */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            {/* experience */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded px-3 py-2"
              >
                <option value="">Select Experience</option>
                <option value="1 year">1 year</option>
                <option value="2 years">2 years</option>
                <option value="3 years">3 years</option>
                <option value="4 years">4 years</option>
                <option value="5 years">5 years</option>
                <option value="6 years">6 years</option>
                <option value="7 years">7 years</option>
                <option value="8 years">8 years</option>
                <option value="9 years">9 years</option>
                <option value="10 years">10 years</option>
              </select>
            </div>
            {/* Gender */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Gender</p>
              <select
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                className="border rounded px-3 py-2"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* fees */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Fees"
                required
              />
            </div>
          </div>
          {/* Right side */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            {/* specialization */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Specialization</p>
              <select
                onChange={(e) => setSpecialty(e.target.value)}
                value={specialty}
                className="border rounded px-3 py-2"
              >
                <option value="">Select Specialization</option>
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Pediatricians</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            {/* education */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Education"
                required
              />
            </div>
            {/* address */}
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full border rounded px-4 pt-2"
            placeholder="Write something about doctor"
            rows={5}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full cursor-pointer"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};
export default AddDoctor;
