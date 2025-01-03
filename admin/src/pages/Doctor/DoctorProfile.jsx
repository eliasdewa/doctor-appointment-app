import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { currencySymbol } = useContext(AppContext);
  const {
    backendUrl,
    doctorToken,
    doctorProfileData,
    setDoctorProfileData,
    getDoctorProfile,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (doctorToken) {
      getDoctorProfile();
    }
  }, [doctorToken]);

  const [isEdit, setIsEdit] = useState(false);
  const updateDoctorProfile = async () => {
    try {
      const updateData = {
        address: doctorProfileData.address,
        fees: doctorProfileData.fees,
        available: doctorProfileData.available
      }

      await axios
        .post(`${backendUrl}/doctor/update-profile`, updateData, {
          headers: {
            Authorization: `Bearer ${doctorToken}`,
          },
        })
        .then((response) => {
          toast.success(response.data.message);
          getDoctorProfile();
          setIsEdit(false);
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
  if (!doctorProfileData) return null;
  return (
    <div>
      <div className="flex flex-col gap-4 m-5">
        <div>
          <img
            src={doctorProfileData.image}
            alt=""
            className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
          />
        </div>
        <div className="flex-1 border border-stone-100 rounded-lg px-8 py-7 bg-white">
          {/* Doctor Info */}
          <h2 className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {doctorProfileData.name}
          </h2>
          <div className="flex flex-col items-start gap-2 mt-1 text-gray-600">
            <p>
              {doctorProfileData.degree} - {doctorProfileData.specialty} -{" "}
              {doctorProfileData.experience}
            </p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
              About:
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">
              {doctorProfileData.about}
            </p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
              Address:
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">
              {isEdit ? (
                <input
                  type="text"
                  onChange={(e) =>
                    setDoctorProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={doctorProfileData.address.line1}
                  className="bg-gray-100 max-w-52 px-2"
                />
              ) : (
                doctorProfileData.address.line1
              )}{" "}
              <br />{" "}
              {isEdit ? (
                <input
                  type="text"
                  onChange={(e) =>
                    setDoctorProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={doctorProfileData.address.line2}
                  className="bg-gray-100 max-w-52 px-2"
                />
              ) : (
                doctorProfileData.address.line2
              )}
            </p>
          </div>
          <div>
            <p className="text-gray-600 font-medium mt-4">Appointment Fee: </p>
            <p className="text-gray-800">
              {isEdit ? (
                <input
                  type="number"
                  onChange={(e) =>
                    setDoctorProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                  value={doctorProfileData.fees}
                  className="bg-gray-100 max-w-52 px-2"
                />
              ) : (
                doctorProfileData.fees
              )}{" "}
              {currencySymbol}
            </p>
          </div>

          <div className="flex gap-1 pt-2">
            <input
              onChange={() =>
                isEdit &&
                setDoctorProfileData((prev) => ({
                  ...prev,
                  available: !prev.available,
                }))
              }
              checked={doctorProfileData.available}
              type="checkbox"
            />
            <label htmlFor="">Available</label>
          </div>
          {isEdit ? (
            <button
              onClick={updateDoctorProfile}
              className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default DoctorProfile;
