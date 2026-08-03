import { useState } from "react";
import API from "../config/api";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Phone, Lock, ArrowRight } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await API.post(
  "/api/auth/register",
  formData
);
      alert("Registration Successful! Welcome to PujaConnect.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Join PujaConnect to book verified pandits online.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="text-red-600 text-sm text-center bg-red-50 border border-red-100 py-3 px-4 rounded-xl font-medium animate-pulse">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Full Name</label>
            <div className="flex items-center border border-gray-200 bg-gray-50/30 rounded-xl px-3.5 py-3 focus-within:border-orange-500 focus-within:bg-white transition-all">
              <User className="text-gray-400 shrink-0" size={18} />
              <input
                type="text"
                placeholder="Rahul Sharma"
                required
                className="w-full ml-3 bg-transparent outline-none text-sm text-gray-800"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Email Address</label>
            <div className="flex items-center border border-gray-200 bg-gray-50/30 rounded-xl px-3.5 py-3 focus-within:border-orange-500 focus-within:bg-white transition-all">
              <Mail className="text-gray-400 shrink-0" size={18} />
              <input
                type="email"
                placeholder="rahul@example.com"
                required
                className="w-full ml-3 bg-transparent outline-none text-sm text-gray-800"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Phone Number</label>
            <div className="flex items-center border border-gray-200 bg-gray-50/30 rounded-xl px-3.5 py-3 focus-within:border-orange-500 focus-within:bg-white transition-all">
              <Phone className="text-gray-400 shrink-0" size={18} />
              <input
                type="tel"
                placeholder="9876543210"
                required
                maxLength="10"
                className="w-full ml-3 bg-transparent outline-none text-sm text-gray-800"
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Password</label>
            <div className="flex items-center border border-gray-200 bg-gray-50/30 rounded-xl px-3.5 py-3 focus-within:border-orange-500 focus-within:bg-white transition-all">
              <Lock className="text-gray-400 shrink-0" size={18} />
              <input
                type="password"
                placeholder="••••••••"
                required
                className="w-full ml-3 bg-transparent outline-none text-sm text-gray-800"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl transition duration-200 shadow-md shadow-orange-600/10 flex justify-center items-center gap-2 active:scale-[0.98] disabled:bg-orange-400 disabled:cursor-not-allowed text-sm"
          >
            {loading ? "Creating Account..." : "Register Now"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600 font-semibold hover:text-orange-700 transition">
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;