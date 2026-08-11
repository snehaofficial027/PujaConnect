import React, { useState } from "react";
import API from "../../config/api";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  Plus,
  Trash2,
  Sparkles,
  HelpCircle,
  PackageCheck,
  ShieldCheck,
  Upload,
  CheckCircle,
} from "lucide-react";

const AdminPujas = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "2 - 3 Hours",
    description: "",
    bestTime: "",
  });

  // 🎯 Image File state
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [benefits, setBenefits] = useState([""]);
  const [samagri, setSamagri] = useState([""]);
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);

  const handleInputChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

// 📸 Image Selection Handler
const handleImageChange = (e) => {
  const file = e.target.files?.[0];

  console.log("========== IMAGE SELECTED ==========");
  console.log("File:", file);
  console.log("Name:", file?.name);
  console.log("Type:", file?.type);
  console.log("Size:", file?.size);
  console.log("====================================");

  if (!file) {
    setImageFile(null);
    setImageName("");
    setImagePreview(null);
    return;
  }

  if (!file.type.startsWith("image/")) {
    alert("Please select a valid image file.");
    e.target.value = "";
    return;
  }

  setImageFile(file);
  setImageName(file.name);
  setImagePreview(URL.createObjectURL(file));
};

  const handleBenefitChange = (index, value) => {
    const list = [...benefits];
    list[index] = value;
    setBenefits(list);
  };
  const addBenefitField = () => setBenefits([...benefits, ""]);
  const removeBenefitField = (index) => setBenefits(benefits.filter((_, i) => i !== index));

  const handleSamagriChange = (index, value) => {
    const list = [...samagri];
    list[index] = value;
    setSamagri(list);
  };
  const addSamagriField = () => setSamagri([...samagri, ""]);
  const removeSamagriField = (index) => setSamagri(samagri.filter((_, i) => i !== index));

  const handleFaqChange = (index, field, value) => {
    const list = [...faqs];
    list[index][field] = value;
    setFaqs(list);
  };
  const addFaqField = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFaqField = (index) => setFaqs(faqs.filter((_, i) => i !== index));

  // 🚀 Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("કૃપા કરીને PC માંથી પૂજાની ઈમેજ ફાઈલ પસંદ કરો!");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("duration", formData.duration);
      data.append("description", formData.description);
      data.append("bestTime", formData.bestTime);

      // 💥 Direct state માંથી જઈ રહેલી File (મુખ્ય સુધારો)
      data.append("image", imageFile);

      data.append(
        "benefits",
        JSON.stringify(benefits.filter((b) => b.trim() !== ""))
      );

      data.append(
        "samagri",
        JSON.stringify(samagri.filter((s) => s.trim() !== ""))
      );

      data.append(
        "faqs",
        JSON.stringify(
          faqs.filter(
            (f) => f.question.trim() !== "" && f.answer.trim() !== ""
          )
        )
      );

      // Axios Call
      console.log("========== FORM DATA DEBUG ==========");
console.log("imageFile:", imageFile);
console.log("imageFile name:", imageFile?.name);
console.log("imageFile type:", imageFile?.type);
console.log("imageFile size:", imageFile?.size);

for (const [key, value] of data.entries()) {
  if (key === "image") {
    console.log("FORMDATA IMAGE:", value);
    console.log("FORMDATA IMAGE NAME:", value?.name);
    console.log("FORMDATA IMAGE TYPE:", value?.type);
    console.log("FORMDATA IMAGE SIZE:", value?.size);
  } else {
    console.log("FORMDATA:", key, value);
  }
}

console.log("====================================");

