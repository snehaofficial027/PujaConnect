import { useEffect, useState } from "react";
import axios from "axios";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  User,
  ArrowLeft,
  Star,
} from "lucide-react";

import ReviewModal from "./ReviewModal";

const MyBookings = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBooking, setSelectedBooking] = useState(null);
const [showReviewModal, setShowReviewModal] = useState(false);

  const currentUser = user || JSON.parse(localStorage.getItem("user"));
  const bookingList = Array.isArray(bookings) ? bookings : [];

  useEffect(() => {
  if (currentUser && (currentUser._id || currentUser.id)) {
    const uId = currentUser._id || currentUser.id;

    API.get(`/api/bookings/user/${user._id}`)
      .then((res) => {
        console.log(res.data);

        if (res.data.success) {
          setBookings(res.data.bookings);
        } else {
          setBookings([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setBookings([]);
        setLoading(false);
      });
  } else {
    setLoading(false);
  }
}, []);

  // ⚡ પાછા જવા માટેનું ફંક્શન
  const handleBack = () => {
    window.history.back();
  };

  if (!currentUser) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-gray-200/60 shadow-sm max-w-md mx-auto my-12 px-6">
        <AlertCircle className="mx-auto text-orange-500 mb-4" size={44} />
        <h3 className="text-xl font-black text-gray-900 tracking-tight">Sign In Required</h3>
        <p className="text-gray-500 text-xs mt-2 leading-relaxed">Please log in to your account to securely access and manage your booked ritual schedules.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-24 text-gray-500 font-bold tracking-tight text-sm">
        <div className="animate-pulse">Fetching your booking dashboard...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in duration-300 px-4 py-6">
      {/* ⚡ પ્રોફેશનલ બેક બટન */}
      <button 
        onClick={handleBack} 
        className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-orange-600 transition mb-6 bg-gray-100 hover:bg-orange-50 px-3 py-2 rounded-xl border border-gray-200/50 shadow-sm"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">My Bookings</h2>
        <p className="text-gray-500 text-xs mt-1">Track and manage your scheduled Vedic services and assigned scholars.</p>
      </div>
      
      {bookingList.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-200/60 shadow-sm border-dashed">
          <p className="text-gray-400 font-medium text-sm">No bookings discovered. Your scheduled rituals will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bookings.map((booking) => (
            <div 
              key={booking._id} 
              className="bg-white p-6 rounded-2xl border border-gray-200/70 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
              <div className="flex-1 space-y-2 text-left">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-md ${
                    booking.status === "Confirmed" 
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                      : "bg-amber-50 text-amber-700 border border-amber-100"
                  }`}>
                    {booking.status === "Confirmed" ? <CheckCircle size={11} /> : <AlertCircle size={11} />}
                    {booking.status}
                  </span>
                  <span className="text-[10px] font-bold text-orange-600 bg-orange-50/60 px-2 py-1 rounded-md border border-orange-100/20">
                    {booking.pujaMode}
                  </span>
                </div>
                
                <h3 className="font-extrabold text-gray-900 text-lg tracking-tight">{booking.pujaName}</h3>
                
                <div className="flex items-center gap-1.5 text-xs text-gray-700 font-semibold bg-gray-50 px-3 py-1.5 rounded-xl w-fit border border-gray-100">
                  <User size={13} className="text-orange-500" />
                  <span>Assigned: <span className="text-gray-900 font-bold">{booking.panditName}</span></span>
                </div>
                
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-400 font-medium pt-1">
                  <span className="flex items-center gap-1"><Calendar size={13} /> {booking.date}</span>
                  <span className="flex items-center gap-1"><Clock size={13} /> {booking.timeSlot || booking.time}</span>
                  <span className="flex items-center gap-1"><MapPin size={13} /> {booking.address}</span>
                </div>
              </div>
              
              <div className="w-full md:w-auto text-left md:text-right border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 flex flex-col items-end gap-3">

  <div>
    <span className="text-xs text-gray-400 font-bold uppercase">
      Service Price
    </span>

    <div className="text-orange-600 font-black text-xl">
      ₹{booking.price || "2500"}
    </div>

      <div
  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold
    ${
      booking.paymentStatus === "Paid"
        ? "bg-green-100 text-green-700"
        : booking.paymentStatus === "Pending"
        ? "bg-yellow-100 text-yellow-700"
        : booking.paymentStatus === "Refunded"
        ? "bg-purple-100 text-purple-700"
        : "bg-gray-100 text-gray-700"
    }`}
>
  <div
  className={`text-xs font-bold mt-2 ${
    booking.paymentStatus === "Paid"
      ? "text-green-600"
      : booking.paymentStatus === "Refunded"
      ? "text-blue-600"
      : "text-red-600"
  }`}
>
  Payment : {booking.paymentStatus}

  {booking.paymentStatus === "Refunded" && (
    <div className="text-blue-500 mt-1">
      Refund Successfully Processed
    </div>
  )}
</div>
</div>

  </div>

  {(booking.status === "Completed" ||
    booking.status === "COMPLETED") && (
    <button
      onClick={() => {
        setSelectedBooking(booking);
        setShowReviewModal(true);
      }}
      className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition"
    >
      <Star size={16} />
      Leave Review
    </button>
  )}

</div>

{showReviewModal && (
  <ReviewModal
    booking={selectedBooking}
    user={currentUser}
    onClose={() => setShowReviewModal(false)}
    onSuccess={() => {
      setShowReviewModal(false);
    }}
  />
)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;