import { specialtyData } from "../assets/assets"
import { Link } from "react-router-dom"
const Specialty = () => {
  return (
    <div id="specialty" className=" flex flex-col items-center gap-4 py-16 text-gray-800">
      <h1 className="text-3xl font-medium">Find by Specialty</h1>
      <p className="sm:w-1/3 text-center text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur voluptas animi quas? Aliquid veniam repudiandae quia blanditiis nam quo in.</p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {
          specialtyData.map((item, index) => (
            <Link className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500" key={index} to={`/doctors/${item.specialty}`} onClick={() => scrollTo(0,0)}>
              <img className="w-16 sm:w-24 mb-2" src={item.image} alt="" />
              <p>{item.specialty}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}
export default Specialty