import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../config/api";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  BadgeCheck,
} from "lucide-react";

const PanditSignup = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    phone: "",

    city: "",

    password: "",

    confirmPassword: "",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    setLoading(true);

    const res = await API.post(
      "/api/pandit-auth/register",
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        password: formData.password,
      }
    );

    alert(res.data.message);

    navigate("/pandit/login");

  } catch (err) {
    alert(
      err.response?.data?.message ||
      "Signup Failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (

    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-5 py-12">

      <div className="max-w-6xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2">
                {/* LEFT SIDE */}

        <div className="hidden lg:flex bg-gradient-to-br from-orange-600 to-orange-500 text-white p-12 flex-col justify-center">

          <div className="mb-8">

            <BadgeCheck
              size={70}
              className="mb-8"
            />

            <h1 className="text-5xl font-black leading-tight">

              Join

              <br />

              PujaConnect

            </h1>

            <p className="mt-6 text-orange-100 text-lg leading-8">

              Become a verified Pandit and connect with thousands of
              devotees across India. Receive bookings, manage your
              schedule, and grow your spiritual services.

            </p>

          </div>

          <div className="space-y-5">

            <div className="flex items-center gap-3">

              <BadgeCheck />

              <span>Verified Pandit Profile</span>

            </div>

            <div className="flex items-center gap-3">

              <BadgeCheck />

              <span>Receive Online & Offline Bookings</span>

            </div>

            <div className="flex items-center gap-3">

              <BadgeCheck />

              <span>Manage Bookings from Dashboard</span>

            </div>

            <div className="flex items-center gap-3">

              <BadgeCheck />

              <span>Trusted by Devotees</span>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="p-10 lg:p-14">

          <h2 className="text-4xl font-black text-gray-900">

            Become a Pandit

          </h2>

          <p className="text-gray-500 mt-2 mb-8">

            Create your Pandit account

          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
                        {/* Full Name */}

<div>
  <label className="font-semibold text-gray-700">
    Full Name
  </label>

  <div className="mt-2 flex items-center border rounded-xl px-4">
    <User className="text-gray-400" size={20} />

    <input
      type="text"
      name="name"
      required
      value={formData.name}
      onChange={handleChange}
      placeholder="Enter your full name"
      className="w-full p-4 outline-none"
    />
  </div>
</div>

{/* Email */}

<div>
  <label className="font-semibold text-gray-700">
    Email Address
  </label>

  <div className="mt-2 flex items-center border rounded-xl px-4">
    <Mail className="text-gray-400" size={20} />

    <input
      type="email"
      name="email"
      required
      value={formData.email}
      onChange={handleChange}
      placeholder="Enter your email"
      className="w-full p-4 outline-none"
    />
  </div>
</div>

{/* Phone */}

<div>
  <label className="font-semibold text-gray-700">
    Mobile Number
  </label>

  <div className="mt-2 flex items-center border rounded-xl px-4">
    <Phone className="text-gray-400" size={20} />

    <input
      type="text"
      name="phone"
      required
      value={formData.phone}
      onChange={handleChange}
      placeholder="Enter mobile number"
      className="w-full p-4 outline-none"
    />
  </div>
</div>

{/* City */}

<div>
  <label className="font-semibold text-gray-700">
    City
  </label>

  <div className="mt-2 flex items-center border rounded-xl px-4">
    <MapPin className="text-gray-400" size={20} />

    <input
      type="text"
      name="city"
      required
      value={formData.city}
      onChange={handleChange}
      placeholder="Enter your city"
      className="w-full p-4 outline-none"
    />
  </div>
</div>

{/* Password */}

<div>
  <label className="font-semibold text-gray-700">
    Password
  </label>

  <div className="mt-2 flex items-center border rounded-xl px-4">

    <Lock className="text-gray-400" size={20} />

    <input
      type={showPassword ? "text" : "password"}
      name="password"
      required
      value={formData.password}
      onChange={handleChange}
      placeholder="Create password"
      className="w-full p-4 outline-none"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>

  </div>
</div>

{/* Confirm Password */}

<div>
  <label className="font-semibold text-gray-700">
    Confirm Password
  </label>

  <div className="mt-2 flex items-center border rounded-xl px-4">

    <Lock className="text-gray-400" size={20} />

    <input
      type={showConfirmPassword ? "text" : "password"}
      name="confirmPassword"
      required
      value={formData.confirmPassword}
      onChange={handleChange}
      placeholder="Confirm password"
      className="w-full p-4 outline-none"
    />

    <button
      type="button"
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
    >
      {showConfirmPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </button>

  </div>
</div>

<button
  type="submit"
  disabled={loading}
  className="w-full bg-orange-600 hover:bg-orange-700 transition text-white py-4 rounded-xl font-bold text-lg disabled:opacity-60"
>
  {loading ? "Creating Account..." : "Become a Pandit"}
</button>

                        <div className="text-center pt-2">

              <p className="text-gray-600">

                Already have a Pandit account?

                <Link
                  to="/pandit/login"
                  className="ml-2 text-orange-600 hover:text-orange-700 font-bold"
                >
                  Login
                </Link>

              </p>

            </div>

            <div className="text-center">

              <Link
                to="/"
                className="text-gray-500 hover:text-orange-600 text-sm font-medium"
              >
                ← Back to Home
              </Link>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

};

export default PanditSignup;