import { useState } from "react";
import API from "../../config/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(
  "/api/auth/login",
  formData
);
      // સુરક્ષા માટે ટોકન અને યુઝર ડેટા LocalStorage માં સેવ કરો
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      alert("Login Successful!");
      navigate("/"); // લોગીન થયા પછી હોમ પેજ પર મોકલી દેશે
    } catch (err) {
      setError(err.response?.data?.message || "Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Login to PujaConnect</h2>
        
        {error && (
          <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-xl border border-red-100">
            {error}
          </p>
        )}

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-orange-500 transition-all"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-orange-500 transition-all"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          
          <button 
            type="submit" 
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition duration-200 shadow-md shadow-orange-600/10 active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;