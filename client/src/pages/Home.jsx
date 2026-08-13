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
    <div className="w-full min-h-screen overflow-x-hidden flex flex-col items-center justify-center bg-white">
      
      {/* ================= HERO ================= */}
      <div className="w-full">
        <Hero
          onBookClick={() =>
            onBookClick({
              name: "General Puja",
            })
          }
        />
      </div>

      {/* ================= SEARCH ================= */}
      <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-7xl mx-auto flex justify-center">
          <SearchBooking onSearchTrigger={onSearchTrigger} />
        </div>
      </section>

      {/* ================= POPULAR PUJAS ================= */}
      <section className="w-full py-12 sm:py-16 lg:py-20 bg-gray-50/50 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-7xl mx-auto flex justify-center">
          <PopularPujas onBookClick={onBookClick} />
        </div>
      </section>

      {/* ================= FEATURED PANDITS ================= */}
      <section className="w-full py-12 sm:py-16 lg:py-20 bg-white px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-7xl mx-auto flex justify-center">
          <FeaturedPandits
            pandits={pandits}
            onBookClick={onBookClick}
          />
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="w-full py-12 sm:py-16 lg:py-20 bg-gray-50/50 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-7xl mx-auto flex justify-center">
          <WhyChooseUs />
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="w-full py-12 sm:py-16 lg:py-20 bg-orange-50/60 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-7xl mx-auto flex justify-center">
          <Testimonials />
        </div>
      </section>

      {/* ================= ACHIEVEMENTS ================= */}
      <section className="w-full py-12 sm:py-16 lg:py-20 bg-white px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-7xl mx-auto flex justify-center">
          <Achievements />
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="w-full py-12 sm:py-16 lg:py-20 bg-gray-50/50 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-7xl mx-auto flex justify-center">
          <HowItWorks />
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="w-full py-12 sm:py-16 lg:py-20 bg-white px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-7xl mx-auto flex justify-center">
          <FAQ />
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <div className="w-full">
        <Footer />
      </div>

    </div>
  );
};

export default Home;