import { useEffect, useState } from "react";
import API from "../../api";
import {
  IndianRupee,
  Calendar,
  Wallet,
  CheckCircle,
} from "lucide-react";

import AdminLayout from "../../components/admin/AdminLayout";

const AdminRevenue = () => {
  const [data, setData] = useState({
    totalRevenue: 0,
    todayRevenue: 0,
    monthlyRevenue: 0,
    completedBookings: [],
  });

  const [search, setSearch] = useState("");

 useEffect(() => {
  fetchRevenue();

  const interval = setInterval(() => {
    fetchRevenue();
  }, 5000);

  return () => clearInterval(interval);
}, []);

  const fetchRevenue = async () => {
    try {
      const res = await API.get("/api/admin/revenue");

      if (res.data.success) {
        setData(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredBookings =
    data.completedBookings.filter((booking) =>
      `${booking.userName || ""} ${booking.panditName || ""} ${booking.pujaName || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <AdminLayout>

      <div className="space-y-8">

        {/* Header */}

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-black text-gray-800">
              Revenue Analytics
            </h1>

            <p className="text-gray-500 mt-2">
              Monitor all completed payments and revenue.
            </p>

          </div>

          <div>

  <input
    type="text"
    placeholder="Search Revenue..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-80 h-12 px-4 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-500"
  />

</div>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">

          <div className="bg-white rounded-3xl shadow p-6">

            <Calendar
              size={28}
              className="text-blue-600 mb-3"
            />

            <p className="text-blue-600 font-medium">
              Today's Revenue
            </p>

            <h2 className="text-3xl font-black mt-2">
              ₹{data.todayRevenue}
            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow p-6">

            <Wallet
              size={28}
              className="text-green-600 mb-3"
            />

            <p className="text-green-600 font-medium">
              Monthly Revenue
            </p>

            <h2 className="text-3xl font-black mt-2">
              ₹{data.monthlyRevenue}
            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow p-6">

            <IndianRupee
              size={28}
              className="text-orange-600 mb-3"
            />

            <p className="text-orange-600 font-medium">
              Total Revenue
            </p>

            <h2 className="text-3xl font-black mt-2">
              ₹{data.totalRevenue}
            </h2>

          </div>

          <div className="bg-white rounded-3xl shadow p-6">

            <CheckCircle
              size={28}
              className="text-purple-600 mb-3"
            />

            <p className="text-purple-600 font-medium">
              Completed Bookings
            </p>

            <h2 className="text-3xl font-black mt-2">
              {data.completedBookings.length}
            </h2>

          </div>

        </div>

        {/* Revenue Table */}

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-orange-600 text-white">

                <tr>

                  <th className="p-4 text-left">
                    User
                  </th>

                  <th className="p-4 text-left">
                    Pandit
                  </th>

                  <th className="p-4 text-left">
                    Puja
                  </th>

                  <th className="p-4 text-center">
                    Amount
                  </th>

                  <th className="p-4 text-center">
                    Payment
                  </th>

                  <th className="p-4 text-center">
                    Method
                  </th>

                  <th className="p-4 text-center">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

              {filteredBookings.length > 0 ? (

  filteredBookings.map((booking) => (

    <tr
      key={booking._id}
      className="border-b hover:bg-orange-50 transition"
    >

      <td className="p-4 font-semibold">
        {booking.userName || "N/A"}
      </td>

      <td className="p-4">
        {booking.panditName || "N/A"}
      </td>

      <td className="p-4">
        {booking.pujaName}
      </td>

      <td className="p-4 text-center font-bold text-green-600">
        ₹{booking.price}
      </td>

      <td className="p-4 text-center">

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            booking.paymentStatus === "Paid"
              ? "bg-green-100 text-green-700"
              : booking.paymentStatus === "Refunded"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {booking.paymentStatus}
        </span>

      </td>

      <td className="p-4 text-center">
        {booking.paymentMethod}
      </td>

      <td className="p-4 text-center">
        {booking.date}
      </td>

    </tr>

  ))

) : (

  <tr>

    <td
      colSpan="7"
      className="py-20 text-center text-gray-400 font-semibold"
    >
      No Revenue Records Found
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

export default AdminRevenue;