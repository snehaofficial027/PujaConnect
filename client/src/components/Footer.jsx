import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  ArrowUp,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#0F172A] text-white relative">

      {/* Top Section */}

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-14">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* Company */}

          <div>

            <h2 className="text-4xl font-black">

              <span className="text-orange-500">
                Puja
              </span>

              Connect

            </h2>

            <p className="text-gray-400 mt-6 leading-8">

              PujaConnect helps families book
              trusted and verified pandits for
              Home Puja, Temple Puja and Online
              Puja anywhere across India with
              secure booking and transparent pricing.

            </p>

            {/* Social */}

            <div className="flex gap-4 mt-8">

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-gray-800 hover:bg-orange-600 transition flex items-center justify-center"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-gray-800 hover:bg-orange-600 transition flex items-center justify-center"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-gray-800 hover:bg-orange-600 transition flex items-center justify-center"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-gray-800 hover:bg-orange-600 transition flex items-center justify-center"
              >
                <FaYoutube />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-gray-800 hover:bg-orange-600 transition flex items-center justify-center"
              >
                <FaLinkedinIn />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-2xl font-bold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-gray-400">

              <li>
                <Link
                  to="/"
                  className="hover:text-orange-500 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  className="hover:text-orange-500 transition"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  to="/pandits"
                  className="hover:text-orange-500 transition"
                >
                  Pandits
                </Link>
              </li>
                            <li>
                <Link
                  to="/about"
                  className="hover:text-orange-500 transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-orange-500 transition"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="hover:text-orange-500 transition"
                >
                  FAQ
                </Link>
              </li>

            </ul>

          </div>

          {/* Popular Pujas */}

          <div>

            <h3 className="text-2xl font-bold mb-6">
              Popular Pujas
            </h3>

            <ul className="space-y-4 text-gray-400">

              <li className="hover:text-orange-500 transition cursor-pointer">
                Satyanarayan Puja
              </li>

              <li className="hover:text-orange-500 transition cursor-pointer">
                Griha Pravesh Puja
              </li>

              <li className="hover:text-orange-500 transition cursor-pointer">
                Ganesh Puja
              </li>

              <li className="hover:text-orange-500 transition cursor-pointer">
                Navgraha Shanti
              </li>

              <li className="hover:text-orange-500 transition cursor-pointer">
                Maha Mrityunjaya Jaap
              </li>

              <li className="hover:text-orange-500 transition cursor-pointer">
                Rudrabhishek Puja
              </li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-2xl font-bold mb-6">
              Contact Us
            </h3>

            <div className="space-y-5">

              <div className="flex items-start gap-3">

                <MapPin
                  className="text-orange-500 mt-1"
                  size={20}
                />

                <p className="text-gray-400 leading-7">
                  Ahmedabad,
                  Gujarat,
                  India
                </p>

              </div>

              <div className="flex items-center gap-3">

                <Phone
                  className="text-orange-500"
                  size={20}
                />

                <span className="text-gray-400">
                  +91 98765 43210
                </span>

              </div>

              <div className="flex items-center gap-3">

                <Mail
                  className="text-orange-500"
                  size={20}
                />

                <span className="text-gray-400">
                  support@pujaconnect.com
                </span>

              </div>

            </div>

            {/* Newsletter */}

            <div className="mt-8">

              <h4 className="font-bold mb-4">
                Subscribe Newsletter
              </h4>

              <div className="flex">

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-800 px-4 py-3 rounded-l-xl outline-none"
                />

                <button className="bg-orange-600 hover:bg-orange-700 px-5 rounded-r-xl transition">

                  <Send size={18} />

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
            {/* Bottom */}

      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-5">

          <p className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} PujaConnect. All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm">

            <Link
              to="/privacy-policy"
              className="text-gray-400 hover:text-orange-500 transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-gray-400 hover:text-orange-500 transition"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/refund-policy"
              className="text-gray-400 hover:text-orange-500 transition"
            >
              Refund Policy
            </Link>

          </div>

        </div>

      </div>

      {/* Scroll To Top */}

      <button
        onClick={scrollTop}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-orange-600 hover:bg-orange-700 text-white shadow-2xl flex items-center justify-center transition duration-300 z-50"
      >
        <ArrowUp size={22} />
      </button>

    </footer>
  );
};

export default Footer;