const res = await API.post("/api/pujas", data);

      if (res.status === 201 || res.status === 200) {
        alert("New Puja added successfully!");

        setFormData({
          name: "",
          price: "",
          duration: "2 - 3 Hours",
          description: "",
          bestTime: "",
        });

        setImageFile(null);
        setImageName("");
        setImagePreview(null);
        setBenefits([""]);
        setSamagri([""]);
        setFaqs([{ question: "", answer: "" }]);
      }
    } catch (err) {
      console.error("Add Puja Error:", err);
      const errorMsg =
        err.response?.data?.message || err.message || "Failed to add puja";
      alert(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-gray-800">Puja Management</h1>
          <p className="text-gray-500 mt-2">Add new Puja service with complete details.</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Sparkles className="text-orange-600" /> Add New Puja Service
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Puja Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Satyanarayan Puja"
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g. 3100"
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g. 2 - 3 Hours"
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Choose Image from PC *</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center justify-center gap-2 px-4 h-12 bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-orange-600 border border-dashed border-gray-300 hover:border-orange-500 rounded-xl cursor-pointer text-sm font-bold transition-all w-full">
                    <Upload size={18} /> Choose File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && (
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                {imageName && (
                  <p className="text-xs text-green-600 font-semibold mt-1 flex items-center gap-1">
                    <CheckCircle size={12} /> Selected Image: {imageName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Best Time / Muhurat</label>
                <input
                  type="text"
                  name="bestTime"
                  value={formData.bestTime}
                  onChange={handleInputChange}
                  placeholder="e.g. Full Moon day (Purnima), Ekadashi"
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
              <textarea
                name="description"
                rows="3"
                required
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description about the puja benefits and ritual..."
                className="w-full p-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              ></textarea>
            </div>

            {/* Benefits */}
            <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100 space-y-4">
              <label className="font-bold text-gray-800 flex items-center gap-2 text-sm">
                <ShieldCheck className="text-orange-600" size={18} /> Key Benefits
              </label>
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => handleBenefitChange(idx, e.target.value)}
                    placeholder={`Benefit ${idx + 1}`}
                    className="flex-1 h-10 px-4 rounded-xl border border-gray-300 text-sm outline-none bg-white"
                  />
                  {benefits.length > 1 && (
                    <button type="button" onClick={() => removeBenefitField(idx)} className="text-red-500 p-2">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addBenefitField}
                className="text-xs font-bold text-orange-600 flex items-center gap-1 mt-2 hover:underline"
              >
                <Plus size={14} /> Add Another Benefit
              </button>
            </div>

            {/* Samagri */}
            <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 space-y-4">
              <label className="font-bold text-gray-800 flex items-center gap-2 text-sm">
                <PackageCheck className="text-amber-600" size={18} /> Samagri Required
              </label>
              {samagri.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleSamagriChange(idx, e.target.value)}
                    placeholder={`Samagri Item ${idx + 1}`}
                    className="flex-1 h-10 px-4 rounded-xl border border-gray-300 text-sm outline-none bg-white"
                  />
                  {samagri.length > 1 && (
                    <button type="button" onClick={() => removeSamagriField(idx)} className="text-red-500 p-2">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addSamagriField}
                className="text-xs font-bold text-amber-700 flex items-center gap-1 mt-2 hover:underline"
              >
                <Plus size={14} /> Add Another Samagri Item
              </button>
            </div>

            {/* FAQs */}
            <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100 space-y-4">
              <label className="font-bold text-gray-800 flex items-center gap-2 text-sm">
                <HelpCircle className="text-purple-600" size={18} /> Frequently Asked Questions (FAQs)
              </label>
              {faqs.map((faq, idx) => (
                <div key={idx} className="space-y-2 bg-white p-4 rounded-xl border border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-purple-700">FAQ #{idx + 1}</span>
                    {faqs.length > 1 && (
                      <button type="button" onClick={() => removeFaqField(idx)} className="text-red-500 text-xs flex items-center gap-1">
                        <Trash2 size={14} /> Remove FAQ
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                    placeholder="Question..."
                    className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm outline-none"
                  />
                  <input
                    type="text"
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                    placeholder="Answer..."
                    className="w-full h-10 px-3 rounded-lg border border-gray-300 text-sm outline-none"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addFaqField}
                className="text-xs font-bold text-purple-700 flex items-center gap-1 mt-2 hover:underline"
              >
                <Plus size={14} /> Add Another FAQ
              </button>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition text-sm shadow-sm hover:shadow-md disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save & Add Puja Service"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPujas;