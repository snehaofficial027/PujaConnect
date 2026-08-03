import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import API from "../config/api";

const LoginModal = () => {

  const {

    showLogin,

    setShowLogin,

    setShowSignup,

    setIsLoggedIn,

  } = useAuth();

  if (!showLogin) return null;

  const handleLogin = () => {

    setIsLoggedIn(true);

    setShowLogin(false);

    alert("Login Successful");

  };

  return (

    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl p-8 w-[420px] relative">

        <button

          onClick={() => setShowLogin(false)}

          className="absolute top-4 right-4"

        >

          <X />

        </button>

        <h2 className="text-3xl font-bold text-center">

          Login

        </h2>

        <input

          type="email"

          placeholder="Email"

          className="border w-full mt-8 rounded-lg p-4"

        />

        <input

          type="password"

          placeholder="Password"

          className="border w-full mt-4 rounded-lg p-4"

        />

        <button

          onClick={handleLogin}

          className="w-full mt-6 bg-orange-600 text-white py-4 rounded-lg"

        >

          Login

        </button>
        
        <GoogleLogin
  onSuccess={async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const res = await API.post(
  "/api/auth/google",
  {
    name: decoded.name,
    email: decoded.email,
    picture: decoded.picture,
  }
);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Google Login Failed");
    }
  }}
  onError={() => {
    alert("Google Login Failed");
  }}
/>

        <p className="text-center mt-5">

          Don't have an account?

          <button

            className="text-orange-600 ml-2"

            onClick={() => {

              setShowLogin(false);

              setShowSignup(true);

            }}

          >

            Signup

          </button>

        </p>

      </div>

    </div>

  );

};

export default LoginModal;