const PanditSearchBar = ({
  searchTerm,
  setSearchTerm,
  selectedCity,
  setSelectedCity,
}) => {
  const cities = [
    "All",
    "Ahmedabad",
    "Baroda",
    "Surat",
    "Mumbai",
    "Delhi",
  ];

  return (
    <div className="max-w-4xl mx-auto mb-10 px-4">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-8 text-center">

        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
          Find Your Perfect Pandit
        </h2>

        <p className="text-gray-500 mt-2 mb-6 text-sm sm:text-base">
          Search experienced and verified pandits near you.
        </p>

        {/* Centered Search Bar Section */}
        <div className="flex flex-col sm:flex-row items-center gap-3 max-w-2xl mx-auto">

          {/* Search Input Box (Without Icon) */}
          <div className="w-full flex-1">
            <input
              type="text"
              placeholder="Search Pandit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>

          {/* City Dropdown */}
          <div className="w-full sm:w-40">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full h-12 bg-gray-50 border border-gray-200 rounded-xl px-3 text-sm text-gray-700 font-medium focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button className="w-full sm:w-32 h-12 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md hover:shadow-orange-200 transition-all active:scale-95">
            Search
          </button>

        </div>
      </div>
    </div>
  );
};

export default PanditSearchBar;