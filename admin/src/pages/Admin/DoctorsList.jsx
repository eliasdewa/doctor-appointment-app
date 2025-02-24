import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, adminToken, getAllDoctors, changeDoctorAvailability } = useContext(AdminContext);
  useEffect(() => {
    if (adminToken) {
      getAllDoctors();
    }
  }, [adminToken]);
  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors?.map((item, index) => (
          <div
            key={index}
            className="border border-blue-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
          >
            <img src={item.image} alt="" className="bg-blue-50 group-hover:bg-primary transition-all duration-500" />
            <div className="p-4">
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.specialty}</p>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <input onChange={() => changeDoctorAvailability(item._id)} type="checkbox" checked={item.available} />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DoctorsList;
