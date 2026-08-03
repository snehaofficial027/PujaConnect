import { useEffect, useState } from "react";
import {
  Calendar,
  IndianRupee,
  Star,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";

import { getDashboard } from "../../api/panditDashboardApi";
import { updateAvailability } from "../../api/panditAvailabilityApi";

import PanditSidebar from "../../components/pandit/PanditSidebar";
import PanditTopbar from "../../components/pandit/PanditTopbar";
import DashboardCard from "../../components/pandit/DashboardCard";
import RecentBookings from "../../components/pandit/RecentBookings";

const PanditDashboard = () => {
  // localStorage માંથી પંડિત અને Token મેળવો
  const pandit =
    JSON.parse(localStorage.getItem("pandit")) ||
    JSON.parse(localStorage.getItem("user")) ||
    {};

  // ID મેળવવા માટેના બધા સંભવિત રસ્તા
  const panditId = pandit._id || pandit.id || pandit.panditId;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [online, setOnline] = useState(pandit.online ?? true);

  const [dashboard, setDashboard] = useState({
    todayBookings: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    earnings: 0,
    totalBookings: 0,
  });

  const loadDashboard = async () => {
    try {
      if (!panditId) {
        console.log("Pandit ID missing!");
        return;
      }

      const res = await getDashboard(panditId);
      
      // 🔍 Console log કરો જેથી ખબર પડે કે API માંથી ડેટા શું આવે છે
      console.log("API RAW RESPONSE:", res);

      // Backend માંથી આવતા ડેટાને ડાયરેક્ટ Extract કરો
      const apiData = res?.data?.dashboard || res?.dashboard || res?.data || {};

      setDashboard({
        todayBookings: Number(apiData.todayBookings || 0),
        pending: Number(apiData.pending || 0),
        confirmed: Number(apiData.confirmed || 0),
        completed: Number(apiData.completed || 0),
        earnings: Number(apiData.earnings || 0),
        totalBookings: Number(apiData.totalBookings || 0),
      });
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }
  };

  useEffect(() => {
    if (panditId) {
      loadDashboard();
    }
  }, [panditId]);

  const changeStatus = async () => {
    try {
      await updateAvailability(!online);

      setOnline(!online);
      pandit.online = !online;
      pandit.availability = !online
        ? "Available Today"
        : "Currently Unavailable";

      localStorage.setItem("pandit", JSON.stringify(pandit));

      alert(!online ? "You are Available Now" : "You are Unavailable Now");
    } catch (err) {
      console.log(err);
      alert("Status Update Failed");
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <PanditSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1">
        <PanditTopbar pandit={pandit} setSidebarOpen={setSidebarOpen} />

        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-black text-gray-900">
              Welcome, {pandit.name || "Pandit"}
            </h1>
            <p className="text-gray-500 mt-2">
              Manage your bookings, earnings and profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <DashboardCard
              title="Today's Bookings"
              value={dashboard.todayBookings}
              icon={<Calendar />}
              color="orange"
            />

            <DashboardCard
              title="Pending Bookings"
              value={dashboard.pending}
              icon={<Clock />}
              color="blue"
            />

            <DashboardCard
              title="Completed Bookings"
              value={dashboard.completed}
              icon={<CheckCircle />}
              color="green"
            />

            <DashboardCard
              title="Average Rating"
              value={pandit.rating || "5.0"}
              icon={<Star />}
              color="yellow"
            />

            <DashboardCard
              title="Total Devotees"
              value={dashboard.totalBookings}
              icon={<Users />}
              color="purple"
            />

            <DashboardCard
              title="Total Earnings"
              value={`₹${dashboard.earnings}`}
              icon={<IndianRupee />}
              color="emerald"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2">
              <RecentBookings panditId={panditId} />
            </div>

            {/* Profile Summary */}
            <div className="bg-white rounded-3xl shadow-sm border p-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src={
                    pandit.image?.startsWith("/")
                      ? pandit.image
                      : pandit.image
                      ? `/${pandit.image}`
                      : "/images/pandits/pandit1.jpg"
                  }
                  alt={pandit.name || "Pandit"}
                  onError={(e) => {
                    e.target.src = "/images/pandits/pandit1.jpg";
                  }}
                  className="w-28 h-28 rounded-full object-cover border-4 border-orange-100"
                />

                <h2 className="text-2xl font-black mt-4">
                  {pandit.name || "Pandit Ji"}
                </h2>

                <p className="text-gray-500">{pandit.city || "Surat"}</p>

                <span
                  className={`mt-3 px-4 py-2 rounded-full text-sm font-bold ${
                    online
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {online ? "🟢 Available Today" : "🔴 Currently Unavailable"}
                </span>
              </div>

              <div className="mt-8 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience</span>
                  <strong>{pandit.experience || "20 Years"}</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Languages</span>
                  <strong>
                    {pandit.language ||
                      pandit.languages ||
                      "Gujarati, Hindi, Sanskrit"}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Starting Dakshina</span>
                  <strong className="text-orange-600">
                    ₹{pandit.price || 8500}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Total Bookings</span>
                  <strong>{dashboard.totalBookings}</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Completed</span>
                  <strong className="text-green-600">
                    {dashboard.completed}
                  </strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Pending</span>
                  <strong className="text-yellow-600">
                    {dashboard.pending}
                  </strong>
                </div>
              </div>

              <div className="mt-8 border-t pt-6">
                <h3 className="font-bold text-lg mb-4">Availability</h3>

                <button
                  onClick={changeStatus}
                  className={`w-full py-3 rounded-xl font-bold text-white transition ${
                    online
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {online ? "🟢 Available" : "🔴 Unavailable"}
                </button>

                <p className="text-gray-500 text-xs mt-3 text-center">
                  {online ? "Users can book you." : "Users cannot book you."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanditDashboard;