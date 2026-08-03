import { useState, useEffect } from "react";
import API from "../config/api";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
  ShieldCheck,
  ArrowLeft,
  Award,
  Heart,
  BookOpen,
} from "lucide-react";

const Profile = ({ user }) => {
  const currentUser = user ||
  JSON.parse(localStorage.getItem("user")) || {};

const [profileData, setProfileData] = useState({
  name: currentUser.name || "",
  email: currentUser.email || "",
  phone: currentUser.phone || "",
  address: currentUser.address || "",
  city: currentUser.city || "",
});

  const [isEditing, setIsEditing] = useState(false);


  const [bookings, setBookings] = useState([]);

  useEffect(() => {
  if (!currentUser) return;

  const userId = currentUser._id || currentUser.id;

  console.log("User ID:", userId);

  if (userId) {
  API.get(`/api/bookings/user/${userId}`)
  .then((res) => {
    console.log("Bookings:", res.data);

    setBookings(res.data.bookings || []);
  });
  }
}, []);

  const totalBookings = bookings.length;

const completedBookings = bookings.filter(
  (b) => b.status?.toUpperCase() === "COMPLETED"
).length;

const upcomingBookings = bookings.filter((b) =>
  ["PENDING", "CONFIRMED", "UPCOMING"].includes(
    b.status?.toUpperCase()
  )
).length;


  const profileCompletion = [
    profileData.name,
    profileData.email,
    profileData.phone,
    profileData.address,
    profileData.city,
  ].filter(Boolean).length * 20;

  const handleSave = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...currentUser,
      ...profileData,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setIsEditing(false);

    alert("Profile Updated Successfully");

    window.location.reload();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Back Button */}

      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-600 mb-6"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Main Card */}

      <div className="bg-white rounded-[32px] shadow-xl overflow-hidden border border-gray-200">

        {/* Cover */}

        <div className="relative h-56 bg-gradient-to-r from-orange-500 via-orange-400 to-amber-400">

          <div className="absolute inset-0 bg-black/10"></div>

        </div>

        {/* Profile Header */}

        <div className="relative px-10 pb-10">

          <div className="-mt-20 flex flex-col lg:flex-row items-center lg:items-end gap-8">

            {/* Avatar */}

            <div className="relative">

              <div className="w-40 h-40 rounded-full bg-white shadow-xl p-2">

                <div className="w-full h-full rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-6xl font-black">

                 {(profileData.name || "U").charAt(0).toUpperCase()}

                </div>

              </div>

              <button className="absolute bottom-2 right-2 w-11 h-11 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-lg hover:bg-orange-700 transition">

                <Camera size={18} />

              </button>

            </div>

            {/* User Info */}

            <div className="flex-1 text-center lg:text-left">

              <div className="flex items-center justify-center lg:justify-start gap-3">

                <h1 className="text-5xl font-black text-gray-900">

                  {profileData.name}

                </h1>

                <span className="flex items-center gap-1 bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">

                  <ShieldCheck size={16} />

                  Verified

                </span>

              </div>

              <p className="text-gray-500 mt-2 text-lg">

                PujaConnect Premium Devotee

              </p>

              {/* Profile Completion */}

              <div className="mt-6 max-w-md">

                <div className="flex justify-between text-sm font-semibold mb-2">

                  <span>Profile Completion</span>

                  <span>{profileCompletion}%</span>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">

                  <div
                    className="bg-orange-500 h-3 rounded-full transition-all"
                    style={{
                      width: `${profileCompletion}%`,
                    }}
                  ></div>

                </div>

              </div>

            </div>

          </div>
                    {/* Information + Statistics */}

          <div className="grid lg:grid-cols-3 gap-8 mt-12">

            {/* Left Side */}

            <div className="lg:col-span-2">

              <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm">

                <div className="flex items-center justify-between mb-6">

                  <h2 className="text-2xl font-bold text-gray-900">
                    Personal Information
                  </h2>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-xl font-semibold transition"
                  >
                    <Edit3 size={17} />
                    Edit Profile
                  </button>

                </div>

                <div className="grid md:grid-cols-2 gap-5">

                  <div className="bg-orange-50 rounded-2xl p-5">

                    <div className="flex items-center gap-3 mb-2">

                      <Mail className="text-orange-600" size={20} />

                      <span className="font-semibold text-gray-500">
                        Email
                      </span>

                    </div>

                    <p className="font-bold text-gray-900 break-all">
                      {profileData.email}
                    </p>

                  </div>

                  <div className="bg-orange-50 rounded-2xl p-5">

                    <div className="flex items-center gap-3 mb-2">

                      <Phone className="text-orange-600" size={20} />

                      <span className="font-semibold text-gray-500">
                        Mobile
                      </span>

                    </div>

                    <p className="font-bold text-gray-900">
                      {profileData.phone || "Not Added"}
                    </p>

                  </div>

                  <div className="bg-orange-50 rounded-2xl p-5">

                    <div className="flex items-center gap-3 mb-2">

                      <MapPin className="text-orange-600" size={20} />

                      <span className="font-semibold text-gray-500">
                        Address
                      </span>

                    </div>

                    <p className="font-bold text-gray-900">
                      {profileData.address || "Not Added"}
                    </p>

                  </div>

                  <div className="bg-orange-50 rounded-2xl p-5">

                    <div className="flex items-center gap-3 mb-2">

                      <Calendar className="text-orange-600" size={20} />

                      <span className="font-semibold text-gray-500">
                        Member Since
                      </span>

                    </div>

                    <p className="font-bold text-gray-900">
                      {currentUser.joined || "July 2026"}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Right Side */}

            <div className="space-y-6">

              <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">

                <h3 className="text-xl font-bold mb-5">

                  Booking Statistics

                </h3>

                <div className="space-y-4">

                  <div className="flex justify-between items-center bg-orange-50 rounded-xl px-4 py-4">

                    <div className="flex items-center gap-3">

                      <BookOpen className="text-orange-600" />

                      <span>Total Bookings</span>

                    </div>

                    <span className="font-bold text-xl">

                      {totalBookings}

                    </span>

                  </div>

                  <div className="flex justify-between items-center bg-green-50 rounded-xl px-4 py-4">

                    <div className="flex items-center gap-3">

                      <Award className="text-green-600" />

                      <span>Completed</span>

                    </div>

                    <span className="font-bold text-xl">

                      {completedBookings}

                    </span>

                  </div>

                  <div className="flex justify-between items-center bg-blue-50 rounded-xl px-4 py-4">

                    <div className="flex items-center gap-3">

                      <Heart className="text-blue-600" />

                      <span>Upcoming</span>

                    </div>

                    <span className="font-bold text-xl">

                      {upcomingBookings}

                    </span>

                  </div>

                </div>

              </div>

              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg">

                <h3 className="text-xl font-bold">

                  Premium Member

                </h3>

                <p className="mt-3 text-orange-100 leading-7">

                  Thank you for trusting PujaConnect.

                  Your spiritual journey matters to us.

                </p>

              </div>

            </div>

          </div>
                    {/* Edit Profile Modal */}

          {isEditing && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">

              <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-8 relative animate-in fade-in zoom-in duration-300">

                <button
                  onClick={() => setIsEditing(false)}
                  className="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition"
                >
                  <X size={22} />
                </button>

                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Edit Profile
                </h2>

                <p className="text-gray-500 mb-8">
                  Update your personal information.
                </p>

                <form onSubmit={handleSave} className="space-y-5">

                  <div>
                    <label className="block mb-2 text-sm font-semibold">
                      Full Name
                    </label>

                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          name: e.target.value,
                        })
                      }
                      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold">
                      Mobile Number
                    </label>

                    <input
                      type="text"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold">
                      City
                    </label>

                    <input
                      type="text"
                      value={profileData.city}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          city: e.target.value,
                        })
                      }
                      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold">
                      Address
                    </label>

                    <textarea
                      rows={3}
                      value={profileData.address}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          address: e.target.value,
                        })
                      }
                      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">

                    <button
                      type="submit"
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition"
                    >
                      <Save size={18} />
                      Save Changes
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-bold transition"
                    >
                      Cancel
                    </button>

                  </div>

                </form>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Profile;