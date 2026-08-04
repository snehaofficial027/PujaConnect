import React, { useState, useEffect } from "react";
import API from "../../config/api";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  Eye,
  Mail,
  Phone,
  MapPin,
  Award,
  Star,
  IndianRupee,
  BookOpen,
  CheckCircle,
  Clock,
  Search,
} from "lucide-react";

const AdminPandits = () => {
  const [pandits, setPandits] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPandit, setSelectedPandit] = useState(null);
const [showModal, setShowModal] = useState(false);

const openModal = (pandit) => {
  setSelectedPandit(pandit);
  setShowModal(true);
};

const approvePandit = async (id) => {
  try {
    const token = localStorage.getItem("adminToken");

    await API.put(
`/api/admin/pandits/${id}/approve`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.success) {
      alert("Pandit Approved Successfully");

      // List ફરી લાવો
      fetchPandits();

      // Modal બંધ કરો
      setShowModal(false);

      // Selected Pandit remove
      setSelectedPandit(null);
    }

  } catch (err) {
    console.log(err);
    alert(err.response?.data?.message || "Approval Failed");
  }
};

const closeModal = () => {
  setShowModal(false);
  setSelectedPandit(null);
};

  useEffect(() => {
    fetchPandits();

    const interval = setInterval(() => {
      fetchPandits();
    }, 5000);

    return () => clearInterval(interval);
  }, []);


    const rejectPandit = async (id) => {
  try {

    const token = localStorage.getItem("adminToken");

await API.put(
`/api/admin/pandits/${id}/reject`,

  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    fetchPandits();

    if (selectedPandit?._id === id) {
      setSelectedPandit({
        ...selectedPandit,
        approved: false,
      });
    }

  } catch (err) {
    console.log(err);
  }
};

const fetchPandits = async () => {
  try {

    const token = localStorage.getItem("adminToken");

    await API.get(
"/api/admin/pandits",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.success) {
      setPandits(res.data.pandits || []);
    }

  } catch (err) {
    console.log(err);
  }
};

  const filteredPandits = pandits.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  const total = pandits.length;

  const approved = pandits.filter(
    (p) => p.approved
  ).length;

  const pending = pandits.filter(
    (p) => !p.approved
  ).length;

const adminEarnings =
pandits.reduce(
(sum,p)=>
sum+
Number(p.adminCommission || 0),
0
);

  return (
    <AdminLayout>

      <div className="space-y-8">

        <div>

          <h1 className="text-4xl font-black text-gray-800">
            Manage Pandits
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage all registered pandits.
          </p>

        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">

          <div className="bg-white rounded-3xl p-6 shadow">

            <p className="text-orange-600 font-medium">
  Total Earnings
</p>

<h2 className="text-3xl font-black mt-2 text-orange-700">
 ₹{adminEarnings}
</h2>

<p className="text-xs text-gray-500 mt-1">
  Completed Bookings
</p>

          </div>

          <div className="bg-green-50 rounded-3xl p-6 shadow">

            <p className="text-green-600">
              Approved
            </p>

            <h2 className="text-3xl font-black mt-2 text-green-700">
              {approved}
            </h2>

          </div>

          <div className="bg-yellow-50 rounded-3xl p-6 shadow">

            <p className="text-yellow-700">
              Pending
            </p>

            <h2 className="text-3xl font-black mt-2 text-yellow-700">
              {pending}
            </h2>

          </div>

          <div className="bg-orange-50 rounded-3xl p-6 shadow">

  <p className="text-orange-600 font-medium">
    Total Earnings (10%)
  </p>

  <h2 className="text-3xl font-black mt-2 text-orange-700">
    ₹{adminEarnings.toFixed(0)}
  </h2>

  <p className="text-xs text-gray-500 mt-1">
    Platform Commission
  </p>

</div>

        </div>

        <div className="flex justify-end">

          <div className="relative">

           <input
type="text"
placeholder="Search Pandit..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="h-12 w-80 px-4 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-500"
/>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredPandits.map((pandit) => (
  <div
    key={pandit._id}
    className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
  >
    {/* Image */}
    <div className="relative h-56 bg-gray-100">

      <img
        src={
  pandit.image
    ? pandit.image.startsWith("http")
      ? pandit.image
      : `${import.meta.env.VITE_API_URL}/${pandit.image.replace(/^\/+/, "")}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        pandit.name
      )}&background=f97316&color=fff&size=512`
}

        alt={pandit.name}
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            pandit.name
          )}&background=f97316&color=fff&size=512`;
        }}
        className="w-full h-full object-contain bg-gray-100 p-2 object-cover object-top "
      />

      <div className="absolute top-4 right-4">

        {pandit.approved ? (
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <CheckCircle size={14} />
            Approved
          </span>
        ) : (
          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Clock size={14} />
            Pending
          </span>
        )}

      </div>
    </div>

    {/* Body */}

    <div className="p-5">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-xl font-bold text-gray-800">
            {pandit.name}
          </h2>

          <div className="flex items-center gap-1 mt-1 text-yellow-500">
            <Star size={16} fill="currentColor" />
            <span className="text-sm font-semibold text-gray-700">
              {pandit.rating}
            </span>
            <span className="text-gray-400 text-sm">
              ({pandit.reviews})
            </span>
          </div>

        </div>

        <div className="text-right">

          <p className="text-xs text-gray-500">
            Fees
          </p>

          <p className="font-bold text-orange-600 text-lg">
            ₹{pandit.price}
          </p>

        </div>

      </div>

      <div className="mt-5 space-y-3 text-sm">

        <div className="flex items-center gap-3">
          <Mail size={16} className="text-orange-500" />
          <span className="truncate">
            {pandit.email}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={16} className="text-orange-500" />
          <span>{pandit.phone}</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin size={16} className="text-orange-500" />
          <span>{pandit.city}</span>
        </div>

        <div className="flex items-center gap-3">
          <Award size={16} className="text-orange-500" />
          <span>{pandit.experience} Years Experience</span>
        </div>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 gap-3 mt-6">

        <div className="bg-orange-50 rounded-xl p-3 text-center">

          <BookOpen
            size={20}
            className="mx-auto text-orange-600 mb-2"
          />

          <p className="text-xs text-gray-500">
            Bookings
          </p>

          <h3 className="font-black text-xl">
            {pandit.totalBookings || 0}
          </h3>

        </div>

        <div className="bg-green-50 rounded-xl p-3 text-center">

          <IndianRupee
            size={20}
            className="mx-auto text-green-600 mb-2"
          />

          <p className="text-xs text-gray-500">
            Earnings
          </p>

          <h3 className="font-black text-xl text-green-700">
            ₹{pandit.totalEarnings || 0}
          </h3>

        </div>

      </div>

      {/* Buttons */}

      <div className="flex gap-3 mt-6">

        <button
  onClick={() => openModal(pandit)}
  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
>
  <Eye size={17} />
  View Details
</button>

        {!pandit.approved && (
          <button
            onClick={() => approvePandit(pandit._id)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-semibold transition"
          >
            Approve
          </button>
        )}

      </div>

    </div>

  </div>
))}

</div>

</div>

{
  showModal &&
  selectedPandit && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      {/* Modal આવશે Part-2 માં */}

    </div>
  )
}

{
  showModal && selectedPandit && (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative">

        {/* Close Button */}

        <button
          onClick={closeModal}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white text-xl"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-3">

          {/* Left */}

          <div className="bg-orange-50 p-8 flex flex-col items-center">

            <img
              src={
  selectedPandit.image
    ? selectedPandit.image.startsWith("http")
      ? selectedPandit.image
      : `${import.meta.env.VITE_API_URL}/${selectedPandit.image.replace(/^\/+/, "")}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        selectedPandit.name
      )}&background=f97316&color=fff&size=512`
}
              alt={selectedPandit.name}
              className="w-44 h-44 rounded-full object-cover border-4 border-orange-500 shadow-lg"
            />

            <h2 className="text-2xl font-black mt-5 text-center">
              {selectedPandit.name}
            </h2>

            <p className="text-orange-600 font-semibold mt-1">
              {selectedPandit.experience} Years Experience
            </p>

            <div className="mt-5">

              {selectedPandit.approved ? (
                <span className="px-4 py-2 rounded-full bg-green-600 text-white font-semibold">
                  Approved
                </span>
              ) : (
                <span className="px-4 py-2 rounded-full bg-yellow-500 text-white font-semibold">
                  Pending
                </span>
              )}

            </div>

          </div>

          {/* Right */}

          <div className="md:col-span-2 p-8">

            <h2 className="text-2xl font-black mb-6">
              Pandit Information
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <h3 className="font-semibold">
                  {selectedPandit.email}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <h3 className="font-semibold">
                  {selectedPandit.phone}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">City</p>
                <h3 className="font-semibold">
                  {selectedPandit.city}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Language</p>
                <h3 className="font-semibold">
                  {selectedPandit.language}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Fees</p>
                <h3 className="font-bold text-orange-600">
                  ₹{selectedPandit.price}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Rating</p>
                <h3 className="font-semibold">
                  ⭐ {selectedPandit.rating} ({selectedPandit.reviews})
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Total Bookings
                </p>
                <h3 className="font-bold">
                  {selectedPandit.totalBookings || 0}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Total Earnings
                </p>
                <h3 className="font-bold text-green-600">
                  ₹{selectedPandit.totalEarnings || 0}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Admin Commission
                </p>
                <h3 className="font-bold text-blue-600">
                  ₹{selectedPandit.adminCommission || 0}
                </h3>
              </div>

            </div>

            <div className="mt-8">

              <h3 className="font-bold text-lg mb-2">
                About
              </h3>

              <p className="text-gray-600 leading-7">
                {selectedPandit.about}
              </p>

            </div>

            <div className="mt-8">

              <h3 className="font-bold text-lg mb-3">
                Specializations
              </h3>

              <div className="flex flex-wrap gap-2">

                {selectedPandit.specializations?.map(
                  (item, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                    >
                      {item}
                    </span>
                  )
                )}

              </div>

            </div>

            <div className="grid grid-cols-2 gap-3 mt-8">

  {!selectedPandit.approved ? (
    <button
      onClick={() => approvePandit(selectedPandit._id)}
      className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
    >
      ✅ Approve
    </button>
  ) : (
    <button
      onClick={() => rejectPandit(selectedPandit._id)}
      className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl font-semibold transition"
    >
      ❌ Reject
    </button>
  )}

  <button
    onClick={() => deletePandit(selectedPandit._id)}
    className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
  >
    🗑 Delete
  </button>

</div>

          </div>

        </div>

      </div>

    </div>
  )
}

</AdminLayout>
);
}

export default AdminPandits;