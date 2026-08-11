import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CalendarCheck,
  IndianRupee,
  MessageSquare,
  Sparkles,
  LogOut,
  ChevronRight,
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      label: "Pandits",
      path: "/admin/pandits",
      icon: UserCheck,
    },
    {
      label: "Manage Pujas", // 👈 🆕 નવું પૂજા મેનેજમેન્ટ મેનૂ
      path: "/admin/pujas",
      icon: Sparkles,
    },
    {
      label: "Bookings",
      path: "/admin/bookings",
      icon: CalendarCheck,
    },
    {
      label: "Revenue",
      path: "/admin/revenue",
      icon: IndianRupee,
    },
    {
      label: "Contact Messages",
      path: "/admin/contacts",
      icon: MessageSquare,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <aside className="fixed top-0 left-0 w-72 h-screen bg-white border-r shadow-lg flex flex-col z-50">

      {/* Logo */}
      <div className="px-7 py-6 border-b flex-shrink-0">
        <h1 className="text-3xl font-black text-orange-600">
          PujaConnect
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Admin Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${
                isActive
                  ? "bg-orange-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isActive
                      ? "bg-white/20"
                      : "bg-orange-100 group-hover:bg-orange-200"
                  }`}
                >
                  <Icon size={20} />
                </div>

                <span className="font-semibold">
                  {item.label}
                </span>
              </div>

              <ChevronRight
                size={18}
                className={
                  isActive
                    ? "text-white"
                    : "text-gray-400 group-hover:text-orange-500"
                }
              />
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-5 border-t bg-white flex-shrink-0">
        <button
          onClick={handleLogout}
          className="w-full rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold py-3 flex items-center justify-center gap-3 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
};

export default AdminSidebar;