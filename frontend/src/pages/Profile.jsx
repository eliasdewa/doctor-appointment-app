import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { userData, setUserData, token, backendUrl, getUserProfile } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

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
          setIsEdit(false);
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
    userData && (
      <div className="mt-6 max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-20 xl:px-24 flex flex-col gap-2 text-sm">
        {isEdit ? (
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

        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="bg-gray-50 text-3xl font-medium max-w-60 mt-4 px-2"
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userData.name}
          </p>
        )}
        <hr className="bg-zinc-400 h-[1px] border-none" />
        <div>
          <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            <p className="font-medium">Email:</p>
            <p className="text-blue-500">{userData.email}</p>
            <p className="font-medium">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="bg-gray-100 max-w-52 px-2"
              />
            ) : (
              <p className="text-blue-500">{userData.phone}</p>
            )}
            <p className="font-medium">Address:</p>
            {isEdit ? (
              <p>
                <input
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  className="bg-gray-100 max-w-52 px-2"
                />
                <br />
                <input
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  className="bg-gray-100 max-w-52 px-2"
                />
              </p>
            ) : (
              <p className="text-gray-500">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>
        <div>
          <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
            {/* gender */}
            <p className="font-medium">Gender:</p>
            {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="bg-gray-100 max-w-52 px-2"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData.gender}</p>
            )}
            {/* date of birth */}
            <p className="font-medium">Date of Birth:</p>
            {isEdit ? (
              <input
                type="date"
                value={userData.dateOfBirth}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    dateOfBirth: e.target.value,
                  }))
                }
                className="bg-gray-100 max-w-52 px-2"
              />
            ) : (
              <p className="text-gray-400">{userData.dateOfBirth}</p>
            )}
          </div>
        </div>
        {/* edit and save btn */}
        <div className="mt-10">
          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
            >
              Save Information
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};
export default Profile;
