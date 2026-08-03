import { useEffect, useState } from "react";
import API from "../config/api";

import Hero from "../components/Hero";
import SearchBooking from "../components/SearchBooking";
import PopularPujas from "../components/PopularPujas";
import FeaturedPandits from "../components/FeaturedPandits";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import Achievements from "../components/Achievements";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

const Home = ({ onBookClick, searchCity, onSearchTrigger }) => {
  const [pandits, setPandits] = useState([]);

 useEffect(() => {
  API.get("/api/pandits")
    .then((res) => {
      // Home page પર માત્ર પહેલા 4 pandits બતાવ
      setPandits(res.data.slice(0, 4));
    })
    .catch((err) => {
      console.log("Error fetching pandits:", err);
    });
}, []);

  return (
    <>
      <Hero
        onBookClick={() =>
          onBookClick({
            name: "General Puja",
          })
        }
      />

      <div className="py-24">
        <SearchBooking onSearchTrigger={onSearchTrigger} />
      </div>

      <div className="py-24">
        <PopularPujas onBookClick={onBookClick} />
      </div>

      <div className="py-24 bg-gray-50">
        <FeaturedPandits
pandits={pandits}
onBookClick={onBookClick}
/>
      </div>

      <div className="py-24">
        <WhyChooseUs />
      </div>

      <div className="py-24 bg-orange-50">
        <Testimonials />
      </div>

      <div className="py-24">
        <Achievements />
      </div>

      <div className="py-24">
        <HowItWorks />
      </div>

      <div className="py-24">
        <FAQ />
      </div>

      <Footer />
    </>
  );
};

export default Home;