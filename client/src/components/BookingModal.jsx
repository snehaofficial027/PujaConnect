import { useState, useEffect } from "react";
import API from "../config/api";
import { X, Lock } from "lucide-react";

const BookingModal = ({
  service,
  user,
  onClose,
  setIsLoginOpen,
}) => {

  const currentUser =
    user || JSON.parse(localStorage.getItem("user"));

  const cities = [
    "Ahmedabad",
    "Baroda",
    "Surat",
    "Mumbai",
    "Delhi",
  ];

  const pujaOptions = [
    "Satyanarayan Puja",
    "Maha Mrityunjaya Jaap",
    "Rudrabhishek",
    "Ganesh Puja",
    "Bhumi Puja",
    "Gaytri Havan",
    "Grihapravesh",
    "Marriage Puja",
    "Mundan Puja",
    "Navratri Puja",
    "Vastu Shanti Puja",
  ];

  const [allPanditsList, setAllPanditsList] =
    useState([]);

  const [filteredPandits, setFilteredPandits] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  
    const [formData, setFormData] = useState({
  date: "",
  timeSlot: "",
  address: "",
  pujaMode: "Home Puja",
  selectedPuja: "",
  selectedCity: "",
  selectedPandit: null,
  paymentMethod: "Online",
});

  const isPanditBooking =
    service?.name?.includes("Pandit") ||
    service?.name?.includes("Shastri") ||
    service?.name?.includes("Acharya") ||
    service?.name?.includes("Sharma");
      useEffect(() => {
    if (!isPanditBooking && service?.name) {
      setFormData((prev) => ({
        ...prev,
        selectedPuja: service.name,
      }));
    }
  }, [service, isPanditBooking]);

  useEffect(() => {
    const fetchPandits = async () => {
      try {
        const res = await API.get("/api/pandits");
      

        setAllPanditsList(res.data || []);
      } catch (err) {
        console.log("Pandit Fetch Error:", err);
      }
    };

    fetchPandits();
  }, []);

  useEffect(() => {
    if (formData.selectedCity) {
      const filtered = (allPanditsList || []).filter(
        (pandit) =>
          pandit.city &&
          pandit.city.toLowerCase() ===
            formData.selectedCity.toLowerCase()
      );

      setFilteredPandits(filtered);

      setFormData((prev) => ({
        ...prev,
        selectedPandit: null,
      }));
    } else {
      setFilteredPandits([]);
    }
  }, [formData.selectedCity, allPanditsList]);

  if (!currentUser) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-sm p-6 relative shadow-xl">

          <button
            onClick={onClose}
            className="absolute top-4 right-4"
          >
            <X size={20} />
          </button>

          <div className="flex justify-center mb-5">
            <div className="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center">
              <Lock className="text-orange-600" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-center">
            Login Required
          </h2>

          <p className="text-gray-500 text-center mt-2">
            Please login first to continue booking.
          </p>

          <button
            onClick={() => {
              onClose();
              setIsLoginOpen(true);
            }}
            className="w-full bg-orange-600 text-white rounded-xl py-3 mt-6 hover:bg-orange-700"
          >
            Login Now
          </button>

        </div>
      </div>
    );
  }
    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPanditBooking && !formData.selectedPandit) {
      alert("Please select a Pandit.");
      return;
    }

    const rawUserId = currentUser._id || currentUser.id;

    if (!rawUserId) {
      alert("Please login again.");
      return;
    }

    try {
      setLoading(true);

      const finalPujaName = isPanditBooking
        ? formData.selectedPuja || "Pandit Consultation"
        : service.name;

     const bookingData = {
  userId: rawUserId,
  userName: currentUser.name,

  panditId: isPanditBooking
    ? service._id
    : formData.selectedPandit._id,

  panditName: isPanditBooking
    ? service.name
    : formData.selectedPandit.name,

  pujaName: finalPujaName,

  date: formData.date,
  timeSlot: formData.timeSlot,
  address: formData.address,
  pujaMode: formData.pujaMode,

  paymentMethod: formData.paymentMethod,
};

      if (formData.paymentMethod === "Cash") {

  bookingData.paymentMethod = "Cash";

  bookingData.paymentStatus = "Pending";

  await API.post("/api/bookings/create")

  alert("Booking Successful");

  onClose();

  window.location.href = "/bookings";

  return;
}

      const { data } = await API.post(
  "/api/payment/create-order",
  {
    amount: service.price || 2500,
  }
);
    console.log("Razorpay Key =", import.meta.env.VITE_RAZORPAY_KEY_ID);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.order.amount,

currency: data.order.currency,

order_id: data.order.id,

        name: "PujaConnect",

        description: finalPujaName,

        handler: async function (response) {
          try {
            const verify = await API.post(
  "/api/payment/verify",
              {
                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_signature:
                  response.razorpay_signature,
              }
            );

            if (verify.data.success) {
            bookingData.paymentId =
  response.razorpay_payment_id;

bookingData.orderId =
  response.razorpay_order_id;

bookingData.paymentStatus = "Paid";

bookingData.paymentMethod = "Online";

await API.post(
  "/api/bookings/create",
  bookingData
);

              alert("Booking Successful");

              onClose();

              window.location.href = "/bookings";
            } else {
              alert("Payment Verification Failed");
            }
          } catch (err) {
            console.log(err);

            alert("Payment Failed");
          }
        },

        prefill: {
          name: currentUser.name,
          email: currentUser.email,
        },

        theme: {
          color: "#ea580c",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();

    } catch (err) {
  console.log(err);

  if (err.response) {
    console.log(err.response.data);
    alert(err.response.data.message);
  } else {
    alert(err.message);
  }

} finally {
  setLoading(false);
}

};

    return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">

      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">

        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-500 hover:text-red-500"
        >
          <X size={22} />
        </button>

        <div className="p-6">

          <h2 className="text-2xl font-bold text-gray-900">
            {isPanditBooking
              ? "Book Expert Pandit"
              : "Book Puja Service"}
          </h2>

          <p className="text-orange-600 font-semibold mt-1">
            {service?.name}
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 mt-6"
          >

            {isPanditBooking && (
              <div>

                <label className="block text-sm font-semibold mb-2">
                  Select Puja (Optional)
                </label>

                <select
                  className="w-full border rounded-xl p-3"
                  value={formData.selectedPuja}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      selectedPuja: e.target.value,
                    })
                  }
                >
                  <option value="">
                    Just Book Pandit
                  </option>

                  {pujaOptions.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}

                </select>

              </div>
            )}

            {!isPanditBooking && (
              <>
                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Select City
                  </label>

                  <select
                    className="w-full border rounded-xl p-3"
                    value={formData.selectedCity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        selectedCity: e.target.value,
                        selectedPandit: null,
                      })
                    }
                  >
                    <option value="">
                      Select City
                    </option>

                    {cities.map((city) => (
                      <option
                        key={city}
                        value={city}
                      >
                        {city}
                      </option>
                    ))}

                  </select>

                </div>

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Select Pandit
                  </label>

                  <select
                    className="w-full border rounded-xl p-3"
                    disabled={!formData.selectedCity}
                    value={formData.selectedPandit?._id || ""}
                    onChange={(e) => {
                      const pandit =
                        filteredPandits.find(
                          (p) =>
                            p._id === e.target.value
                        );

                      setFormData({
                        ...formData,
                        selectedPandit: pandit,
                      });
                    }}
                  >

                    <option value="">
                      Select Pandit
                    </option>

                    {filteredPandits.map((pandit) => (
                      <option
                        key={pandit._id}
                        value={pandit._id}
                      >
                        {pandit.name}
                      </option>
                    ))}

                  </select>

                </div>
              </>
            )}
                        <div>

              <label className="block text-sm font-semibold mb-2">
                Select Date
              </label>

              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    date: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3"
              />

            </div>

            <div>

              <label className="block text-sm font-semibold mb-2">
                Select Time Slot
              </label>

              <select
                required
                value={formData.timeSlot}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    timeSlot: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3"
              >

                <option value="">
                  Select Time
                </option>

                <option value="06:00 AM - 09:00 AM">
                  06:00 AM - 09:00 AM
                </option>

                <option value="09:00 AM - 12:00 PM">
                  09:00 AM - 12:00 PM
                </option>

                <option value="04:00 PM - 07:00 PM">
                  04:00 PM - 07:00 PM
                </option>

              </select>

            </div>

            <div>

              <label className="block text-sm font-semibold mb-2">
                Puja Mode
              </label>

              <div className="flex gap-5">

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={
                      formData.pujaMode === "Home Puja"
                    }
                    onChange={() =>
                      setFormData({
                        ...formData,
                        pujaMode: "Home Puja",
                      })
                    }
                  />
                  Home Puja
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={
                      formData.pujaMode === "Temple Puja"
                    }
                    onChange={() =>
                      setFormData({
                        ...formData,
                        pujaMode: "Temple Puja",
                      })
                    }
                  />
                  Temple Puja
                </label>

              </div>

            </div>

            <div>

              <label className="block text-sm font-semibold mb-2">
                Address
              </label>

              <textarea
                rows={3}
                required
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3"
                placeholder="Enter Full Address"
              />

            </div>

            <div>

<label className="block text-sm font-semibold mb-2">
Payment Method
</label>

<div className="space-y-3">

<label className="flex items-center gap-3 border rounded-xl p-3">

<input
type="radio"
value="Online"
checked={formData.paymentMethod==="Online"}
onChange={(e)=>
setFormData({
...formData,
paymentMethod:e.target.value
})
}
/>

<span>💳 Online Payment</span>

</label>

<label className="flex items-center gap-3 border rounded-xl p-3">

<input
type="radio"
value="Cash"
checked={formData.paymentMethod==="Cash"}
onChange={(e)=>
setFormData({
...formData,
paymentMethod:e.target.value
})
}
/>

<span>💵 Cash After Puja</span>

</label>

</div>

</div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-3 font-bold transition"
            >
              {loading
                ? "Processing..."
                : "Proceed To Payment"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};


export default BookingModal;