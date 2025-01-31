import Banner from "../components/Banner";
import Header from "../components/Header";
import Specialty from "../components/Specialty";
import Testimonials from "../components/Testimonials";
import TopDoctors from "../components/TopDoctors";

const Home = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-8">
      <Header />
      <Specialty />
      <TopDoctors />
      <Banner />
      <Testimonials />
    </div>
  );
};
export default Home;
