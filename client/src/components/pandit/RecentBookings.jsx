import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  IndianRupee,
  CreditCard,
} from "lucide-react";

import {
  getBookings,
  confirmBooking,
  rejectBooking,
  completeBooking,
} from "../../api/panditBookingApi";

const RecentBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await getBookings();

      console.log("Bookings API:", res.data);

      setBookings(res.data.bookings || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleConfirm = async (id) => {
    try {
      await confirmBooking(id);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleReject = async (id) => {
    try {
      alert("Refund initiated successfully.");
      await rejectBooking(id);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeBooking(id);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm text-center">
        Loading Bookings...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-black">
          Recent Bookings
        </h2>

        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
          {bookings.length} Bookings
        </span>

      </div>

      {bookings.length === 0 ? (

        <div className="text-center py-10 text-gray-500">
          No Bookings Found
        </div>

      ) : (

        <div className="space-y-5">

          {bookings.map((booking) => {

            const status =
              booking.status?.toLowerCase();

            return (

              <div
                key={booking._id}
                className="border rounded-2xl p-5 hover:shadow-md transition"
              >

                {/* Top */}

                <div className="flex justify-between">

                  <div>

                    <h3 className="font-bold text-lg">

                      {booking.userName}

                    </h3>

                    <p className="text-orange-600 font-semibold">

                      {booking.pujaName}

                    </p>

                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold

                    ${
                      status === "pending"
                        ? "bg-yellow-100 text-yellow-700"

                        : status === "accepted" ||
                          status === "confirmed"

                        ? "bg-green-100 text-green-700"

                        : status === "completed"

                        ? "bg-blue-100 text-blue-700"

                        : status === "rejected"

                        ? "bg-red-100 text-red-700"

                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {booking.status}
                  </span>

                </div>

                {/* Booking Details */}

                <div className="grid md:grid-cols-3 gap-4 mt-5 text-sm text-gray-600">

                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {booking.date}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {booking.timeSlot}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    {booking.address}
                  </div>

                </div>

                {/* Payment Details */}

                <div className="grid md:grid-cols-2 gap-4 mt-5 text-sm">

                  <div className="flex items-center gap-2">

                    <CreditCard
                      size={16}
                      className="text-blue-600"
                    />

                    <span>

                      <strong>Payment :</strong>{" "}

                      {booking.paymentStatus}

                    </span>

                  </div>

                  <div>

                    <strong>Method :</strong>{" "}

                    {booking.paymentMethod}

                  </div>

                  <div className="flex items-center gap-2">

                    <IndianRupee
                      size={16}
                      className="text-green-600"
                    />

                    <span>

                      <strong>Amount :</strong>

                      ₹{booking.price}

                    </span>

                  </div>

                  <div>

                    <strong>Pandit :</strong>{" "}

                    {booking.panditName}

                  </div>

                </div>

                {/* Buttons */}

                <div className="flex gap-3 mt-6 flex-wrap">

                  {status === "pending" && (

                    <>

                      <button
                        onClick={() =>
                          handleConfirm(
                            booking._id
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl font-semibold"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          handleReject(
                            booking._id
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-semibold flex items-center gap-2"
                      >
                        <XCircle size={16} />
                        Reject
                      </button>

                    </>

                  )}

                  {(status === "accepted" ||
                    status === "confirmed") && (

                    <button
                      onClick={() =>
                        handleComplete(
                          booking._id
                        )
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold flex items-center gap-2"
                    >
                      <CheckCircle size={16} />

                      Mark Completed

                    </button>

                  )}

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>
  );
};

export default RecentBookings;