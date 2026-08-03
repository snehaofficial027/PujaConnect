import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleSuccess = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");
    const name = params.get("name");
    const email = params.get("email");
    const token = params.get("token");

    console.log("========== GOOGLE SUCCESS ==========");
    console.log("Current URL:", window.location.href);
    console.log("ID:", id);
    console.log("NAME:", name);
    console.log("EMAIL:", email);
    console.log("TOKEN:", token);

    if (!id || !name || !email || !token) {
      console.log("❌ Google Login Failed - Missing Query Params");
      navigate("/");
      return;
    }

    const user = {
      _id: id,
      name,
      email,
      token,
    };

    localStorage.setItem("user", JSON.stringify(user));

    if (onLoginSuccess) {
      onLoginSuccess(user);
    }

    navigate("/", { replace: true });
  }, [navigate, onLoginSuccess]);

  return (
    <div className="flex items-center justify-center h-screen text-xl font-bold">
      Signing In...
    </div>
  );
};

export default GoogleSuccess;