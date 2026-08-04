import { useEffect, useState } from "react";
import API from "../../config/api";
import {
  BookOpen,
  CheckCircle,
  Clock,
  IndianRupee,
} from "lucide-react";

import AdminLayout from "../../components/admin/AdminLayout";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBookings();

    const interval = setInterval(() => {
      fetchBookings();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/api/admin/bookings");

      if (res.data.success) {
        setBookings(res.data.bookings || []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredBookings = bookings.filter((booking) =>
    `${booking.userName || ""} ${booking.panditName || ""} ${booking.pujaName || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (b) => b.status === "Pending"
  ).length;

  const acceptedBookings = bookings.filter(
    (b) => b.status === "Accepted"
  ).length;

  const completedBookings = bookings.filter(
    (b) => b.status === "Completed"
  ).length;

  const totalRevenue = bookings
    .filter((b) => b.status === "Completed")
    .reduce(
      (sum, b) => sum + Number(b.price || 0),
      0
    );

  return (
    <AdminLayout>

      <div className="space-y-8">

        {/* Header */}

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-black text-gray-800">
              Booking Management
            </h1>

            <p className="text-gray-500 mt-2">
              Monitor and manage all puja bookings.
            </p>

          </div>

          <div className="relative">

            <div>
  <input
    type="text"
    placeholder="Search Booking..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-80 h-12 px-4 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-500"
  />
</div>
          </div>

        </div>

        {/* Summary Cards */}

        <div className="grid grid-cols-2 xl:grid-cols-5 gap-5">

          <div className="bg-white rounded-3xl shadow p-6">

            <BookOpen
              className="text-orange-600 mb-3"
              size={28}
            />

            <p className="text-gray-500">
              Total Bookings
            </p>

            <h2 className="text-3xl font-black mt-2">
              {totalBookings}
            </h2>

          </div>

          <div className="bg-yellow-50 rounded-3xl shadow p-6">

            <Clock
              className="text-yellow-600 mb-3"
              size={28}
            />

            <p className="text-yellow-700">
              Pending
            </p>

            <h2 className="text-3xl font-black mt-2">
              {pendingBookings}
            </h2>

          </div>

          <div className="bg-blue-50 rounded-3xl shadow p-6">

            <CheckCircle
              className="text-blue-600 mb-3"
              size={28}
            />

            <p className="text-blue-700">
              Accepted
            </p>

            <h2 className="text-3xl font-black mt-2">
              {acceptedBookings}
            </h2>

          </div>

          <div className="bg-green-50 rounded-3xl shadow p-6">

            <CheckCircle
              className="text-green-600 mb-3"
              size={28}
            />

            <p className="text-green-700">
              Completed
            </p>

            <h2 className="text-3xl font-black mt-2">
              {completedBookings}
            </h2>

          </div>

          <div className="bg-orange-50 rounded-3xl shadow p-6">

            <IndianRupee
              className="text-orange-600 mb-3"
              size={28}
            />

            <p className="text-orange-700">
              Total Revenue
            </p>

            <h2 className="text-3xl font-black mt-2">
              ₹{totalRevenue}
            </h2>

          </div>

        </div>

        {/* Table */}

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-orange-600 text-white">

                <tr>

                  <th className="p-4 text-left">User</th>
                  <th className="p-4 text-left">Pandit</th>
                  <th className="p-4 text-left">Puja</th>
                  <th className="p-4 text-center">Date</th>
                  <th className="p-4 text-center">Amount</th>
                  <th className="p-4 text-center">Payment</th>
                  <th className="p-4 text-center">Method</th>
                  <th className="p-4 text-center">Status</th>

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

      <td className="p-4 text-center">
        {booking.date}
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

        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            booking.status === "Completed"
              ? "bg-green-100 text-green-700"

              : booking.status === "Accepted"
              ? "bg-blue-100 text-blue-700"

              : booking.status === "Rejected"
              ? "bg-red-100 text-red-700"

              : booking.status === "Cancelled"
              ? "bg-gray-200 text-gray-700"

              : "bg-yellow-100 text-yellow-700"
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
      colSpan="8"
      className="py-20 text-center text-gray-400 font-semibold"
    >

      No Bookings Found

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

export default AdminBookings;