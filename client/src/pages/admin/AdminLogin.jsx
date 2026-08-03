import { useState } from "react";
import API from "../config/api";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

     const res = await API.post(
  "/api/admin-auth/login",
  formData
);

      localStorage.setItem(
        "adminToken",
        res.data.token
      );

      localStorage.setItem(
        "admin",
        JSON.stringify(res.data.admin)
      );

      alert("Admin Login Successful");

      navigate("/admin/dashboard");

    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-6">

      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* LEFT */}

        <div className="bg-gradient-to-br from-orange-600 to-orange-500 text-white p-12 flex flex-col justify-center">

          <ShieldCheck size={70} />

          <h1 className="text-5xl font-black mt-6">
            Admin Panel
          </h1>

          <p className="mt-6 text-orange-100 leading-8">
            Welcome to PujaConnect Administration.
            Manage users, pandits, bookings,
            revenue and analytics securely.
          </p>

          <div className="mt-12 space-y-4">

            <div>✓ Dashboard Analytics</div>

            <div>✓ Pandit Approval</div>

            <div>✓ User Management</div>

            <div>✓ Booking Management</div>

            <div>✓ Revenue Reports</div>

          </div>

        </div>

        {/* RIGHT */}

        {/* RIGHT */}

<div className="p-12">

  <button
    onClick={() => navigate("/")}
    className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold mb-6"
  >
    <ArrowLeft size={18} />
    Back to Home
  </button>

  <h2 className="text-4xl font-black text-gray-900">
    Admin Login
  </h2>

  <p className="text-gray-500 mt-3 mb-8">
    Login using administrator credentials.
  </p>
  
          <form
            onSubmit={handleLogin}
            className="space-y-6"
          >

            <div>

              <label className="font-semibold">
                Email
              </label>

              <div className="mt-2 border rounded-xl flex items-center px-4">

                <Mail className="text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@pujaconnect.com"
                  className="w-full p-4 outline-none"
                  required
                />

              </div>

            </div>

            <div>

              <label className="font-semibold">
                Password
              </label>

              <div className="mt-2 border rounded-xl flex items-center px-4">

                <Lock className="text-gray-400" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full p-4 outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff />
                  ) : (
                    <Eye />
                  )}
                </button>

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-bold text-lg"
            >
              {loading
                ? "Signing In..."
                : "Login to Admin Panel"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AdminLogin;