import { useState } from "react";
import {
  CalendarDays,
  MapPin,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";

const SearchBooking = ({ onSearchTrigger = () => {} }) => {
  const [cityInput, setCityInput] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    onSearchTrigger(cityInput.trim());

    const element =
      document.getElementById("featured-pandits");

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-gray-50/50 py-10 sm:py-12 md:py-16 flex justify-center items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 md:p-8 w-full max-w-6xl"
        >
          {/* Heading */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800">
              Find Your Perfect Puja
            </h2>

            <p className="text-gray-500 text-xs sm:text-sm mt-2 px-2">
              Search verified pandits for Home, Temple or Online Puja.
            </p>
          </div>

          {/* Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {/* City */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-gray-600">
                City
              </label>

              <div className="flex items-center border rounded-xl px-3 py-2.5 bg-gray-50 min-w-0">
                <MapPin
                  size={16}
                  className="text-orange-500 flex-shrink-0"
                />

                <input
                  type="text"
                  placeholder="Ahmedabad..."
                  value={cityInput}
                  onChange={(e) =>
                    setCityInput(e.target.value)
                  }
                  className="w-full min-w-0 ml-2 bg-transparent outline-none text-sm"
                />
              </div>
            </div>

            {/* Puja */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-gray-600">
                Puja
              </label>

              <select className="w-full border rounded-xl px-3 py-2.5 bg-gray-50 text-sm outline-none">
                <option>Ganesh Puja</option>
                <option>Satyanarayan Puja</option>
                <option>Griha Pravesh</option>
                <option>Rudrabhishek</option>
              </select>
            </div>

            {/* Date */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-gray-600">
                Date
              </label>

              <div className="flex items-center border rounded-xl px-3 py-2.5 bg-gray-50 min-w-0">
                <CalendarDays
                  size={16}
                  className="text-orange-500 flex-shrink-0"
                />

                <input
                  type="date"
                  className="w-full min-w-0 ml-2 bg-transparent outline-none text-sm"
                />
              </div>
            </div>

            {/* Puja Mode */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-gray-600">
                Puja Mode
              </label>

              <select className="w-full border rounded-xl px-3 py-2.5 bg-gray-50 text-sm outline-none">
                <option>🏠 Home Puja</option>
                <option>🛕 Temple Puja</option>
                <option>💻 Online Puja</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-3 font-semibold flex justify-center items-center gap-2 transition active:scale-[0.98]"
              >
                <Search size={16} />
                <span>Search Now</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default SearchBooking;