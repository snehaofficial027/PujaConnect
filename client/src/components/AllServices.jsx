import { useEffect, useState } from "react";
import API from "../config/api";

const AllServices = ({ onBookClick }) => {
  const [pujas, setPujas] = useState([]);

  const defaultPujas = [
    {
      _id: "1",
      name: "Satyanarayan Puja",
      price: "3100",
      description: "For peace, prosperity, and happiness in the family.",
      image: "images/pujas/satyanarayan.jpg" 
    },
    {
      _id: "2",
      name: "Maha Mrityunjaya Jaap",
      price: "5100",
      description: "For good health, longevity, and removal of obstacles.",
      image: "images/pujas/Mahamrityunjaya jaap.jpg" 
    },
    {
      _id: "3",
      name: "Rudrabhishek",
      price: "4100",
      description: "Sacred ritual offered to Lord Shiva for blessing and strength.",
      image: "images/pujas/Rudrabhishek.jpg" 
    },
    {
      _id: "4",
      name: "Ganesh Puja",
      price: "2100",
      description: "Performed before starting any new venture or auspicious event.",
      image: "images/pujas/Ganesh puja.jpg" 
    },
    {
      _id: "5",
      name: "Bhumi Puja",
      price: "4400",
      description: "Performed before starting any new venture or auspicious event.",
      image: "images/pujas/Bhumi Pujan.webp" 
    },
    {
      _id: "6",
      name: "Gaytrihawan Puja",
      price: "5500",
      description: "Performed before starting any new venture or auspicious event.",
      image: "images/pujas/Gaytri hawan puja.webp" 
    },
    {
      _id: "7",
      name: "grihapravesh",
      price: "4800",
      description: "Performed before starting any new venture or auspicious event.",
      image: "images/pujas/grihapravesh.jpg" 
    },
    {
      _id: "8",
      name: "Marriage Puja",
      price: "18000",
      description: "Performed before starting any new venture or auspicious event.",
      image: "images/pujas/Marriage Puja.jpg" 
    },
    {
      _id: "9",
      name: "mundan puja",
      price: "3800",
      description: "Performed before starting any new venture or auspicious event.",
      image: "images/pujas/mundan puja.jpeg" 
    },
    {
      _id: "10",
      name: "Navratri Puja",
      price: "4400",
      description: "Performed before starting any new venture or auspicious event.",
      image: "images/pujas/Navratri puja.avif" 
    },
    {
      _id: "11",
      name: "pitru dhoshPuja",
      price: "4400",
      description: "Performed before starting any new venture or auspicious event.",
      image: "images/pujas/pitru doshpuja.webp" 
    },
    {
      _id: "12",
      name: "Vastu Shanti Puja",
      price: "4400",
      description: "Performed before starting any new venture or auspicious event.",
      image: "images/pujas/Vastu shantipuja.jpg" 
    },
  ];

 useEffect(() => {
  API.get("/api/pujas")
    .then((res) => {
      if (res.data && res.data.length > 0) {
        setPujas(res.data);
      } else {
        setPujas(defaultPujas);
      }
    })
    .catch(() => setPujas(defaultPujas));
}, []);

  return (
    <div className="py-12 w-full mx-auto animate-in fade-in duration-300">
      {/* પેજ હેડિંગ */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">All Puja Services</h2>
        <p className="text-gray-500 text-sm mt-2">Book from our complete range of customized Vedic pujas.</p>
      </div>

      {/* ⚡ ૧૦૦% પર્ફેક્ટ સેન્ટર લોજિક: flex, justify-center અને દરેક સ્ક્રીન સાઇઝ પ્રમાણે કેલ્ક્યુલેટેડ વિડ્થ */}
      <div className="flex flex-wrap justify-center items-stretch gap-6 w-full mx-auto">
        {pujas.map((puja) => (
          <div 
            key={puja._id} 
            className="w-full sm:w-[calc(50%-16px)] md:w-[calc(33.33%-16px)] lg:w-[calc(25%-18px)] max-w-[300px] bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group"
          >
            {/* પૂજા ઇમેજ */}
            <div className="overflow-hidden h-48 w-full bg-gray-50">
              <img
  src={
    puja.image?.startsWith("http")
      ? puja.image
      : puja.image?.startsWith("/images")
      ? puja.image
      : `${API.defaults.baseURL}/${puja.image?.replace(/^\/?/, "")}`
  }
                />
            </div>
            
            {/* પૂજા ડિટેલ્સ */}
            <div className="p-5 flex-1 flex flex-col justify-between text-left">
              <div>
                <h3 className="font-bold text-gray-900 text-base mb-1 tracking-tight group-hover:text-orange-600 transition-colors">{puja.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">{puja.description}</p>
              </div>

              {/* કિંમત અને પ્રીમિયમ બટન */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                <span className="text-orange-600 font-black text-base tracking-tight">₹{puja.price}</span>
                <button 
                  onClick={() => onBookClick(puja)} 
                  className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all duration-150 active:scale-95 shadow-sm"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllServices;