import { useState } from "react";
import API from "../../config/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/api/auth/login",
        formData
      );

      // Token and user data save
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful!");

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid Email or Password"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

      <div className="w-full max-w-md bg-white p-5 sm:p-7 md:p-8 rounded-2xl shadow-lg border border-gray-100">

        {/* ================= TITLE ================= */}
        <div className="mb-6 sm:mb-8">

          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
            Login to PujaConnect
          </h2>

          <p className="text-center text-sm text-gray-500 mt-2">
            Sign in to continue your booking
          </p>

        </div>

        {/* ================= ERROR ================= */}
        {error && (
          <p className="text-red-500 text-xs sm:text-sm text-center bg-red-50 py-2.5 px-3 rounded-xl border border-red-100 mb-5 break-words">
            {error}
          </p>
        )}

        {/* ================= FORM ================= */}
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              className="w-full px-4 py-3 sm:py-3.5 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all text-sm sm:text-base"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              className="w-full px-4 py-3 sm:py-3.5 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all text-sm sm:text-base"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />
          </div>

          {/* ================= SIGN IN ================= */}
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 sm:py-3.5 rounded-xl transition duration-200 shadow-md shadow-orange-600/10 active:scale-[0.98] text-sm sm:text-base mt-2"
          >
            Sign In
          </button>

        </form>

      </div>
    </div>
  );
};

export default Login;