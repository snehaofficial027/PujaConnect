import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../config/api";

const AllServices = ({ onBookClick }) => {
  const [pujas, setPujas] = useState([]);

  const defaultPujas = [
    {
      _id: "1",
      name: "Satyanarayan Puja",
      price: "3100",
      description: "For peace, prosperity, and happiness in the family.",
      image: "/images/pujas/satyanarayan.jpg",
    },
    {
      _id: "2",
      name: "Maha Mrityunjaya Jaap",
      price: "5100",
      description: "For good health, longevity, and removal of obstacles.",
      image: "/images/pujas/Mahamrityunjaya jaap.jpg",
    },
    {
      _id: "3",
      name: "Rudrabhishek",
      price: "4100",
      description: "Sacred ritual offered to Lord Shiva for blessing and strength.",
      image: "/images/pujas/Rudrabhishek.jpg",
    },
    {
      _id: "4",
      name: "Ganesh Puja",
      price: "2100",
      description: "Performed before starting any new venture or auspicious event.",
      image: "/images/pujas/Ganesh puja.jpg",
    },
    {
      _id: "5",
      name: "Bhumi Puja",
      price: "4400",
      description: "Performed before starting any new venture or auspicious event.",
      image: "/images/pujas/Bhumi Pujan.webp",
    },
    {
      _id: "6",
      name: "Gaytrihawan Puja",
      price: "5500",
      description: "Performed before starting any new venture or auspicious event.",
      image: "/images/pujas/Gaytri hawan puja.webp",
    },
    {
      _id: "7",
      name: "grihapravesh",
      price: "4800",
      description: "Performed before starting any new venture or auspicious event.",
      image: "/images/pujas/grihapravesh.jpg",
    },
    {
      _id: "8",
      name: "Marriage Puja",
      price: "18000",
      description: "Performed before starting any new venture or auspicious event.",
      image: "/images/pujas/Marriage Puja.jpg",
    },
    {
      _id: "9",
      name: "mundan puja",
      price: "3800",
      description: "Performed before starting any new venture or auspicious event.",
      image: "/images/pujas/mundan puja.jpeg",
    },
    {
      _id: "10",
      name: "Navratri Puja",
      price: "4400",
      description: "Performed before starting any new venture or auspicious event.",
      image: "/images/pujas/Navratri puja.avif",
    },
    {
      _id: "11",
      name: "pitru dhoshPuja",
      price: "4400",
      description: "Performed before starting any new venture or auspicious event.",
      image: "/images/pujas/pitru doshpuja.webp",
    },
    {
      _id: "12",
      name: "Vastu Shanti Puja",
      price: "4400",
      description: "Performed before starting any new venture or auspicious event.",
      image: "/images/pujas/Vastu shantipuja.jpg",
    },
  ];

  // 🎯 Image URL Resolver
  const getImgSrc = (img) => {
    if (!img) return "/images/pujas/satyanarayan.jpg";

    // Cloudinary / External
    if (img.startsWith("http://") || img.startsWith("https://")) {
      return img;
    }

    // Frontend Static Images
    if (img.startsWith("/images") || img.startsWith("images")) {
      return img.startsWith("/") ? img : `/${img}`;
    }

    // Backend Uploads (/uploads/pujas/...)
    const baseURL = API.defaults?.baseURL || "http://localhost:5000";
    const cleanPath = img.replace(/^\/?/, "");
    return `${baseURL}/${cleanPath}`;
  };

  useEffect(() => {
    API.get("/api/pujas")
      .then((res) => {
        const apiPujas = Array.isArray(res.data) ? res.data : [];

        // DB ની પૂજાઓ આગળ રહેશે
        const combined = [...apiPujas, ...defaultPujas];

        // Unique removal: DB ની પૂજા પહેલાં આવી ગઈ હોવાથી એ જ રહેશે
        const uniquePujas = [];
        const seenNames = new Set();

        for (const p of combined) {
          const normName = p.name?.trim().toLowerCase();
          if (!seenNames.has(normName)) {
            seenNames.add(normName);
            uniquePujas.push(p);
          }
        }

        setPujas(uniquePujas);
      })
      .catch((err) => {
        console.error("Puja API Error:", err);
        setPujas(defaultPujas);
      });
  }, []);

  return (
    <div className="py-12 w-full mx-auto animate-in fade-in duration-300">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
          All Puja Services
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Book from our complete range of customized Vedic pujas.
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-stretch gap-6 w-full mx-auto">
        {pujas.map((puja) => {
          const imageSrc = getImgSrc(puja.image);

          return (
            <div
              key={puja._id || puja.name}
              className="w-full sm:w-[calc(50%-16px)] md:w-[calc(33.33%-16px)] lg:w-[calc(25%-18px)] max-w-[300px] bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group"
            >
              <div className="overflow-hidden h-48 w-full bg-gray-100 flex items-center justify-center relative">
                <img
                  src={imageSrc}
                  alt={puja.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // ફક્ત ઈમેજ લોડ ન થાય ત્યારે જ ડિફોલ્ટ સેટ કરશે
                    if (!e.target.src.includes("satyanarayan.jpg")) {
                      e.target.src = "/images/pujas/satyanarayan.jpg";
                    }
                  }}
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between text-left">
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-1 tracking-tight group-hover:text-orange-600 transition-colors line-clamp-1">
                    {puja.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                    {puja.description}
                  </p>
                </div>

                <div className="mt-auto pt-2">
                  <div className="flex items-center gap-2 w-full">
                    <Link
                      to={`/services/${puja._id}`}
                      state={{ pujaData: puja }}
                      className="flex-1 border border-orange-600 text-orange-600 py-2.5 rounded-xl font-bold text-xs text-center hover:bg-orange-50 transition"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() => onBookClick && onBookClick(puja)}
                      className="flex-1 px-2 py-2.5 rounded-xl text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 shadow-sm hover:shadow-md transition-all whitespace-nowrap text-center flex items-center justify-center"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllServices;