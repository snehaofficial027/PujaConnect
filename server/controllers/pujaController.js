const Puja = require("../models/Puja");

// Get All Pujas
const getAllPujas = async (req, res) => {
  try {
    const pujas = await Puja.find().sort({ createdAt: -1 });
    res.json(pujas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Puja
const getPujaById = async (req, res) => {
  try {
    const puja = await Puja.findById(req.params.id);
    if (!puja) {
      return res.status(404).json({ message: "Puja not found" });
    }
    res.json(puja);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create / Add New Puja (Local File Storage - Zero Errors)
const createPuja = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      duration,
      bestTime,
      benefits,
      samagri,
      faqs,
    } = req.body;

    if (!name || !price || !description) {
      return res.status(400).json({
        message: "Name, Price, and Description are required fields.",
      });
    }

    let imageUrl = "";

    // 🎯 Local Storage Image Path Logic
    if (req.file) {
      imageUrl = `uploads/pujas/${req.file.filename}`;
      console.log("✅ Local Image Saved Successfully:", imageUrl);
    } else {
      imageUrl = "images/pujas/satyanarayan.jpg";
    }

    // Safe Array Conversions
    let parsedBenefits = [];
    let parsedSamagri = [];
    let parsedFaqs = [];

    try {
      parsedBenefits = benefits ? (typeof benefits === "string" ? JSON.parse(benefits) : benefits) : [];
      parsedSamagri = samagri ? (typeof samagri === "string" ? JSON.parse(samagri) : samagri) : [];
      parsedFaqs = faqs ? (typeof faqs === "string" ? JSON.parse(faqs) : faqs) : [];
    } catch (parseError) {
      console.warn("JSON Parse warning");
    }

    const newPuja = new Puja({
      name,
      price: Number(price),
      description,
      image: imageUrl,
      duration: duration || "2 - 3 Hours",
      bestTime: bestTime || "",
      benefits: Array.isArray(parsedBenefits) ? parsedBenefits : [],
      samagri: Array.isArray(parsedSamagri) ? parsedSamagri : [],
      faqs: Array.isArray(parsedFaqs) ? parsedFaqs : [],
    });

    const savedPuja = await newPuja.save();
    console.log("🎉 Saved Puja to MongoDB:", savedPuja._id);

    return res.status(201).json(savedPuja);
  } catch (error) {
    console.error("Create Puja Server Error:", error);
    return res.status(500).json({
      message: error.message || "Failed to add puja",
    });
  }
};

// Delete Puja
const deletePuja = async (req, res) => {
  try {
    const puja = await Puja.findByIdAndDelete(req.params.id);
    if (!puja) {
      return res.status(404).json({ message: "Puja not found" });
    }
    res.json({ message: "Puja deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPujas,
  getPujaById,
  createPuja,
  deletePuja,
};