import { useEffect, useState } from "react";
import API from "../config/api";
import { Star, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "./TempNavbar";
import PanditSearchBar from "./PanditSearchBar";

const AllPandits = ({ onBookClick }) => {

  const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user"));

  const [pandits, setPandits] = useState([]);
  const [selectedCity, setSelectedCity] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy Data (Only if API fails)
  const defaultPandits = [
    {
      _id: "1",
      name: "Acharya Ramesh Joshi",
      experience: "15",
      rating: "4.9",
      reviews: "230",
      city: "Ahmedabad",
      online: true,
      image:
        "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?w=500",
    },
    {
      _id: "2",
      name: "Pandit Harish Vyas",
      experience: "10",
      rating: "4.8",
      reviews: "145",
      city: "Vadodara",
      online: true,
      image:
        "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=500",
    },
    {
      _id: "3",
      name: "Shastri Mukund Pandya",
      experience: "20",
      rating: "5.0",
      reviews: "180",
      city: "Surat",
      online: true,
      image:
        "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?w=500",
    },
    {
      _id: "4",
      name: "Rajesh Sharma",
      experience: "10",
      rating: "4.8",
      reviews: "95",
      city: "Vadodara",
      online: true,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500",
    },
  ];

  useEffect(() => {
  API.get("/api/pandits")
    .then((res) => {
      console.table(
  res.data.map((p) => ({
    name: p.name,
    image: p.image,
  }))
);

      if (res.data.length > 0) {
        setPandits(res.data);
      } else {
        setPandits(defaultPandits);
      }
    })
    .catch((err) => {
      console.log(err);
      setPandits(defaultPandits);
    });
}, []);

  // Dynamic Cities
  const cities = [
    "All",
    ...new Set(
      pandits
        .filter((p) => p.city)
        .map((p) => p.city)
    ),
  ];

  // Filter
  const filteredPandits = pandits.filter((pandit) => {

    const cityMatch =
      selectedCity === "All" ||
      pandit.city === selectedCity;

    const searchMatch =
      pandit.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return cityMatch && searchMatch;

  });
  return (
  <div className="min-h-screen bg-gray-50/50 w-full flex flex-col items-center">

    {/* Navbar */}
    <Navbar
  user={user}
  onLogout={() => {
    localStorage.removeItem("user");
    navigate("/");
  }}
  onLoginClick={() => navigate("/login")}
/>

    {/* Main */}
    <div className="pt-28 pb-16 px-4 w-full max-w-7xl mx-auto flex flex-col items-center">

      {/* Search */}
      <PanditSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-gray-900">
          Our Expert Pandits
        </h2>

        <p className="text-gray-500 mt-2">
          Find and book highly learned Vedic scholars near you.
        </p>
      </div>

      {/* City Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">

        {cities.map((city) => (

          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
              selectedCity === city
                ? "bg-orange-600 text-white shadow"
                : "bg-white border border-gray-300 hover:border-orange-500 hover:text-orange-600"
            }`}
          >
            {city}
          </button>

        ))}

      </div>

      {/* Pandits Grid */}
      <div className="w-full flex flex-wrap justify-center gap-6">

       {filteredPandits.length > 0 ? (

  filteredPandits.map((pandit) => {

console.log(
  "Name:",
  pandit.name,
  "Image:",
  pandit.image,
  "URL:",
  `${API.defaults.baseURL}/${pandit.image.replace(/^\/?/, "")}`
);

    return (
  <div
    key={pandit._id}
    className="w-full sm:w-[calc(50%-16px)] md:w-[calc(33.33%-18px)] lg:w-[calc(25%-18px)] max-w-[280px] bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col group"
  >

    {/* Image */}
   <div className="relative h-64 overflow-hidden bg-gray-100">

 <img
  src={`${API.defaults.baseURL}/${pandit.image.replace(/^\/?/, "")}`}
  alt={pandit.name}
  className="w-full h-full object-cover object-top"
/>

  <span className="absolute top-3 left-3 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
    ✓ Verified
  </span>

  <span
    className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full ${
      pandit.online
        ? "bg-emerald-500 text-white"
        : "bg-red-500 text-white"
    }`}
  >
    {pandit.online ? "🟢 Available" : "🔴 Unavailable"}
  </span>

</div>

    {/* Content */}
    <div className="p-5 flex flex-col flex-1">

      <h3 className="text-base font-bold">
        {pandit.name}
      </h3>

      <div className="flex justify-between items-center mt-2">

        <span className="bg-orange-50 text-orange-600 text-[11px] px-2 py-1 rounded-full">
          {pandit.experience} Years Exp
        </span>

        <div className="flex items-center gap-1 text-amber-500">
          <Star size={14} fill="currentColor" />
          {pandit.rating}
        </div>

      </div>

      <div className="mt-3 text-sm text-gray-500">

        <p className="flex items-center gap-1">
          <MapPin size={14} />
          {pandit.city}
        </p>

        <p className="mt-1">
          Reviews : {pandit.reviews}
        </p>

      </div>

      <div className="mt-auto pt-4 space-y-2">

        <Link
  to={`/pandits/${pandit._id}`}
  state={{
    panditData: {
      ...pandit,
     image: pandit.image
  ? pandit.image.startsWith("http")
    ? pandit.image
    : `${API.defaults.baseURL}/${pandit.image.replace(/^\/?/, "")}`
  : "/images/pandits/pandit1.jpg",
    },
  }}
  className="block w-full text-center border border-orange-600 text-orange-600 py-2 rounded-xl font-bold hover:bg-orange-50"
>
  View Profile
</Link>

        <button
          onClick={() =>
            onBookClick &&
            onBookClick({
              _id: pandit._id,
              name: pandit.name,
              city: pandit.city,
              experience: pandit.experience,
              rating: pandit.rating,
              image: pandit.image,
              price: pandit.price || 2500,
            })
          }
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-xl font-bold"
        >
          Book Pandit
        </button>

      </div>

    </div>

  </div>
);
    })
  ) : (
    <div className="bg-white rounded-3xl border border-gray-200 py-12 px-8 text-center shadow-sm w-full max-w-md">
      <h3 className="text-lg font-bold text-gray-700">
        No Pandits Found
      </h3>

      <p className="text-sm text-gray-500 mt-2">
        Try changing your search or city filter.
      </p>
    </div>
  )}
</div>

    </div>
  </div>
);

};

export default AllPandits;