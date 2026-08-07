import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../config/api";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 🛑 પેજ લોડ થતાં જ ઈનપુટ ફીલ્ડ્સ બળજબરીથી સાફ (ખાલી) કરો
  useEffect(() => {
    setFormData({ email: "", password: "" });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/api/admin-auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // જૂનો સેશન કેશ સાફ કરો
      localStorage.clear();

      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      alert("Admin Login Successful");

      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* LEFT */}
        <div className="bg-gradient-to-br from-orange-600 to-orange-500 text-white p-10 flex flex-col justify-center">
          <ShieldCheck size={50} />

          <h1 className="text-4xl font-black mt-4">
            Admin Panel
          </h1>

          <p className="mt-4 text-orange-100 text-sm leading-6">
            Welcome to PujaConnect Administration. Manage users, pandits, bookings, revenue and analytics securely.
          </p>

          <div className="mt-8 space-y-3 text-sm font-semibold">
            <p>✓ Dashboard Analytics</p>
            <p>✓ Pandit Approval</p>
            <p>✓ User Management</p>
            <p>✓ Booking Management</p>
            <p>✓ Revenue Reports</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-8 flex flex-col justify-center relative">

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-1 text-gray-500 hover:text-orange-600 text-sm font-medium mb-4"
          >
            <ArrowLeft size={16} /> Back to Home
          </button>

          <h2 className="text-3xl font-black text-gray-900">
            Admin Login
          </h2>

          <p className="text-gray-500 text-sm mt-1 mb-6">
            Login using administrator credentials.
          </p>

          <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
            {/* Email */}
            <div>
              <label className="font-semibold text-gray-700 text-sm">
                Email
              </label>

              <div className="mt-1 flex items-center border rounded-xl px-3">
                <Mail className="text-gray-400" size={18} />

                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="one-time-code" /* 👈 બ્રાઉઝર ઓટો-ફિલ નહીં કરી શકે */
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter admin email"
                  className="w-full p-3 outline-none text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="font-semibold text-gray-700 text-sm">
                Password
              </label>

              <div className="mt-1 flex items-center border rounded-xl px-3">
                <Lock className="text-gray-400" size={18} />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  autoComplete="new-password" /* 👈 સેવ થયેલો પાસવર્ડ ફિલ નહીં થાય */
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full p-3 outline-none text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 transition text-white py-3.5 rounded-xl font-bold text-base disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login to Admin Panel"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;