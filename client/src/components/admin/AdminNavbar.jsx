import { useEffect, useState, useCallback } from "react";
import {
  User,
  Users,
  BookOpen,
  Bell,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../config/api";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const titles = {
    "/admin/dashboard": "Dashboard",
    "/admin/users": "Users",
    "/admin/pandits": "Manage Pandits",
    "/admin/bookings": "Bookings",
    "/admin/revenue": "Revenue",
    "/admin/contacts": "Contact Messages",
  };

  const title = titles[location.pathname] || "Admin Panel";

  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState({
    pendingPanditsCount: 0,
    pendingPandits: [],
    pendingBookings: 0,
    newMessages: 0,
    total: 0,
  });

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await API.get("/api/admin/notifications");

      if (res.data.success) {
        setNotifications(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 5000);

    window.addEventListener(
      "refreshNotifications",
      fetchNotifications
    );

    return () => {
      clearInterval(interval);

      window.removeEventListener(
        "refreshNotifications",
        fetchNotifications
      );
    };
  }, [fetchNotifications]);

  return (
    <header className="sticky top-0 z-40 h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">

      {/* Left */}
      <div>
        <h1 className="text-3xl font-black text-gray-800">
          {title}
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Welcome to PujaConnect Admin
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        <div className="relative">

          <button
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
            className="relative w-11 h-11 rounded-xl bg-gray-100 hover:bg-orange-50 flex items-center justify-center transition"
          >
            <Bell
              size={22}
              className="text-gray-700"
            />

            {notifications.total > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {notifications.total}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">

              <div className="px-5 py-4 border-b">
                <h3 className="font-bold text-lg">
                  Notifications
                </h3>
              </div>

              <div className="p-3 space-y-2">

                {/* Pending Pandits */}
                <button
                  onClick={() => {
                    navigate("/admin/pandits");
                    setShowNotifications(false);
                  }}
                  className="w-full rounded-xl hover:bg-orange-50 transition p-3"
                >
                  <div className="flex gap-3">

                    <Users
                      size={20}
                      className="text-orange-600 mt-1"
                    />

                    <div className="flex-1 text-left">

                      <p className="font-semibold text-gray-800">
                        New Pandit Registration
                      </p>

                      <p className="text-xs text-gray-500 mb-2">
                        {notifications.pendingPanditsCount} waiting for approval
                      </p>

                      {notifications.pendingPandits?.map((pandit) => (
                        <div
                          key={pandit._id}
                          className="border-t pt-2 mt-2"
                        >
                          <p className="text-sm font-semibold">
                            {pandit.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            {pandit.city}
                          </p>
                        </div>
                      ))}

                    </div>

                  </div>
                </button>

                {/* Pending Bookings */}
                <button
                  onClick={() => {
                    navigate("/admin/bookings");
                    setShowNotifications(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 transition"
                >
                  <BookOpen
                    size={20}
                    className="text-blue-600"
                  />

                  <div className="text-left">
                    <p className="font-semibold">
                      Pending Bookings
                    </p>

                    <p className="text-xs text-gray-500">
                      {notifications.pendingBookings} bookings pending
                    </p>
                  </div>

                </button>

              </div>

            </div>
          )}

        </div>

        {/* Admin Profile */}
        <div className="flex items-center gap-3 bg-orange-50 border border-orange-100 px-4 py-2 rounded-2xl">

          <div className="w-11 h-11 rounded-full bg-orange-600 text-white flex items-center justify-center">
            <User size={20} />
          </div>

          <div>
            <p className="font-bold text-gray-800">
              Administrator
            </p>

            <p className="text-xs text-gray-500">
              Super Admin
            </p>
          </div>

        </div>

      </div>

    </header>
  );
};

export default AdminNavbar;