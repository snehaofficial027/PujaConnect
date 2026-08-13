import React from "react";
import { Link } from "react-router-dom";
import {
  Star,
  MapPin,
  Briefcase,
  Languages,
} from "lucide-react";

// Local fallback images
const localImages = [
  "/images/pandits/pandit1.jpg",
  "/images/pandits/pandit2.png",
  "/images/pandits/pandit3.webp",
  "/images/pandits/pandit4.jpg",
];

const FeaturedPandits = ({ pandits = [], onBookClick }) => {
  const defaultPandits = [
    {
      _id: "1",
      name: "Pandit Harish Vyas",
      city: "Vadodara",
      experience: "10",
      languages: ["Gujarati", "Sanskrit"],
      rating: "4.8",
      price: "3100",
    },
    {
      _id: "2",
      name: "Shastri Mukund Pandya",
      city: "Surat",
      experience: "20",
      languages: ["Gujarati", "Hindi"],
      rating: "5.0",
      price: "8500",
    },
    {
      _id: "3",
      name: "Rajesh Sharma",
      city: "Vadodara",
      experience: "12",
      languages: ["Hindi", "Gujarati"],
      rating: "4.7",
      price: "3500",
    },
    {
      _id: "4",
      name: "Acharya Ramesh Joshi",
      city: "Ahmedabad",
      experience: "15",
      languages: ["Gujarati", "Hindi"],
      rating: "4.9",
      price: "5100",
    },
  ];

  const listToRender = pandits.length > 0 ? pandits : defaultPandits;

  return (
   <section className="py-16 bg-white w-full overflow-hidden">
      <div className="w-full max-w-11xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center min-w-0">

        {/* Heading */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="inline-block bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
            Expert Guruji
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-4">
            Featured Pandits
          </h2>
          <p className="text-gray-500 mt-3 text-sm sm:text-base">
            Experienced, Verified and Trusted Spiritual Guides.
          </p>
        </div>

        {/* 🎯 PERFECT CENTERED GRID */}
        <div className="w-full flex flex-wrap justify-center items-stretch gap-6">
          {listToRender.map((pandit, index) => {
            const imagePath = pandit.image
              ? pandit.image.startsWith("http")
                ? pandit.image
                : `${import.meta.env.VITE_API_URL}/${pandit.image.replace(/^\/+/, "")}`
              : localImages[index % localImages.length];

            return (
              <div
                key={pandit._id || pandit.id || index}
                className="w-full sm:w-[calc(50%-16px)] md:w-[calc(33.33%-16px)] lg:w-[calc(25%-18px)] max-w-[290px] bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden bg-gray-100">
                  <img
                    src={imagePath}
                    alt={pandit.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition duration-500"
                    onError={(e) => {
                      e.target.src = localImages[index % localImages.length];
                    }}
                  />
                  <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 shadow">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    Online
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-base text-gray-900 line-clamp-1">
                        {pandit.name}
                      </h3>
                      <div className="flex items-center gap-1 text-orange-500 font-bold text-sm">
                        <Star size={15} fill="currentColor" />
                        {pandit.rating || "4.8"}
                      </div>
                    </div>

                    <div className="mt-3 space-y-1.5 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-orange-500" />
                        <span>{pandit.city || pandit.location || "Vadodara"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase size={14} className="text-orange-500" />
                        <span>{pandit.experience || "10"} Years Experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Languages size={14} className="text-orange-500" />
                        <span className="truncate">
                          {Array.isArray(pandit.languages || pandit.language)
                            ? (pandit.languages || pandit.language).join(", ")
                            : pandit.languages || pandit.language || "Gujarati, Hindi"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                        Dakshina
                      </span>
                      <span className="text-xl font-black text-orange-600">
                        ₹{pandit.price || pandit.fees || "3100"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to={`/pandits/${pandit._id || pandit.id}`}
                        state={{
                          panditData: {
                            ...pandit,
                            image: imagePath,
                          },
                        }}
                        className="w-full py-2 text-center border border-orange-200 text-orange-600 rounded-xl font-bold text-xs hover:bg-orange-50 transition flex items-center justify-center"
                      >
                        View Profile
                      </Link>

                      <button
                        onClick={() =>
                          onBookClick &&
                          onBookClick({
                            ...pandit,
                            image: imagePath,
                          })
                        }
                        className="w-full py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition flex items-center justify-center"
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
    </section>
  );
};

export default FeaturedPandits;