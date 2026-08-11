import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  LogOut,
  Calendar,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const Navbar = ({ user, onLogout, onLoginClick }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // User name
  const getUserName = () => {
    if (!user) return "User";

    return (
      user.name ||
      user.displayName ||
      user.username ||
      "User"
    );
  };

  const userName = getUserName();
  const firstLetter = userName.charAt(0).toUpperCase();

  const profilePic =
    user?.photoURL ||
    user?.avatar ||
    user?.picture ||
    null;

  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm w-full">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= TOP NAVBAR ================= */}
        <div className="flex justify-between items-center min-h-16 py-2">

          {/* ================= LOGO ================= */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="text-xl sm:text-2xl font-black text-orange-600 tracking-tight flex-shrink-0"
          >
            Puja<span className="text-gray-900">Connect</span>
          </Link>

          {/* ================= DESKTOP MIDDLE LINKS ================= */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-9">

            <Link
              to="/"
              className="text-sm font-bold text-gray-700 hover:text-orange-600 transition whitespace-nowrap"
            >
              Home
            </Link>

            <Link
              to="/services"
              className="text-sm font-bold text-gray-700 hover:text-orange-600 transition whitespace-nowrap"
            >
              Services
            </Link>

            <Link
              to="/pandits"
              className="text-sm font-bold text-gray-700 hover:text-orange-600 transition whitespace-nowrap"
            >
              Pandits
            </Link>

            <Link
              to="/contact"
              className="text-sm font-bold text-gray-700 hover:text-orange-600 transition whitespace-nowrap"
            >
              Contact
            </Link>

          </div>

          {/* ================= RIGHT DESKTOP MENU ================= */}
          <div className="hidden md:flex items-center flex-shrink-0">

            {user ? (

              /* ================= LOGGED IN USER ================= */
              <div className="relative">

                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 px-2.5 sm:px-3.5 py-2 rounded-xl text-sm font-bold text-gray-800 transition border border-gray-200/60 shadow-sm"
                >

                  {/* Profile image */}
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt={userName}
                      className="w-7 h-7 rounded-full object-cover shadow-sm border border-orange-200"
                    />
                  ) : (
                    <div className="w-7 h-7 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs font-black shadow-sm">
                      {firstLetter}
                    </div>
                  )}

                  <span className="max-w-[100px] lg:max-w-[140px] truncate">
                    {userName}
                  </span>

                  <ChevronDown
                    size={14}
                    className="text-gray-400 flex-shrink-0"
                  />

                </button>

                {/* ================= USER DROPDOWN ================= */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-2xl shadow-xl py-1.5 z-50">

                    <Link
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-semibold"
                    >
                      <User size={16} className="text-gray-400" />
                      View Profile
                    </Link>

                    <Link
                      to="/bookings"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-semibold"
                    >
                      <Calendar size={16} className="text-gray-400" />
                      My Bookings
                    </Link>

                    <hr className="my-1 border-gray-100" />

                    <button
                      onClick={() => {
                        onLogout();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-bold text-left"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>

                  </div>
                )}

              </div>

            ) : (

              /* ================= NOT LOGGED IN ================= */
              <div className="flex items-center gap-2 lg:gap-3">

                {/* Become a Pandit */}
                <button
                  onClick={() => navigate("/pandit/signup")}
                  className="flex items-center justify-center bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-3 lg:px-5 py-2 lg:py-2.5 rounded-xl text-xs lg:text-sm font-bold transition whitespace-nowrap"
                >
                  Become a Pandit
                </button>

                {/* Sign In */}
                <button
                  onClick={onLoginClick}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-3 lg:px-5 py-2 lg:py-2.5 rounded-xl text-xs lg:text-sm font-black transition shadow-sm tracking-wide whitespace-nowrap"
                >
                  Sign In
                </button>

              </div>

            )}

          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X size={25} />
            ) : (
              <Menu size={25} />
            )}
          </button>

        </div>

        {/* =====================================================
             MOBILE / TABLET MENU
             ===================================================== */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">

            {/* Navigation links */}
            <div className="flex flex-col gap-1">

              <Link
                to="/"
                onClick={closeMobileMenu}
                className="px-4 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
              >
                Home
              </Link>

              <Link
                to="/services"
                onClick={closeMobileMenu}
                className="px-4 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
              >
                Services
              </Link>

              <Link
                to="/pandits"
                onClick={closeMobileMenu}
                className="px-4 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
              >
                Pandits
              </Link>

              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="px-4 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
              >
                Contact
              </Link>

            </div>

            <div className="border-t border-gray-100 mt-3 pt-4">

              {user ? (

                /* ================= MOBILE LOGGED USER ================= */
                <div className="space-y-2">

                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">

                    {profilePic ? (
                      <img
                        src={profilePic}
                        alt={userName}
                        className="w-9 h-9 rounded-full object-cover border border-orange-200"
                      />
                    ) : (
                      <div className="w-9 h-9 bg-orange-600 rounded-full flex items-center justify-center text-white font-black">
                        {firstLetter}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">
                        Welcome
                      </p>

                      <p className="font-bold text-gray-800 truncate">
                        {userName}
                      </p>
                    </div>

                  </div>

                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <User size={18} />
                    View Profile
                  </Link>

                  <Link
                    to="/bookings"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <Calendar size={18} />
                    My Bookings
                  </Link>

                  <button
                    onClick={() => {
                      onLogout();
                      closeMobileMenu();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 text-left"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>

                </div>

              ) : (

                /* ================= MOBILE NOT LOGGED IN ================= */
                <div className="flex flex-col gap-3">

                  <button
                    onClick={() => {
                      navigate("/pandit/signup");
                      closeMobileMenu();
                    }}
                    className="w-full flex items-center justify-center bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-5 py-3 rounded-xl text-sm font-bold transition"
                  >
                    Become a Pandit
                  </button>

                  <button
                    onClick={() => {
                      onLoginClick();
                      closeMobileMenu();
                    }}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-xl text-sm font-black transition shadow-sm"
                  >
                    Sign In
                  </button>

                </div>

              )}

            </div>

          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;