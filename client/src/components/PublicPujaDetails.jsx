import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, IndianRupee, CheckCircle } from "lucide-react";

const PublicPujaDetails = ({ onBookClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const puja = location.state?.pujaData;

  if (!puja) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Service Not Found
      </div>
    );
  }

  const benefits = [
    "Brings peace and prosperity",
    "Removes negative energy",
    "Blessings for family happiness",
    "Spiritual growth and positivity",
  ];

  const samagri = [
    "Kalash",
    "Flowers",
    "Coconut",
    "Kumkum",
    "Rice",
    "Incense Sticks",
    "Ghee Lamp",
    "Fruits",
  ];

  const process = [
    "Ganesh Vandana",
    "Sankalp",
    "Main Puja",
    "Mantra Chanting",
    "Aarti",
    "Prasad Distribution",
  ];

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="max-w-7xl mx-auto px-5 py-10">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-orange-600 font-bold mb-8"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden grid lg:grid-cols-2 gap-10 p-8">

          <div>
            <img
              src={puja.image}
              alt={puja.name}
              className="w-full h-[420px] object-cover rounded-2xl"
            />
          </div>

          <div>

            <h1 className="text-4xl font-black text-gray-900">
              {puja.name}
            </h1>

            <p className="text-gray-600 mt-5 leading-7">
              {puja.description}
            </p>

            <div className="flex gap-6 mt-8">
              <div className="flex items-center gap-2">
                <IndianRupee size={20} />
                <span className="font-bold text-xl">
                  ₹{puja.price}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>2-3 Hours</span>
              </div>
            </div>
                        <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">
                Benefits
              </h2>

              <div className="grid sm:grid-cols-2 gap-3">
                {benefits.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-orange-50 p-3 rounded-xl"
                  >
                    <CheckCircle
                      size={18}
                      className="text-green-600"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">
                Required Samagri
              </h2>

              <div className="grid sm:grid-cols-2 gap-3">
                {samagri.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-xl px-4 py-3"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">
                Puja Process
              </h2>

              <div className="space-y-3">
                {process.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold">
                      {index + 1}
                    </div>

                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
                        <div className="mt-10">
              <button
                onClick={() => onBookClick && onBookClick(puja)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl text-lg font-bold transition"
              >
                Book This Puja
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default PublicPujaDetails;