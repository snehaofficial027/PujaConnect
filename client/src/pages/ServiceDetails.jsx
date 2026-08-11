import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import API from "../config/api";
import {
  Clock,
  IndianRupee,
  CheckCircle,
  Calendar,
  PackageCheck,
  HelpCircle,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

// 🎯 દરેક ૧૨ પૂજાઓ માટેનો ચોક્કસ અને અલગ-અલગ ડેટા
const defaultPujaDetails = {
  "1": {
    name: "Satyanarayan Puja",
    price: "3100",
    duration: "2 - 3 Hours",
    description: "Satyanarayan Puja is performed to seek blessings from Lord Vishnu for health, wealth, prosperity, and overall happiness in the family.",
    benefits: [
      "Brings peace, harmony, and happiness to the household.",
      "Removes financial obstacles and promotes business growth.",
      "Protects the family from negative energies and evil eyes.",
      "Fulfills noble desires and bestows spiritual growth."
    ],
    samagri: [
      "Puja Thali & Diyas",
      "Fresh Flowers & Mango Leaves",
      "Panchamrut (Milk, Curd, Honey, Ghee, Sugar)",
      "Banana, Tulsi Leaves & Wheat Flour Halwa (Prasad)",
      "Supari, Coconuts, Roli & Akshat"
    ],
    bestTime: "Full Moon day (Purnima), Ekadashi, or any auspicious family event like housewarming, birthday, or marriage.",
    faqs: [
      {
        question: "When should Satyanarayan Puja be performed?",
        answer: "It is best performed on Purnima or Ekadashi, but can also be conducted on any milestone celebration."
      },
      {
        question: "Will the Pandit bring the Samagri?",
        answer: "You can choose options during booking—Panditji can bring all essential samagri or provide a checklist for you."
      }
    ]
  },
  "2": {
    name: "Maha Mrityunjaya Jaap",
    price: "5100",
    duration: "3 - 4 Hours",
    description: "A powerful Vedic ritual dedicated to Lord Shiva for healing, protection from fatal diseases, and overcoming major life obstacles.",
    benefits: [
      "Restores physical health and boosts immunity.",
      "Protects from untimely accidents and severe health risks.",
      "Brings intense mental peace and relieves chronic fear.",
      "Bestows longevity and spiritual rejuvenation."
    ],
    samagri: [
      "Rudraksha Mala & Gangajal",
      "Bael leaves (Belpatra), Dhatura & Milk",
      "Cow Ghee, Black Sesame Seeds & Hawan Samagri",
      "White Sweet Prasad & Camphor"
    ],
    bestTime: "Mondays, Shivratri, or during health emergencies as recommended by astrologers.",
    faqs: [
      {
        question: "How many chants are performed in this jaap?",
        answer: "Standard packages start from 1,080 chants up to 1,25,000 chants based on requirement."
      }
    ]
  },
  "3": {
    name: "Rudrabhishek",
    price: "4100",
    duration: "2 - 3 Hours",
    description: "A sacred ritual of bathing Lord Shiva's Shivling with holy liquids accompanied by chanting of Sri Rudram.",
    benefits: [
      "Destroys negative karma and planetary doshas.",
      "Brings financial stability and professional success.",
      "Purifies the mind and environment from evil spirits.",
      "Grants health, longevity, and inner peace."
    ],
    samagri: [
      "Milk, Curd, Honey, Ghee, Sugarcane Juice",
      "Gangajal, Rose Water & Chandan",
      "Bael Leaves, Dhatura, Flowers",
      "Hawan Kund & Samagri"
    ],
    bestTime: "Mondays, Pradosh Vrat, or during Shravan month.",
    faqs: [
      {
        question: "Can Rudrabhishek be performed at home?",
        answer: "Yes, Panditji can perform it at your home using a portable Narmada Shivling."
      }
    ]
  },
  "4": {
    name: "Ganesh Puja",
    price: "2100",
    duration: "1 - 2 Hours",
    description: "Invocation ritual for Lord Ganesha, the remover of obstacles and lord of new beginnings.",
    benefits: [
      "Removes all hurdles from upcoming endeavors.",
      "Brings wisdom, intellect, and good fortune.",
      "Ensures smooth execution of new business or events.",
      "Bestows auspicious energy to the surroundings."
    ],
    samagri: [
      "Durva Grass (21 blades) & Modak/Laddoo",
      "Red Flowers, Hibiscus & Chandan",
      "Coconut, Supari, Paan Leaves",
      "Janeu, Roli & Akshat"
    ],
    bestTime: "Ganesh Chaturthi, Tuesdays, or before starting any new business/project.",
    faqs: [
      {
        question: "Is this mandatory before other pujas?",
        answer: "Lord Ganesha is worshipped first (Pratham Pujya) in every Hindu ritual for obstacle-free execution."
      }
    ]
  },
  "5": {
    name: "Bhumi Puja",
    price: "4400",
    duration: "2 - 3 Hours",
    description: "Worship of Mother Earth and Vastu Purush performed before starting construction on a land or foundation digging.",
    benefits: [
      "Seeks forgiveness from Bhumi Devi for construction disturbances.",
      "Protects the construction site and workers from accidents.",
      "Removes negative energy from the land.",
      "Ensures timely and safe completion of building work."
    ],
    samagri: [
      "Navratna (9 Gems) & Panchdhatu",
      "Bricks, Spade (Kodal) for digging symbolic pit",
      "Coconuts, Supari, Haldi, Kumkum",
      "Mango Leaves, Kalash & Milk"
    ],
    bestTime: "Auspicious Vastu Tithi, auspicious planetary transits avoided during Eclipse/Sankranti.",
    faqs: [
      {
        question: "Where should the Bhumi Pujan pit be dug?",
        answer: "Usually in the North-East (Eeshanya) corner of the plot under Panditji's guidance."
      }
    ]
  },
  "6": {
    name: "Gaytrihawan Puja",
    price: "5500",
    duration: "3 Hours",
    description: "Sacred fire ritual chanting the Gayatri Mantra to purify atmosphere, mind, and spirit.",
    benefits: [
      "Enhances concentration, memory, and spiritual wisdom.",
      "Purifies house environment from microbes and negative vibrations.",
      "Balances chakras and reduces stress and anxiety.",
      "Protects from mental disorders and planetary affliction."
    ],
    samagri: [
      "Hawan Kund, Mango Wood (Samidha)",
      "Pure Cow Ghee & Hawan Samagri Mix",
      "Guggal, Camphor, Cloves, Cardamom",
      "Purna Ahuti Saree/Cloth & Coconut"
    ],
    bestTime: "Early morning (Brahma Muhurat) or Sundays/Festivals.",
    faqs: [
      {
        question: "Is Hawan smoke harmful?",
        answer: "No, Hawan using pure ghee and medicinal herbs purifies the air and releases therapeutic aroma."
      }
    ]
  },
  "7": {
    name: "grihapravesh",
    price: "4800",
    duration: "3 - 4 Hours",
    description: "Housewarming ritual performed before living in a new house to bring prosperity, health, and happiness.",
    benefits: [
      "Purifies the new home and drives away negative spirits.",
      "Invites Goddess Lakshmi and Vastu Purush blessings.",
      "Ensures peace, harmony, and prosperity for residents.",
      "Protects the house from future calamities."
    ],
    samagri: [
      "Copper Kalash, Mango Leaves, Coconut",
      "Milk for boiling ritual (Milk Boiling Casserole)",
      "Toran (Mango/Ashoka leaves for main door)",
      "Navgrah & Vastu Hawan Samagri"
    ],
    bestTime: "Auspicious Shubh Muhurat recommended by Astrologer based on owner's Rashi.",
    faqs: [
      {
        question: "Can we stay in the house immediately after Griha Pravesh?",
        answer: "Yes, at least one family member should stay in the new house overnight after the puja."
      }
    ]
  },
  "8": {
    name: "Marriage Puja",
    price: "18000",
    duration: "4 - 5 Hours",
    description: "Complete Vedic wedding ceremony uniting two souls through sacred mantras, Saptapadi, and Kanyadaan.",
    benefits: [
      "Brings divine unity, love, and understanding between couples.",
      "Blesses the newly wedded couple with health and progeny.",
      "Establishes harmonious relationship between both families.",
      "Sanctifies marital life according to Vedic traditions."
    ],
    samagri: [
      "Varmala, Mangalsutra, Sindoor",
      "Mandap Decor Items, Havan Samagri",
      "Kanyadaan Thali, Gathbandhan Cloth",
      "Laja (Puffed Rice) for Laja Homam"
    ],
    bestTime: "Shubh Vivah Muhurat fixed according to Kundali matching.",
    faqs: [
      {
        question: "How many Pandits are needed for Marriage Puja?",
        answer: "Usually 2 to 4 trained Vedic Pandits conduct the complete rituals smoothly."
      }
    ]
  },
  "9": {
    name: "mundan puja",
    price: "3800",
    duration: "2 Hours",
    description: "Traditional first hair shaving ceremony for a child symbolizing cleansing from past life karmas.",
    benefits: [
      "Shaves off past birth's negative traits and karma.",
      "Promotes healthier and thicker new hair growth.",
      "Cools the child's body and stimulates brain nerves.",
      "Protects the child from evil eye and health issues."
    ],
    samagri: [
      "Turmeric paste, Curd for head application",
      "New Clothes for the child",
      "Barber Kit / Razor (Silver or New)",
      "Ganga Jal, Sweets & Flowers"
    ],
    bestTime: "performed in the 1st, 3rd, or 5th year of the child during auspicious Muhurat.",
    faqs: [
      {
        question: "Where should the shaved hair be disposed?",
        answer: "It is traditionally immersed in a holy river or buried in a sacred plant spot."
      }
    ]
  },
  "10": {
    name: "Navratri Puja",
    price: "4400",
    duration: "2 - 3 Hours",
    description: "Worship of 9 forms of Goddess Durga (Navdurga) for power, prosperity, and victory over evil.",
    benefits: [
      "Grants supreme strength, confidence, and courage.",
      "Destroys hidden enemies, jealousy, and fear.",
      "Bestows wealth, health, and family happiness.",
      "Fulfills deep-rooted spiritual and worldly desires."
    ],
    samagri: [
      "Ghatasthapana Kalash, Barley (Jowar) seeds",
      "Red Chunri, Shringar Items for Mataji",
      "Akhand Jyot Oil/Ghee & Diya",
      "Durga Saptashati Book & Hawan Kit"
    ],
    bestTime: "Chaitra or Sharad Navratri (Pratipada to Navami).",
    faqs: [
      {
        question: "Can Ghatasthapana be done at home?",
        answer: "Yes, Panditji will do Ghatasthapana on day 1 and perform Hawan on Kanjak/Navami."
      }
    ]
  },
  "11": {
    name: "pitru dhoshPuja",
    price: "4400",
    duration: "3 Hours",
    description: "Ritual to appease ancestors and remove Pitru Dosh caused by planetary positions or ancestral curses.",
    benefits: [
      "Relieves family from repeated health problems and childlessness.",
      "Removes hurdles in marriage and career progress.",
      "Brings peace and satisfaction to departed ancestral souls.",
      "Establishes peace and harmony in the lineage."
    ],
    samagri: [
      "Black Sesame Seeds, Kusha Grass, Barley",
      "White Flowers, White Clothes for donation",
      "Pind Daan Samagri (Rice balls & Ghee)",
      "Milk, Water & Sweets for Pitrus"
    ],
    bestTime: "Pitru Paksha, Amavasya, or Ashtami/Navami/Chaturdashi tithis.",
    faqs: [
      {
        question: "Where should Pitru Dosh Puja be done?",
        answer: "It can be performed at home, river banks, or pilgrim centers like Trimbakeshwar or Gaya."
      }
    ]
  },
  "12": {
    name: "Vastu Shanti Puja",
    price: "4400",
    duration: "3 Hours",
    description: "Worship of Vastu Purush to rectify architectural defects (Vastu Doshas) without structural changes.",
    benefits: [
      "Neutralizes architectural and directional defects of the property.",
      "Improves financial flow and mental peace of residents.",
      "Eliminates frequent quarrels and negative energy at home.",
      "Attracts positive universal energy into the building."
    ],
    samagri: [
      "Vastu Yantra, Copper/Silver Vastu Serpent (Nag)",
      "Navgrah Samidha & Ghee",
      "Panchratna, Coconut, Supari",
      "Cactus / Thorny plant removal & Shanti Jal"
    ],
    bestTime: "Before shifting to a renovated/old home or when experiencing Vastu issues.",
    faqs: [
      {
        question: "Does Vastu Shanti require breaking walls?",
        answer: "No, Vedic Vastu Shanti uses Mantras, Yantras, and Hawan to balance energy spiritually without physical demolition."
      }
    ]
  }
};

const ServiceDetails = ({ onBookClick }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [puja, setPuja] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. location.state માંથી ડેટા મેળવો
    if (location.state?.pujaData) {
      setPuja(enhancePujaData(location.state.pujaData));
      setLoading(false);
      return;
    }

    // 2. static default ડેટામાં શોધો
    if (defaultPujaDetails[id]) {
      setPuja(defaultPujaDetails[id]);
      setLoading(false);
      return;
    }

    // 3. API માંથી ફેચ કરો
    API.get(`/api/pujas/${id}`)
      .then((res) => {
        if (res.data) {
          setPuja(enhancePujaData(res.data));
        } else {
          setPuja(getFallbackData(id));
        }
      })
      .catch(() => {
        setPuja(getFallbackData(id));
      })
      .finally(() => setLoading(false));
  }, [id, location.state]);

  function enhancePujaData(data) {
    // ID અથવા નામના આધારે ડેટા ફિલ્ટર કરો
    const matchedKey = Object.keys(defaultPujaDetails).find(
      (k) =>
        k === String(data._id) ||
        defaultPujaDetails[k].name.toLowerCase() === (data.name || "").toLowerCase()
    );

    const staticInfo = defaultPujaDetails[matchedKey] || {};

    return {
      ...data,
      name: data.name || staticInfo.name || "Vedic Puja",
      price: data.price || staticInfo.price || "3100",
      description: data.description || staticInfo.description || "Auspicious Vedic Puja performed by certified pandits.",
      duration: data.duration || staticInfo.duration || "2 - 3 Hours",
      benefits: data.benefits || staticInfo.benefits || [
        "Brings divine blessings, peace, and prosperity.",
        "Removes planetary doshas and negative influences.",
        "Ensures success in new endeavors and family well-being."
      ],
      samagri: data.samagri || staticInfo.samagri || [
        "Puja Thali, Kalash & Diyas",
        "Fresh Flowers, Fruits & Sweets",
        "Ghee, Camphor, Incense sticks (Agarbatti)",
        "Roli, Chawal, Coconut & Supari"
      ],
      bestTime: data.bestTime || staticInfo.bestTime || "Any auspicious Muhurat, Subh Tithi, or festival day as guided by Panditji.",
      faqs: data.faqs || staticInfo.faqs || [
        {
          question: "How long does the Puja take?",
          answer: "Most pujas take around 2 to 3 hours including Hawan and Prasad distribution."
        },
        {
          question: "Do I need to prepare anything at home?",
          answer: "You just need a clean Puja space. Panditji will guide you step-by-step."
        }
      ]
    };
  }

  function getFallbackData(pujaId) {
    return enhancePujaData({
      _id: pujaId,
      name: "Vedic Puja Service",
      price: "3100",
      description: "Sacred Vedic ritual performed by certified and experienced Pandits following authentic traditions."
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-600"></div>
      </div>
    );
  }

  if (!puja) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold text-gray-800">Puja Details Not Found</h2>
        <Link to="/services" className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-xl font-bold">
          Back to All Pujas
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8 flex justify-center items-start">
      <div className="max-w-4xl w-full space-y-8 text-center mx-auto">
        
        {/* Top Navigation */}
        <div className="flex justify-start">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 font-semibold transition"
          >
            <ArrowLeft size={20} /> Back to Services
          </button>
        </div>

        {/* Centered Hero Section */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-8 lg:p-12 flex flex-col items-center justify-center space-y-6">
          <span className="bg-orange-100 text-orange-700 text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5">
            <Sparkles size={14} /> Certified Authentic Vedic Ritual
          </span>

          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight text-center">
            {puja.name}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="bg-orange-50 text-orange-700 px-5 py-2.5 rounded-2xl flex items-center gap-2 font-bold text-2xl">
              <IndianRupee size={24} />
              <span>{puja.price}</span>
            </div>

            <div className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-2xl flex items-center gap-2 text-sm font-semibold">
              <Clock size={18} className="text-orange-600" />
              <span>{puja.duration}</span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-base max-w-2xl text-center">
            {puja.description}
          </p>

          <div className="pt-4 border-t border-gray-100 w-full max-w-md">
            <button
              onClick={() => {
                if (onBookClick) {
                  onBookClick(puja);
                } else {
                  navigate("/services");
                }
              }}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center text-lg"
            >
              Book This Puja Now
            </button>
          </div>
        </div>

        {/* Benefits & Samagri Grid */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          
          {/* Benefits */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <ShieldCheck size={26} />
              </div>
              <h2 className="text-2xl font-black text-gray-900">Key Benefits</h2>
            </div>

            <ul className="space-y-4 w-full">
              {puja.benefits?.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm font-medium leading-relaxed">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Samagri Needed */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <PackageCheck size={26} />
              </div>
              <h2 className="text-2xl font-black text-gray-900">Samagri Required</h2>
            </div>

            <ul className="space-y-3 w-full">
              {puja.samagri?.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 flex-shrink-0"></span>
                  <span className="text-gray-800 text-sm font-semibold">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Best Time / Muhurat */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 text-white shadow-lg text-center flex flex-col items-center">
          <div className="flex items-center gap-3 mb-3">
            <Calendar size={28} />
            <h2 className="text-2xl font-black">Best Time & Muhurat</h2>
          </div>
          <p className="text-orange-50 text-base leading-relaxed max-w-2xl">
            {puja.bestTime}
          </p>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm text-left">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <HelpCircle size={26} />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {puja.faqs?.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-gray-900 text-base mb-1">
                  Q: {faq.question}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceDetails;