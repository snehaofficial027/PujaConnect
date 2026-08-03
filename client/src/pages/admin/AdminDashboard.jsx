import { useEffect, useState } from "react";
import API from "../config/api";
import {
  Users,
  UserCheck,
  BookOpen,
  IndianRupee,
  ArrowUpRight,
} from "lucide-react";

import AdminLayout from "../../components/admin/AdminLayout";

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalPandits: 0,
    pendingPandits: 0,
    totalBookings: 0,
    totalRevenue: 0,
    latestBookings: [],
  });

 useEffect(() => {
 fetchDashboard();

 const interval = setInterval(() => {
   fetchDashboard();
 }, 5000);

 return () => clearInterval(interval);
}, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/api/admin/dashboard");

      setDashboard(res.data.dashboard);
    } catch (err) {
      console.log(err);
    }
  };

  const cards = [
    {
      title: "Total Users",
      value: dashboard.totalUsers,
      color: "from-blue-500 to-cyan-500",
      icon: Users,
    },
    {
      title: "Verified Pandits",
      value: dashboard.totalPandits,
      color: "from-green-500 to-emerald-500",
      icon: UserCheck,
    },
    {
      title: "Bookings",
      value: dashboard.totalBookings,
      color: "from-orange-500 to-amber-500",
      icon: BookOpen,
    },
    {
      title: "Revenue",
      value: `₹${dashboard.totalRevenue}`,
      color: "from-purple-500 to-fuchsia-500",
      icon: IndianRupee,
    },
  ];

  return (
    <AdminLayout>

      <div className="space-y-8">

        {/* Heading */}

        <div>

          <h1 className="text-4xl font-black text-gray-800">

            Welcome Back 👋

          </h1>

          <p className="text-gray-500 mt-2">

            Monitor your complete PujaConnect platform from here.

          </p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">

          {cards.map((card) => {

            const Icon = card.icon;

            return (

              <div
                key={card.title}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >

                <div
                  className={`bg-gradient-to-r ${card.color} h-2`}
                />

                <div className="p-7">

                  <div className="flex justify-between items-center">

                    <div>

                      <p className="text-gray-500 font-medium">

                        {card.title}

                      </p>

                      <h2 className="text-4xl font-black mt-3">

                        {card.value}

                      </h2>

                    </div>

                    <div
                      className={`bg-gradient-to-r ${card.color}
                      w-16 h-16 rounded-2xl
                      flex items-center justify-center
                      text-white`}
                    >

                      <Icon size={30} />

                    </div>

                  </div>

                  <div className="mt-6 flex items-center gap-2 text-green-600 font-semibold">

                    <ArrowUpRight size={18} />

                    Active Statistics

                  </div>

                </div>

              </div>

            );

          })}

        </div>
                {/* Latest Bookings */}

        <div className="bg-white rounded-3xl shadow-md overflow-hidden">

          <div className="flex items-center justify-between px-8 py-6 border-b">

            <div>

              <h2 className="text-2xl font-black text-gray-800">
                Latest Bookings
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Recently created bookings
              </p>

            </div>

            <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl font-bold">

              {dashboard.latestBookings.length} Records

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr className="text-left">

                  <th className="px-8 py-4 font-bold text-gray-600">
                    User
                  </th>

                  <th className="px-8 py-4 font-bold text-gray-600">
                    Puja
                  </th>

                 <th className="px-8 py-4 font-bold text-gray-600">
  Pandit
</th>

<th className="px-8 py-4 font-bold text-gray-600">
  Status
</th>
                </tr>

              </thead>

              <tbody>

                {dashboard.latestBookings.length > 0 ? (

                  dashboard.latestBookings.map((booking) => (

                    <tr
                      key={booking._id}
                      className="border-t hover:bg-orange-50 transition"
                    >

                      <td className="px-8 py-5">
  <div>
    <h3 className="font-bold text-gray-800">
     {booking.user?.name || booking.userName || "Deleted User"}
    </h3>

    <p className="text-xs text-gray-500 mt-1">
      {booking.panditName}
    </p>
  </div>
</td>

<td className="px-8 py-5 font-medium">
  {booking.pujaName}
</td>

                      <td className="px-8 py-5">
  {booking.panditName}
</td>

<td className="px-8 py-5">
  <span
    className={`px-4 py-2 rounded-full text-xs font-bold ${
      booking.status === "Pending"
        ? "bg-yellow-100 text-yellow-700"
        : booking.status === "Accepted"
        ? "bg-green-100 text-green-700"
        : booking.status === "Completed"
        ? "bg-blue-100 text-blue-700"
        : booking.status === "Rejected"
        ? "bg-red-100 text-red-700"
        : "bg-gray-100 text-gray-700"
    }`}
  >
    {booking.status}
  </span>
</td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center py-20 text-gray-400 font-semibold"
                    >

                      No Recent Bookings Found

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </AdminLayout>

  );

};

export default AdminDashboard;