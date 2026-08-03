import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, Calendar, ChevronDown } from "lucide-react";

const Navbar = ({ user, onLogout, onLoginClick }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // યુઝરનું નામ મેળવવા માટેનું સેફ લોજિક (Google login કે Normal login બંને માટે)
  const getUserName = () => {
    if (!user) return "User";
    return user.name || user.displayName || user.username || "User";
  };

  const userName = getUserName();
  const firstLetter = userName.charAt(0).toUpperCase();
  const profilePic = user?.photoURL || user?.avatar || user?.picture || null;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center relative">
          
          {/* ૧. LOGO */}
          <Link to="/" className="text-xl font-black text-orange-600 tracking-tight flex-shrink-0">
            Puja<span className="text-gray-900">Connect</span>
          </Link>

          {/* ૨. MIDDLE LINKS */}
          <div className="hidden md:flex items-center gap-10 absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="text-sm font-bold text-gray-700 hover:text-orange-600 transition">
              Home
            </Link>
            <Link to="/services" className="text-sm font-bold text-gray-700 hover:text-orange-600 transition">
              Services
            </Link>
            <Link to="/pandits" className="text-sm font-bold text-gray-700 hover:text-orange-600 transition">
              Pandits
            </Link>
            <Link to="/contact" className="text-sm font-bold text-gray-700 hover:text-orange-600 transition">
              Contact
            </Link>
          </div>

          {/* ૩. RIGHT MENU */}
          <div className="flex items-center flex-shrink-0 z-10">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsOpen(!isOpen)} 
                  className="flex items-center gap-2.5 bg-gray-50 hover:bg-gray-100 px-3.5 py-2 rounded-xl text-sm font-bold text-gray-800 transition border border-gray-200/60 shadow-sm"
                >
                  {/* પ્રોફાઈલ ઈમેજ અથવા ફર્સ્ટ લેટર */}
                  {profilePic ? (
                    <img 
                      src={profilePic} 
                      alt={userName} 
                      className="w-6 h-6 rounded-full object-cover shadow-sm border border-orange-200"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs font-black shadow-sm">
                      {firstLetter}
                    </div>
                  )}

                  <span className="max-w-[120px] truncate">{userName}</span>
                  <ChevronDown size={14} className="text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-2xl shadow-xl py-1.5 z-50">
                    <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-semibold">
                      <User size={16} className="text-gray-400" /> View Profile
                    </Link>
                    <Link to="/bookings" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-semibold">
                      <Calendar size={16} className="text-gray-400" /> My Bookings
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button onClick={() => { onLogout(); setIsOpen(false); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-bold text-left">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/pandit/signup")}
                  className="hidden lg:flex items-center bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-5 py-2.5 rounded-xl text-sm font-bold transition"
                >
                  Become a Pandit
                </button>

                <button
                  onClick={onLoginClick}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl text-sm font-black transition shadow-sm tracking-wide"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;