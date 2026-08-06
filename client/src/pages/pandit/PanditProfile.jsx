import { useEffect, useState } from "react";
import {
  Camera,
  Save,
  Briefcase,
  Languages,
  IndianRupee,
  Lock,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import PanditSidebar from "../../components/pandit/PanditSidebar";
import PanditTopbar from "../../components/pandit/PanditTopbar";

import {
  getProfile,
  updateProfile,
  uploadPhoto,
} from "../../api/panditProfileApi";

const PanditProfile = () => {

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    experience: "",
    language: "",
    price: "",
    bio: "",
    image: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {

      const res = await getProfile();

      if (res.data.success) {
        setProfile(res.data.pandit);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });

  };

  const saveProfile = async () => {

    try {

      const res = await updateProfile(profile);

      if (res.data.success) {

        setProfile(res.data.pandit);

        localStorage.setItem(
          "pandit",
          JSON.stringify(res.data.pandit)
        );

        alert("Profile Updated Successfully");

      }

    } catch (err) {

      console.log(err);

      alert("Update Failed");

    }

  };

  const changePhoto = async (e) => {

    try {

      const file = e.target.files[0];

      if (!file) return;

      const formData = new FormData();

      formData.append("image", file);

      const res = await uploadPhoto(formData);

      if (res.data.success) {

        setProfile(res.data.pandit);

        localStorage.setItem(
          "pandit",
          JSON.stringify(res.data.pandit)
        );

        alert("Photo Updated Successfully");

      }

    } catch (err) {

      console.log(err);

      alert("Photo Upload Failed");

    }

  };

  const logout = () => {

    localStorage.removeItem("pandit");
    localStorage.removeItem("panditToken");

    navigate("/pandit/login");

  };

  return (
        <div className="flex bg-gray-100 min-h-screen">

      <PanditSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1">

        <PanditTopbar
          pandit={profile}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="p-8">

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <div className="flex flex-col lg:flex-row gap-10">

              {/* LEFT SIDE */}

              <div className="lg:w-1/3 flex flex-col items-center">

  <img
  src={
    profile.image
      ? profile.image.startsWith("http")
        ? profile.image
        : `${import.meta.env.VITE_API_URL}/${profile.image}`
      : "/images/pandits/pandit1.jpg"
  }
  alt={profile.name}
 className="w-44 h-44 rounded-2xl object-cover object-top border-4 border-orange-200 shadow-lg"
  onError={(e) => {
    e.target.src = "/images/pandits/pandit1.jpg";
  }}
/>

  <label className="mt-5 cursor-pointer bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl flex items-center gap-2">
    <Camera size={18} />
    Change Photo

    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={changePhoto}
    />
  </label>

                <h2 className="mt-6 text-2xl font-bold">
                  {profile.name || "Pandit Ji"}
                </h2>

                <p className="text-gray-500">
                  {profile.city || "Ahmedabad"}
                </p>

                <div className="mt-8 w-full bg-orange-50 rounded-2xl p-5">

                  <div className="flex justify-between py-3 border-b">
                    <span>Experience</span>
                    <strong>
                      {profile.experience || "5+ Years"}
                    </strong>
                  </div>

                  <div className="flex justify-between py-3 border-b">
                    <span className="flex items-center gap-2">
                      <Languages size={16} />
                      Languages
                    </span>

                    <strong>
                      {profile.language || "Gujarati"}
                    </strong>
                  </div>

                  <div className="flex justify-between py-3">

                    <span className="flex items-center gap-2">

                      <IndianRupee size={16} />

                      Dakshina

                    </span>

                    <strong className="text-orange-600">

                      ₹{profile.price || 1100}

                    </strong>

                  </div>

                </div>

              </div>

              {/* RIGHT SIDE */}

              <div className="flex-1">

                <h2 className="text-3xl font-bold mb-8">

                  Edit Profile

                </h2>

                <div className="grid md:grid-cols-2 gap-6">

                  <div>

                    <label className="block font-semibold mb-2">

                      Full Name

                    </label>

                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="w-full border rounded-xl p-3"
                    />

                  </div>

                  <div>

                    <label className="block font-semibold mb-2">

                      Email

                    </label>

                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="w-full border rounded-xl p-3"
                    />

                  </div>

                  <div>

                    <label className="block font-semibold mb-2">

                      Mobile Number

                    </label>

                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="w-full border rounded-xl p-3"
                    />

                  </div>

                  <div>

                    <label className="block font-semibold mb-2">

                      City

                    </label>

                    <input
                      type="text"
                      name="city"
                      value={profile.city}
                      onChange={handleChange}
                      className="w-full border rounded-xl p-3"
                    />

                  </div>

                  <div>

                    <label className="block font-semibold mb-2 flex items-center gap-2">

                      <Briefcase size={16} />

                      Experience

                    </label>

                    <input
                      type="text"
                      name="experience"
                      value={profile.experience}
                      onChange={handleChange}
                      className="w-full border rounded-xl p-3"
                    />

                  </div>

                  <div>

                    <label className="block font-semibold mb-2 flex items-center gap-2">

                      <Languages size={16} />

                      Languages

                    </label>

                    <input
                      type="text"
                      name="language"
                      value={profile.language}
                      onChange={handleChange}
                      className="w-full border rounded-xl p-3"
                    />

                  </div>
                                    <div className="md:col-span-2">

                    <label className="block font-semibold mb-2 flex items-center gap-2">

                      <IndianRupee size={16} />

                      Dakshina

                    </label>

                    <input
                      type="number"
                      name="price"
                      value={profile.price}
                      onChange={handleChange}
                      className="w-full border rounded-xl p-3"
                    />

                  </div>

                  <div className="md:col-span-2">

                    <label className="block font-semibold mb-2">

                      About Yourself

                    </label>

                    <textarea
                      rows="5"
                      name="bio"
                      value={profile.bio}
                      onChange={handleChange}
                      className="w-full border rounded-xl p-3"
                    />

                  </div>

                  <div className="md:col-span-2 pt-4">

                    <button
                      onClick={saveProfile}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3"
                    >

                      <Save size={18} />

                      Save Changes

                    </button>

                  </div>


                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

  );

};

export default PanditProfile;