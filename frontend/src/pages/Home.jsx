import Banner from "../components/Banner";
import Header from "../components/Header";
import Specialty from "../components/Specialty";
import TopDoctors from "../components/TopDoctors";

const Home = () => {
  return (
    <div className="max-w-screen-2xl min-h-screen mx-auto px-6 md:px-10 lg:px-20 xl:px-24">
      <Header />
      <Specialty />
      <TopDoctors />
      <Banner />
    </div>
  );
};
export default Home;
