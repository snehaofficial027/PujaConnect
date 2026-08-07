import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../config/api";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

const PanditLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 🛑 પેજ લોડ થતા જ ફોર્મ સાવ ખાલી કરવા માટે
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

      const res = await API.post("/api/pandit-auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // જૂનો ડેટા ક્લિયર કરી દો
      localStorage.clear();

      localStorage.setItem("pandit", JSON.stringify(res.data.pandit));
      localStorage.setItem("panditToken", res.data.token);

      alert("Login Successful");

      if (!res.data.profileCompleted) {
        navigate("/pandit/profile");
      } else {
        navigate("/pandit/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* LEFT */}
        <div className="bg-gradient-to-br from-orange-600 to-orange-500 text-white p-12 flex flex-col justify-center">
          <ShieldCheck size={60} />

          <h1 className="text-4xl font-black mt-6">Pandit Portal</h1>

          <p className="mt-5 text-orange-100 leading-8">
            Welcome to PujaConnect. Login to manage your bookings, availability, earnings, reviews and profile.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-3">
              <UserCheck />
              <span>Secure Dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <UserCheck />
              <span>Manage Daily Bookings</span>
            </div>
            <div className="flex items-center gap-3">
              <UserCheck />
              <span>Track Earnings</span>
            </div>
            <div className="flex items-center gap-3">
              <UserCheck />
              <span>Update Availability</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-10">
          <h2 className="text-3xl font-black text-gray-900">Pandit Login</h2>

          <p className="text-gray-500 mt-2 mb-8">
            Login with your registered email and password.
          </p>

          <form
            onSubmit={handleLogin}
            className="space-y-6"
            autoComplete="off"
          >
            {/* Email */}
            <div>
              <label className="font-semibold text-gray-700">Email Address</label>
              <div className="mt-2 flex items-center border rounded-xl px-4">
                <Mail className="text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="one-time-code" /* 👈 આનાથી બ્રાઉઝર ઓટો-ફિલ નહીં કરે */
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full p-4 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="font-semibold text-gray-700">Password</label>
              <div className="mt-2 flex items-center border rounded-xl px-4">
                <Lock className="text-gray-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  autoComplete="new-password" /* 👈 સેવ થયેલો પાસવર્ડ નહીં લાવે */
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 transition text-white py-4 rounded-xl font-bold text-lg disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login to Dashboard"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have a Pandit account?
              <button
                type="button"
                onClick={() => navigate("/pandit/signup")}
                className="ml-2 text-orange-600 font-bold hover:underline"
              >
                Become a Pandit
              </button>
            </p>
          </div>

          <div className="mt-8 bg-gray-50 border rounded-2xl p-5">
            <h3 className="font-bold text-gray-800">Secure Pandit Portal</h3>
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-gray-500 hover:text-orange-600 font-medium"
              >
                ← Back to Home
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2 leading-7">
              This portal is exclusively for verified PujaConnect Pandits.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PanditLogin;