import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, BookOpen, Home } from "lucide-react";

const SearchBooking = ({ onSearchTrigger }) => {
  const navigate = useNavigate();

  // 🎯 સ્ટેટને બાય-ડિફોલ્ટ ખાલી રાખવામાં આવી છે
  const [city, setCity] = useState("");
  const [puja, setPuja] = useState("");
  const [date, setDate] = useState("");
  const [pujaMode, setPujaMode] = useState("Home Puja");

  const handleSearch = (e) => {
    e.preventDefault();

    const searchParams = { city, puja, date, pujaMode };

    if (onSearchTrigger) {
      onSearchTrigger(searchParams);
    }

    navigate("/pandits", {
      state: { searchParams },
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 -mt-16 sm:-mt-20 relative z-20">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 backdrop-blur-md">
        
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Find Your Perfect Puja
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Search verified pandits for Home, Temple or Online Puja.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          
          {/* City */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1">
              <MapPin size={14} className="text-orange-500" /> City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Ahmedabad, Vadodara"
              className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-orange-500 font-medium placeholder-gray-400"
            />
          </div>

          {/* Puja */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1">
              <BookOpen size={14} className="text-orange-500" /> Puja
            </label>
            <select
              value={puja}
              onChange={(e) => setPuja(e.target.value)}
              className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-orange-500 font-medium text-gray-700"
            >
              <option value="">Select Puja...</option>
              <option value="Ganesh Puja">Ganesh Puja</option>
              <option value="Satyanarayan Puja">Satyanarayan Puja</option>
              <option value="Maha Mrityunjaya Jaap">Maha Mrityunjaya Jaap</option>
              <option value="Rudrabhishek">Rudrabhishek</option>
              <option value="Griha Pravesh">Griha Pravesh</option>
              <option value="Vastu Shanti">Vastu Shanti</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Calendar size={14} className="text-orange-500" /> Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-orange-500 font-medium text-gray-700"
            />
          </div>

          {/* Puja Mode */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Home size={14} className="text-orange-500" /> Puja Mode
            </label>
            <select
              value={pujaMode}
              onChange={(e) => setPujaMode(e.target.value)}
              className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-orange-500 font-medium text-gray-700"
            >
              <option value="Home Puja">Home Puja</option>
              <option value="Temple Puja">Temple Puja</option>
              <option value="Online Puja">Online Puja</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="lg:col-span-4 mt-2">
            <button
              type="submit"
              className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Search size={18} /> Search Now
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default SearchBooking;