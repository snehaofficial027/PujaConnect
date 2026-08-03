import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const SignupModal = () => {

  const {

    showSignup,

    setShowSignup,

    setShowLogin,

  } = useAuth();

  if (!showSignup) return null;

  return (

    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl p-8 w-[420px] relative">

        <button

          onClick={() => setShowSignup(false)}

          className="absolute top-4 right-4"

        >

          <X />

        </button>

        <h2 className="text-3xl font-bold text-center">

          Signup

        </h2>

        <input

          placeholder="Full Name"

          className="border w-full mt-8 rounded-lg p-4"

        />

        <input

          placeholder="Email"

          className="border w-full mt-4 rounded-lg p-4"

        />

        <input

          type="password"

          placeholder="Password"

          className="border w-full mt-4 rounded-lg p-4"

        />

        <button

          className="w-full mt-6 bg-orange-600 text-white py-4 rounded-lg"

        >

          Signup

        </button>

        <p className="text-center mt-5">

          Already have an account?

          <button

            className="text-orange-600 ml-2"

            onClick={() => {

              setShowSignup(false);

              setShowLogin(true);

            }}

          >

            Login

          </button>

        </p>

      </div>

    </div>

  );

};

export default SignupModal;