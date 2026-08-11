const pujaData = [
  {
    name: "Satyanarayan Katha",
    category: "Katha",
    description: "Satyanarayan Puja is performed to seek blessings from Lord Vishnu for health, wealth, prosperity, and overall happiness in the family.",
    price: 3100,
    duration: "2-3 Hours",
    image: "/images/pujas/satyanarayan.jpg",
    featured: true,
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
    process: ["Ganesh Sthapana", "Navgrah Puja", "Satyanarayan Katha Recitation", "Hawan", "Aarti & Prasad Distribution"]
  },
  {
    name: "Ganesh Puja",
    category: "Festival",
    description: "Invocation ritual for Lord Ganesha, the remover of obstacles and lord of new beginnings.",
    price: 2100,
    duration: "1.5-2 Hours",
    image: "/images/pujas/ganesh.jpg",
    featured: true,
    benefits: [
      "Removes all hurdles from upcoming endeavors.",
      "Brings wisdom, intellect, and good fortune.",
      "Ensures smooth execution of new business or events."
    ],
    samagri: [
      "Durva Grass (21 blades) & Modak/Laddoo",
      "Red Flowers, Hibiscus & Chandan",
      "Coconut, Supari, Paan Leaves"
    ],
    process: ["Ganesh Avahan", "Shodashopachara Puja", "Aarti"]
  },
  {
    name: "Maha Mrityunjaya Jaap",
    category: "Vedic Ritual",
    description: "A powerful Vedic ritual dedicated to Lord Shiva for healing, protection from fatal diseases, and overcoming major life obstacles.",
    price: 5100,
    duration: "3-4 Hours",
    image: "/images/pujas/mrutyunjay-jaap.jpg",
    featured: true,
    benefits: [
      "Restores physical health and boosts immunity.",
      "Protects from untimely accidents and severe health risks.",
      "Brings intense mental peace and relieves chronic fear."
    ],
    samagri: [
      "Rudraksha Mala & Gangajal",
      "Bael leaves (Belpatra), Dhatura & Milk",
      "Cow Ghee, Black Sesame Seeds & Hawan Samagri"
    ],
    process: ["Sankalp", "Lord Shiva Avahan", "Maha Mrityunjaya Mantra Jaap", "Hawan & Purna Ahuti"]
  },
  {
    name: "Rudrabhishek",
    category: "Vedic Ritual",
    description: "A sacred ritual of bathing Lord Shiva's Shivling with holy liquids accompanied by chanting of Sri Rudram.",
    price: 4100,
    duration: "2-3 Hours",
    image: "/images/pujas/rudrabhishek-pooja.jpg",
    featured: false,
    benefits: [
      "Destroys negative karma and planetary doshas.",
      "Brings financial stability and professional success.",
      "Purifies the mind and environment from evil spirits."
    ],
    samagri: [
      "Milk, Curd, Honey, Ghee, Sugarcane Juice",
      "Gangajal, Rose Water & Chandan",
      "Bael Leaves, Dhatura, Flowers"
    ],
    process: ["Ganesh Puja", "Shivling Abhishekam with Panchamrut", "Chanting Sri Rudram", "Aarti"]
  },
  {
    name: "Bhumi Puja",
    category: "Vastu",
    description: "Worship of Mother Earth and Vastu Purush performed before starting construction on a land or foundation digging.",
    price: 4400,
    duration: "2-3 Hours",
    image: "/images/pujas/bhumi-puja.jpg",
    featured: false,
    benefits: [
      "Seeks forgiveness from Bhumi Devi for construction disturbances.",
      "Protects the construction site and workers from accidents.",
      "Removes negative energy from the land."
    ],
    samagri: [
      "Navratna (9 Gems) & Panchdhatu",
      "Bricks, Spade (Kodal)",
      "Coconuts, Supari, Haldi, Kumkum"
    ],
    process: ["Ganesh Avahan", "Bhumi Devta Puja", "Sankalp & Digging Pit Ritual", "Hawan"]
  },
  {
    name: "Gaytrihawan Puja",
    category: "Hawan",
    description: "Sacred fire ritual chanting the Gayatri Mantra to purify atmosphere, mind, and spirit.",
    price: 5500,
    duration: "3 Hours",
    image: "/images/pujas/gaytrihawan-puja.jpg",
    featured: false,
    benefits: [
      "Enhances concentration, memory, and spiritual wisdom.",
      "Purifies house environment from microbes and negative vibrations.",
      "Balances chakras and reduces stress and anxiety."
    ],
    samagri: [
      "Hawan Kund, Mango Wood (Samidha)",
      "Pure Cow Ghee & Hawan Samagri Mix",
      "Guggal, Camphor, Cloves, Cardamom"
    ],
    process: ["Gayatri Avahan", "108/1008 Gayatri Mantra Ahuti", "Purna Ahuti & Aarti"]
  },
  {
    name: "Grihapravesh",
    category: "Vastu",
    description: "Housewarming ritual performed before living in a new house to bring prosperity, health, and happiness.",
    price: 4800,
    duration: "3-4 Hours",
    image: "/images/pujas/grihapravesh-puja.jpg",
    featured: true,
    benefits: [
      "Purifies the new home and drives away negative spirits.",
      "Invites Goddess Lakshmi and Vastu Purush blessings.",
      "Ensures peace, harmony, and prosperity for residents."
    ],
    samagri: [
      "Copper Kalash, Mango Leaves, Coconut",
      "Milk for boiling ritual",
      "Toran for main door"
    ],
    process: ["Dwar Puja", "Kalash Yatra", "Boiling Milk Ritual", "Vastu Hawan"]
  },
  {
    name: "Marriage Puja",
    category: "Sanskar",
    description: "Complete Vedic wedding ceremony uniting two souls through sacred mantras, Saptapadi, and Kanyadaan.",
    price: 18000,
    duration: "4-5 Hours",
    image: "/images/pujas/marriage-puja.jpg",
    featured: true,
    benefits: [
      "Brings divine unity, love, and understanding between couples.",
      "Blesses the newly wedded couple with health and progeny.",
      "Establishes harmonious relationship between both families."
    ],
    samagri: [
      "Varmala, Mangalsutra, Sindoor",
      "Mandap Decor Items, Havan Samagri",
      "Kanyadaan Thali, Gathbandhan Cloth"
    ],
    process: ["Varmala Exchange", "Kanyadaan", "Agni Pradakshina", "Saptapadi (7 Steps)", "Sindoor Daan"]
  },
  {
    name: "Mundan Puja",
    category: "Sanskar",
    description: "Traditional first hair shaving ceremony for a child symbolizing cleansing from past life karmas.",
    price: 3800,
    duration: "2 Hours",
    image: "/images/pujas/mundan-puja.jpg",
    featured: false,
    benefits: [
      "Shaves off past birth's negative traits and karma.",
      "Promotes healthier and thicker new hair growth.",
      "Cools the child's body and stimulates brain nerves."
    ],
    samagri: [
      "Turmeric paste, Curd for head application",
      "New Clothes for the child",
      "Ganga Jal, Sweets & Flowers"
    ],
    process: ["Ganesh Puja", "Shaving Ritual (Barber)", "Turmeric Application", "Aarti & Blessings"]
  },
  {
    name: "Navratri Puja",
    category: "Festival",
    description: "Worship of 9 forms of Goddess Durga (Navdurga) for power, prosperity, and victory over evil.",
    price: 4400,
    duration: "2-3 Hours",
    image: "/images/pujas/navratri-puja.jpg",
    featured: false,
    benefits: [
      "Grants supreme strength, confidence, and courage.",
      "Destroys hidden enemies, jealousy, and fear.",
      "Bestows wealth, health, and family happiness."
    ],
    samagri: [
      "Ghatasthapana Kalash, Barley (Jowar) seeds",
      "Red Chunri, Shringar Items for Mataji",
      "Akhand Jyot Oil/Ghee & Diya"
    ],
    process: ["Ghatasthapana", "Durga Saptashati Path", "Mataji Hawan", "Kanya Pujan"]
  },
  {
    name: "Pitru Dosh Puja",
    category: "Dosha Nivarana",
    description: "Ritual to appease ancestors and remove Pitru Dosh caused by planetary positions or ancestral curses.",
    price: 4400,
    duration: "3 Hours",
    image: "/images/pujas/pitru-dosh.jpg",
    featured: false,
    benefits: [
      "Relieves family from repeated health problems and childlessness.",
      "Removes hurdles in marriage and career progress.",
      "Brings peace and satisfaction to departed ancestral souls."
    ],
    samagri: [
      "Black Sesame Seeds, Kusha Grass, Barley",
      "White Flowers, White Clothes for donation",
      "Pind Daan Samagri (Rice balls & Ghee)"
    ],
    process: ["Sankalpa", "Tarpan Ritual", "Pind Daan", "Brahman Bhojan & Daan"]
  },
  {
    name: "Vastu Shanti Puja",
    category: "Vastu",
    description: "Worship of Vastu Purush to rectify architectural defects (Vastu Doshas) without structural changes.",
    price: 4400,
    duration: "3 Hours",
    image: "/images/pujas/vastu-shanti-puja.jpg",
    featured: false,
    benefits: [
      "Neutralizes architectural and directional defects of the property.",
      "Improves financial flow and mental peace of residents.",
      "Eliminates frequent quarrels and negative energy at home."
    ],
    samagri: [
      "Vastu Yantra, Copper/Silver Vastu Serpent (Nag)",
      "Navgrah Samidha & Ghee",
      "Panchratna, Coconut, Supari"
    ],
    process: ["Vastu Purush Avahan", "Navgrah Shanti", "Vastu Hawan", "Yantra Sthapana"]
  }
];

module.exports = pujaData;