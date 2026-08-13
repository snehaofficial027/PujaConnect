import pujas from "../data/pujas";
import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";

const PopularPujas = ({ onBookClick = () => {} }) => {
  return (
   <section
  id="popular-pujas"
  className="w-full bg-gray-50/50 py-16 flex justify-center overflow-hidden"
>
  
     <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center min-w-0">
      
        {/* Heading */}
        <div className="w-full flex flex-col items-center justify-center text-center mb-12 max-w-2xl mx-auto">
          <span className="inline-block text-orange-600 text-xs font-bold tracking-widest uppercase bg-orange-50 px-4 py-1.5 rounded-full">
            Most Booked
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900">
            Popular Pujas
          </h2>
          <p className="mt-3 text-gray-500 text-sm sm:text-base">
            Choose from our most booked spiritual services performed by experienced and verified pandits across India.
          </p>
        </div>

        {/* 🎯 PERFECT CENTERED GRID */}
        <div className="w-full flex flex-wrap justify-center items-stretch gap-6">
          {pujas.map((puja) => (
            <motion.div
              key={puja.id}
              whileHover={{ y: -6 }}
              transition={{
                duration: 0.25,
                ease: "easeInOut",
              }}
              className="w-full sm:w-[calc(50%-16px)] md:w-[calc(33.33%-16px)] lg:w-[calc(25%-18px)] max-w-[290px] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                {puja.image ? (
                  <img
                    src={puja.image}
                    alt={puja.name}
                    className="w-full h-full object-cover transition duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : null}

                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-orange-600 font-bold text-base -z-10 px-2 text-center">
                  🕉️ {puja.name}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-800 line-clamp-1">
                    {puja.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                    <Clock size={14} className="text-gray-400" />
                    <span>Duration: {puja.duration}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-orange-600 text-xl font-black">
                      ₹{puja.price}
                    </span>
                    <span className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-xs font-bold">
                      <Star size={12} fill="currentColor" />
                      {puja.rating}
                    </span>
                  </div>

                  <button
                    onClick={() => onBookClick(puja)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-xl font-bold text-xs transition shadow-sm hover:shadow-md"
                  >
                    Book Now
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularPujas;