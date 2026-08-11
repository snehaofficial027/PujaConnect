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
      {/* ================= HERO ================= */}
      <Hero
        onBookClick={() =>
          onBookClick({
            name: "General Puja",
          })
        }
      />

      {/* ================= SEARCH ================= */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <SearchBooking onSearchTrigger={onSearchTrigger} />
        </div>
      </section>

      {/* ================= POPULAR PUJAS ================= */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <PopularPujas onBookClick={onBookClick} />
        </div>
      </section>

      {/* ================= FEATURED PANDITS ================= */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <FeaturedPandits
            pandits={pandits}
            onBookClick={onBookClick}
          />
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <WhyChooseUs />
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-12 sm:py-16 lg:py-24 bg-orange-50 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <Testimonials />
        </div>
      </section>

      {/* ================= ACHIEVEMENTS ================= */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <Achievements />
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <HowItWorks />
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <FAQ />
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <Footer />
    </>
  );
};

export default Home;