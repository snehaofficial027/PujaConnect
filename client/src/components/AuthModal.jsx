import { useState, useEffect } from "react";
import {
  X,
  Mail,
  Lock,
  User,
  Phone,
  Shield,
} from "lucide-react";
import API from "../config/api";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ onClose, onLoginSuccess }) => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [loginType, setLoginType] = useState("user");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  // ૧. મોડલ ખુલ્લું હોય ત્યારે બૅકગ્રાઉન્ડ સ્ક્રોલ બંધ રાખવું & ફોર્મ ખાલી કરવું
  useEffect(() => {
    document.body.style.overflow = "hidden";
    setFormData({ name: "", email: "", password: "", phone: "" });

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // ૨. User અને Admin ટેબ બદલાય કે Sign In / Sign Up સ્વિચ થાય ત્યારે ફોર્મ સાફ કરવું
  useEffect(() => {
    setFormData({ name: "", email: "", password: "", phone: "" });
  }, [loginType, isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // ================= USER LOGIN =================
        if (loginType === "user") {
          const res = await API.post("/api/auth/login", {
            email: formData.email,
            password: formData.password,
          });

          localStorage.setItem("user", JSON.stringify(res.data));

          onLoginSuccess(res.data);
          alert("User Login Successful");

          if (onClose) onClose();
          return;
        }

        // ================= ADMIN LOGIN =================
        const res = await API.post("/api/admin-auth/login", {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("admin", JSON.stringify(res.data.admin));

        alert("Admin Login Successful");

        if (onClose) onClose();
        navigate("/admin/dashboard");
        return;
      }

      // ================= SIGNUP =================
      const res = await API.post("/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });

      localStorage.setItem("user", JSON.stringify(res.data));

      onLoginSuccess(res.data);
      alert("Account Created Successfully");

      if (onClose) onClose();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = `${API.defaults.baseURL}/api/auth/google`;
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-xl z-[10000]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "Sign In" : "Create Account"}
        </h2>

        {/* LOGIN TYPE */}
        {isLogin && (
          <div className="flex mb-5 bg-gray-100 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setLoginType("user")}
              className={`flex-1 py-2 rounded-lg font-semibold transition ${
                loginType === "user" ? "bg-orange-600 text-white" : ""
              }`}
            >
              User
            </button>

            <button
              type="button"
              onClick={() => setLoginType("admin")}
              className={`flex-1 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                loginType === "admin" ? "bg-gray-900 text-white" : ""
              }`}
            >
              <Shield size={16} />
              Admin
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          {!isLogin && (
            <>
              <div className="flex items-center border rounded-xl p-3">
                <User className="mr-2 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full outline-none bg-transparent"
                  required
                  autoComplete="one-time-code"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex items-center border rounded-xl p-3">
                <Phone className="mr-2 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full outline-none bg-transparent"
                  required
                  autoComplete="one-time-code"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
            </>
          )}

          <div className="flex items-center border rounded-xl p-3">
            <Mail className="mr-2 text-gray-400 flex-shrink-0" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full outline-none bg-transparent"
              required
              autoComplete="one-time-code"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div className="flex items-center border rounded-xl p-3">
            <Lock className="mr-2 text-gray-400 flex-shrink-0" />
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="Password"
              className="w-full outline-none bg-transparent"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold cursor-pointer hover:bg-orange-700 transition"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {isLogin && loginType === "user" && (
          <>
            <div className="text-center my-4 text-gray-400">
              OR
            </div>

            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full border rounded-xl py-3 cursor-pointer hover:bg-gray-50 transition"
            >
              Continue with Google
            </button>
          </>
        )}

        <p className="text-center mt-6">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-600 font-bold ml-2 cursor-pointer"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;