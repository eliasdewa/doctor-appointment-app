import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { userData, setUserData, token, backendUrl, getUserProfile } =
    useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dateOfBirth", userData.dateOfBirth);

      if (image) formData.append("image", image);

      await axios
        .post(`${backendUrl}/user/update-profile`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.success(response.data.message);
          getUserProfile();
          setIsEditing(false);
          setImage(false);
          // setUserData(response.data);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error.response.data.message);
        });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">My Profile</h1>
      <div className="bg-white p-8 rounded-lg shadow-md mx-auto border">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
          {/* Image Field */}
          <div>
            {isEditing ? (
              <label htmlFor="image" className="block mt-4">
                <div className="inline-block relative cursor-pointer">
                  <img
                    className="w-36 rounded opacity-75"
                    src={image ? URL.createObjectURL(image) : userData.image}
                    alt=""
                  />
                  <img
                    className="w-10 absolute bottom-12 right-12"
                    src={image ? "" : assets.upload_icon}
                    alt=""
                  />
                </div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
            ) : (
              <img src={userData.image} alt="" className="w-36 rounded" />
            )}
          </div>
          {/* Basic Info */}
          <div className="flex-2">
            {/* Name Field */}
            <div className="flex items-center gap-2 mb-3 px-4 py-2">
              <label className="text-gray-700 font-bold">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-600">{userData.name}</p>
              )}
            </div>
            {/* Email Field */}
            <div className="flex items-center gap-2 mb-3 px-4 py-2">
              <label className="text-gray-700 font-bold">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-600">{userData.email}</p>
              )}
            </div>
            {/* Phone Field */}
            <div className="flex items-center gap-2 mb-3 px-4 py-2">
              <label className="text-gray-700 font-bold">
                Phone
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-600">{userData.phone}</p>
              )}
            </div>
            {/* Gender Field */}
            <div className="flex items-center gap-2 mb-3 px-4 py-2">
              <label className="text-gray-700 font-bold">
                Gender
              </label>
              {isEditing ? (
                <select
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-gray-400">{userData.gender}</p>
              )}
            </div>
          </div>
          {/* Address */}
          <div className="flex-1">
            {/* Address Field */}
            <div className="flex items-center gap-2 mb-3 px-4 py-2">
              <label className="text-gray-700 font-bold">
                Address
              </label>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                  />
             
                  <input
                    type="text"
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                  />
                </>
              ) : (
                <p className="text-gray-600">
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              )}
            </div>
            {/* Date of Birth Field */}
            <div className="flex items-center gap-2 mb-3 px-4 py-2">
              <label className="text-gray-700 font-bold">
                Date of Birth
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={userData.dateOfBirth}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      dateOfBirth: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-400">{userData.dateOfBirth}</p>
              )}
            </div>
          </div>
        </div>
        {/* Edit/Save Button */}
        <div className="flex justify-center my-6">
          {isEditing ? (
            <button
              onClick={updateUserProfileData}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
