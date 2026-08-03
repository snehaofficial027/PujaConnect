import pujas from "../data/pujas";
import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";

const PopularPujas = ({ onBookClick = () => {} }) => {
  return (
    <section
      id="popular-pujas"
      className="w-full bg-gray-50/50 py-20 flex justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">

        {/* Heading */}
        <div className="w-full flex flex-col items-center justify-center text-center mb-16">

          <span className="inline-block text-orange-600 text-sm font-bold tracking-widest uppercase bg-orange-50 px-4 py-1.5 rounded-full">
            Most Booked
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900">
            Popular Pujas
          </h2>

          <p className="mt-4 text-gray-500 text-base md:text-lg max-w-2xl">
            Choose from our most booked spiritual services performed by experienced and verified pandits across India.
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {pujas.map((puja) => (

            <motion.div
              key={puja.id}
              whileHover={{ y: -6 }}
              transition={{
                duration: 0.25,
                ease: "easeInOut",
              }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
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

                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center text-orange-600 font-bold text-lg -z-10">
                  🕉️ {puja.name}
                </div>

              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">

                <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                  {puja.name}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <Clock size={15} className="text-gray-400" />
                  <span>Duration: {puja.duration}</span>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">

                  <span className="text-orange-600 text-xl font-black">
                    ₹{puja.price}
                  </span>

                  <span className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-xs font-bold">
                    <Star size={13} fill="currentColor" />
                    {puja.rating}
                  </span>

                </div>

                <div className="mt-5">

                  <button
                    onClick={() => onBookClick(puja)}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-xl font-semibold text-sm transition"
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