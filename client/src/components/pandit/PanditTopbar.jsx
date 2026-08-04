import { useEffect, useState } from "react";
import API from "../../config/api";
import {
  Bell,
  CalendarDays,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PanditTopbar = ({ pandit }) => {

  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [notifications, setNotifications] =
    useState([]);

  const [count, setCount] = useState(0);

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const fetchNotifications = async () => {
    try {

      const token =
        localStorage.getItem("panditToken");

      const res = await API.get(
  "/api/pandit/bookings/notifications",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      if (res.data.success) {

        setNotifications(res.data.bookings);

        setCount(res.data.count);

      }

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {

    fetchNotifications();

    const interval = setInterval(() => {

      fetchNotifications();

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  return (

    <header className="bg-white border-b shadow-sm px-8 py-5 flex items-center justify-between">

      {/* Left */}

      <div>

        <h2 className="text-2xl font-black text-gray-900">
          Pandit Dashboard
        </h2>

        <div className="flex items-center gap-2 text-gray-500 mt-2">

          <CalendarDays
            size={16}
            className="text-orange-600"
          />

          <span className="text-sm">
            {today}
          </span>

        </div>

      </div>
            {/* Right */}

      <div className="flex items-center gap-5">

        <div className="relative">

          <button
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
            className="relative"
          >

            <Bell
              size={22}
              className="text-gray-600 cursor-pointer"
            />

            {count > 0 && (

              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">

                {count}

              </span>

            )}

          </button>

          {showNotifications && (

            <div className="absolute right-0 mt-4 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">

              <div className="px-5 py-4 border-b bg-orange-50">

                <h3 className="font-bold text-lg text-gray-800">
                  New Booking Notifications
                </h3>

              </div>

              <div className="max-h-[400px] overflow-y-auto">

                {notifications.length === 0 ? (

                  <div className="p-6 text-center text-gray-500">

                    No New Booking

                  </div>

                ) : (

                  notifications.map((booking) => (

                    <button
                      key={booking._id}
                      onClick={() => {

                        navigate("/pandit/bookings");

                        setShowNotifications(false);

                      }}
                      className="w-full text-left p-4 border-b hover:bg-orange-50 transition"
                    >

                      <h4 className="font-bold text-gray-800">

                        📿 {booking.userName}

                      </h4>

                      <p className="text-sm text-gray-600 mt-1">

                        booked

                        <span className="font-semibold text-orange-600">

                          {" "}

                          {booking.pujaName}

                        </span>

                      </p>

                      <div className="flex justify-between mt-2 text-xs text-gray-400">

                        <span>

                          📅 {booking.date}

                        </span>

                        <span>

                          🕒 {booking.timeSlot}

                        </span>

                      </div>

                    </button>

                  ))

                )}

              </div>

            </div>

          )}

        </div>

        <div className="flex items-center gap-3">

          <img
            src={
  pandit?.image
    ? pandit.image.startsWith("http")
      ? pandit.image
      : `${import.meta.env.VITE_API_URL}/${pandit.image.replace(/^\/+/, "")}`
    : "/images/pandits/pandit1.jpg"
}
            alt={pandit?.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
            onError={(e) => {
              e.target.src =
                "/images/pandits/pandit1.jpg";
            }}
          />

          <div className="hidden md:block">

            <h4 className="font-bold text-gray-900">

              {pandit?.name || "Pandit"}

            </h4>

            <p className="text-sm text-gray-500">

              {pandit?.city || "Ahmedabad"}

            </p>

          </div>

        </div>

      </div>
          </header>

  );

};

export default PanditTopbar;