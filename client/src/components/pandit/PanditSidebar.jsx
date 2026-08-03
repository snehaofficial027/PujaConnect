import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  CalendarCheck,
  Clock3,
  Star,
  IndianRupee,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const PanditSidebar = ({ sidebarOpen, setSidebarOpen }) => {

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("pandit");
  localStorage.removeItem("panditToken");

  navigate("/pandit/login");
};

  const menuItems = [

    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/pandit/dashboard",
    },

    {
      title: "My Bookings",
      icon: <CalendarCheck size={20} />,
      path: "/pandit/bookings",
    },

    {
      title: "Reviews",
      icon: <Star size={20} />,
      path: "/pandit/reviews",
    },

    {
      title: "Earnings",
      icon: <IndianRupee size={20} />,
      path: "/pandit/earnings",
    },

    {
      title: "My Profile",
      icon: <User size={20} />,
      path: "/pandit/profile",
    },

    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/pandit/settings",
    },

  ];

  return (

    <>
      {/* Mobile Menu Button */}

      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-5 left-5 z-50 bg-orange-600 text-white p-2 rounded-xl shadow-lg"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-72 bg-white border-r shadow-xl z-50 transform transition-transform duration-300
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        <div className="p-6 border-b flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-black text-orange-600">
              PujaConnect
            </h2>

            <p className="text-xs text-gray-500">
              Pandit Portal
            </p>

          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X />
          </button>

        </div>

        <div className="py-6 px-4 space-y-2">

                  {menuItems.map((item) => (

            <Link
              key={item.title}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-semibold
              ${
                location.pathname === item.path
                  ? "bg-orange-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >

              {item.icon}

              <span>{item.title}</span>

            </Link>

          ))}

        </div>

        {/* Bottom */}

        <div className="absolute bottom-0 left-0 w-full p-5 border-t bg-white">

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold transition"
          >

            <LogOut size={18} />

            Logout

          </button>

          <p className="text-center text-xs text-gray-400 mt-4">
            © 2026 PujaConnect
          </p>

        </div>

      </aside>

    </>

  );

};

export default PanditSidebar;