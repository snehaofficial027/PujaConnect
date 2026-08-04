import { useState } from "react";
import API from "../config/api";
import { Star, X } from "lucide-react";

const ReviewModal = ({ booking, user, onClose, onSuccess }) => {

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const submitReview = async () => {

    if (!review.trim()) {
      alert("Please write your review.");
      return;
    }

    try {

      console.log({
        bookingId: booking?._id,
        panditId: booking?.panditId,
        userId: user?._id || user?.id,
        userName: user?.name,
        rating,
        review,
      });

      console.log("Booking Data:", booking);
console.log("PanditId:", booking.panditId);

     const res = await API.post("/api/reviews", {
  bookingId: booking._id,
  panditId: booking.panditId,
  userId: user._id || user.id,
  userName: user.name,
  rating,
  review,
});

      console.log(res.data);

      alert("Review submitted successfully.");

      onSuccess();
      onClose();

    } catch (err) {

      console.log(err.response?.data);

      alert(err.response?.data?.message || "Unable to submit review.");

    }

  };

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl p-7 w-[420px]">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Rate Your Experience
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="flex justify-center gap-2 mb-6">

          {[1, 2, 3, 4, 5].map((star) => (

            <Star
              key={star}
              size={34}
              fill={star <= rating ? "orange" : "white"}
              color="orange"
              className="cursor-pointer"
              onClick={() => setRating(star)}
            />

          ))}

        </div>

        <textarea
          rows="5"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Share your experience..."
          className="w-full border rounded-xl p-3"
        />

        <button
          onClick={submitReview}
          className="mt-5 w-full bg-orange-600 text-white py-3 rounded-xl font-bold"
        >
          Submit Review
        </button>

      </div>

    </div>

  );

};

export default ReviewModal; 