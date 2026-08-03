import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
} from "lucide-react";

import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // ==========================
  // Handle Input Change
  // ==========================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================
  // Submit Form
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/contact", data)

      alert("Message Sent Successfully.");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Unable to send message.");
    }
  };

  return (
    <section className="bg-gradient-to-b from-orange-50/50 via-white to-gray-50 min-h-screen pt-28 pb-16 flex flex-col items-center justify-center">
      
      {/* 🎯 Main Centered Outer Container */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

        {/* 1. TOP HEADER SECTION - Fully Centered */}
        <div className="text-center w-full max-w-2xl mx-auto mb-12">
          <span className="inline-block bg-orange-100/80 text-orange-600 px-5 py-2 rounded-full font-bold text-xs uppercase tracking-widest mb-3">
            Contact Us
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight text-center">
            We'd Love To Hear From You
          </h1>

          <p className="text-gray-500 mt-4 leading-relaxed text-base sm:text-lg text-center">
            Have questions about Puja booking, Pandits or your booking? Our support team is available every day to help you.
          </p>
        </div>

        {/* 2. MAIN CONTENT GRID (Info + Form) - Centered Container */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">

          {/* ================= LEFT: Contact Information ================= */}
          <div className="lg:col-span-5 bg-white rounded-3xl shadow-lg p-6 sm:p-8 border border-gray-100 space-y-6">
            <h2 className="text-2xl font-black text-gray-900 border-b pb-4 text-center lg:text-left">
              Contact Information
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                  <MapPin className="text-orange-600" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Office Address</h3>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                    402, Shivalik Business Center, SG Highway, Ahmedabad, Gujarat - 380015, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                  <Phone className="text-orange-600" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Phone Number</h3>
                  <p className="text-gray-500 text-sm mt-1 font-medium">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                  <Mail className="text-orange-600" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Email Address</h3>
                  <p className="text-gray-500 text-sm mt-1 font-medium">
                    support@pujaconnect.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                  <Clock className="text-orange-600" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Working Hours</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Monday - Sunday
                    <br />
                    <span className="font-semibold text-gray-700">8:00 AM - 9:00 PM</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: Form ================= */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-6 border-b pb-4 text-center lg:text-left">
              Send Us A Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full h-12 bg-gray-50/50 border border-gray-200 rounded-xl px-4 text-sm text-gray-800 placeholder-gray-400 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full h-12 bg-gray-50/50 border border-gray-200 rounded-xl px-4 text-sm text-gray-800 placeholder-gray-400 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full h-12 bg-gray-50/50 border border-gray-200 rounded-xl px-4 text-sm text-gray-800 placeholder-gray-400 outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Message
                </label>
                <textarea
                  rows={4}
                  name="message"
                  placeholder="Write your message..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-4 text-sm text-gray-800 placeholder-gray-400 outline-none resize-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-orange-200 transition cursor-pointer active:scale-98 mt-2"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>

        </div>

        {/* 3. BOTTOM SECTION: Google Map - Centered */}
        <div className="w-full bg-white rounded-3xl p-3 border border-gray-100 shadow-md overflow-hidden">
          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden">
            <iframe
              title="Office Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.697920364906!2d72.50734287591605!3d23.0348763158784!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f521585f9d%3A0xb35a82207b3b3a0!2sSG%20Hwy%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;