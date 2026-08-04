import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import API from "../config/api";
import {
  Star,
  MapPin,
  Briefcase,
  Languages,
  ArrowLeft,
} from "lucide-react";

const localImages = {
  "Pandit Harish Vyas": "/images/pandits/pandit1.jpg",
  "Shastri Mukund Pandya": "/images/pandits/pandit2.png",
  "Rajesh Sharma": "/images/pandits/pandit3.webp",
  "Acharya Ramesh Joshi": "/images/pandits/pandit4.jpg",
};

const PublicPanditProfile = ({ onBookClick }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [pandit, setPandit] = useState(location.state?.panditData || null);

  useEffect(() => {
    API.get(`/api/pandits/${id}`)
      .then((res) => {
        if (!pandit) {
          setPandit(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

 const getImage = () => {
  if (!pandit) return "/images/pandits/pandit1.jpg";

  if (pandit.image) {
    if (
      pandit.image.startsWith("http") ||
      pandit.image.startsWith("/images/")
    ) {
      return pandit.image;
    }

    return `${import.meta.env.VITE_API_URL}/${pandit.image.replace(/^\/+/, "")}`;
  }

  return "/images/pandits/pandit1.jpg";
};

  if (!pandit) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-orange-600 font-semibold mb-8"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden grid lg:grid-cols-2 gap-10 p-8">

        <div className="flex justify-center">
         <img
  src={getImage()}
  alt={pandit.name}
  className="w-full h-[520px] object-cover rounded-3xl"
  onError={(e) => {
    e.target.src = "/images/pandits/pandit1.jpg";
  }}
/>
        </div>

        <div className="flex flex-col justify-between">

          <div>

            <h1 className="text-4xl font-black">
              {pandit.name}
            </h1>

            <div className="flex items-center gap-2 mt-4 text-orange-500">
              <Star fill="currentColor" size={18} />
              <span>{pandit.rating || "5.0"}</span>
            </div>

            <div className="space-y-4 mt-8">

              <div className="flex gap-2 items-center">
                <MapPin size={18} />
                {pandit.city}
              </div>

              <div className="flex gap-2 items-center">
                <Briefcase size={18} />
                {pandit.experience} Years Experience
              </div>

              <div className="flex gap-2 items-center">
                <Languages size={18} />
                {Array.isArray(pandit.languages)
                  ? pandit.languages.join(", ")
                  : pandit.languages ||
                    pandit.language ||
                    "Gujarati, Hindi"}
              </div>

            </div>

            <div className="mt-8">

              <h2 className="font-bold text-xl mb-2">
                About Pandit
              </h2>

              <p className="text-gray-600">
                {pandit.bio ||
                  "Highly experienced Vedic priest with years of expertise in all Hindu rituals."}
              </p>

            </div>

            <div className="mt-8 text-3xl font-black text-orange-600">
              ₹{pandit.price || "3100"}
            </div>

          </div>

          <button
            onClick={() => onBookClick(pandit)}
            className="mt-8 w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-bold"
          >
            Book Pandit
          </button>

        </div>

      </div>
    </section>
  );
};

export default PublicPanditProfile;