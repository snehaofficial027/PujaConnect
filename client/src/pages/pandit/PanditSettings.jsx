import { useState } from "react";
import {
  Save,
  Bell,
  Lock,
  Globe,
  Shield,
  Trash2,
  LogOut,
  User,
  CreditCard,
} from "lucide-react";
import { changePassword } from "../../api/panditProfileApi";

import PanditSidebar from "../../components/pandit/PanditSidebar";
import PanditTopbar from "../../components/pandit/PanditTopbar";

const PanditSettings = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [passwordData, setPasswordData] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

  const pandit = JSON.parse(localStorage.getItem("pandit")) || {};

  const handlePasswordChange = async () => {

  if (
    passwordData.newPassword !==
    passwordData.confirmPassword
  ) {
    return alert("Passwords do not match");
  }

  try {

    const res = await changePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });

    alert(res.data.message);

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  } catch (err) {

    alert(
      err.response?.data?.message ||
      "Password change failed"
    );

  }

};

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <PanditSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1">

        <PanditTopbar
          pandit={pandit}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="p-8">

          <h1 className="text-4xl font-black mb-8">
            Account Settings
          </h1>

          <div className="grid lg:grid-cols-2 gap-7">
                        {/* Profile */}

            <div className="bg-white rounded-3xl shadow p-6">

              <div className="flex items-center gap-3 mb-6">

                <User className="text-orange-600" />

                <h2 className="text-2xl font-bold">
                  Profile
                </h2>

              </div>

              <div className="space-y-4">

                <div className="flex justify-between items-center">

                  <span>Name</span>

                  <span className="font-semibold">
                    {pandit.name}
                  </span>

                </div>

                <div className="flex justify-between items-center">

                  <span>Email</span>

                  <span className="font-semibold">
                    {pandit.email}
                  </span>

                </div>

                <div className="flex justify-between items-center">

                  <span>Phone</span>

                  <span className="font-semibold">
                    {pandit.phone || "Not Added"}
                  </span>

                </div>

              </div>

            </div>

            {/* Security */}

            <div className="bg-white rounded-3xl shadow p-6">

              <div className="flex items-center gap-3 mb-6">

                <Shield className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Security
                </h2>

              </div>

              <div className="border rounded-xl p-5 space-y-4">

  <div className="flex items-center gap-3 mb-2">

    <Lock className="text-orange-600" />

    <h3 className="font-bold text-lg">
      Change Password
    </h3>

  </div>

  <input
    type="password"
    placeholder="Current Password"
    value={passwordData.currentPassword}
    onChange={(e) =>
      setPasswordData({
        ...passwordData,
        currentPassword: e.target.value,
      })
    }
    className="w-full border rounded-lg p-3"
  />

  <input
    type="password"
    placeholder="New Password"
    value={passwordData.newPassword}
    onChange={(e) =>
      setPasswordData({
        ...passwordData,
        newPassword: e.target.value,
      })
    }
    className="w-full border rounded-lg p-3"
  />

  <input
    type="password"
    placeholder="Confirm Password"
    value={passwordData.confirmPassword}
    onChange={(e) =>
      setPasswordData({
        ...passwordData,
        confirmPassword: e.target.value,
      })
    }
    className="w-full border rounded-lg p-3"
  />

  <button
    onClick={handlePasswordChange}
    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg"
  >
    Update Password
  </button>

</div>

              <button className="w-full mt-4 flex justify-between items-center border rounded-xl p-4 hover:bg-gray-50">

                <div className="flex items-center gap-3">

                  <Shield />

                  Two-Factor Authentication

                </div>

                <span className="text-sm text-gray-500">
                  Coming Soon
                </span>

              </button>

            </div>

            {/* Notifications */}

            <div className="bg-white rounded-3xl shadow p-6">

              <div className="flex items-center gap-3 mb-6">

                <Bell className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  Notifications
                </h2>

              </div>

              <div className="space-y-5">

                <label className="flex justify-between">

                  Booking Alerts

                  <input type="checkbox" defaultChecked />

                </label>

                <label className="flex justify-between">

                  Payment Alerts

                  <input type="checkbox" defaultChecked />

                </label>

                <label className="flex justify-between">

                  Email Alerts

                  <input type="checkbox" />

                </label>

              </div>

            </div>

            {/* Payments */}

            <div className="bg-white rounded-3xl shadow p-6">

              <div className="flex items-center gap-3 mb-6">

                <CreditCard className="text-purple-600" />

                <h2 className="text-2xl font-bold">
                  Payment Settings
                </h2>

              </div>

              <input
                placeholder="Bank Account Number"
                className="w-full border rounded-xl p-3 mb-4"
              />

              <input
                placeholder="IFSC Code"
                className="w-full border rounded-xl p-3 mb-4"
              />

              <input
                placeholder="UPI ID"
                className="w-full border rounded-xl p-3"
              />

            </div>
                        {/* Language */}

            <div className="bg-white rounded-3xl shadow p-6">

              <div className="flex items-center gap-3 mb-6">

                <Globe className="text-cyan-600" />

                <h2 className="text-2xl font-bold">
                  Language
                </h2>

              </div>

              <select className="w-full border rounded-xl p-3">

                <option>English</option>

                <option>ગુજરાતી</option>

                <option>हिन्दी</option>

              </select>

            </div>

            {/* Documents */}

            <div className="bg-white rounded-3xl shadow p-6">

              <div className="flex items-center gap-3 mb-6">

                <Shield className="text-emerald-600" />

                <h2 className="text-2xl font-bold">
                  Verification
                </h2>

              </div>

              <div className="space-y-4">

                <div className="flex justify-between">

                  <span>Aadhaar Card</span>

                  <span className="text-green-600 font-semibold">
                    Verified
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>PAN Card</span>

                  <span className="text-green-600 font-semibold">
                    Verified
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Profile Status</span>

                  <span className="text-green-600 font-semibold">
                    Active
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* Danger Zone */}

          <div className="mt-8 bg-white rounded-3xl shadow p-6 border border-red-200">

            <h2 className="text-2xl font-bold text-red-600 mb-6">
              Danger Zone
            </h2>

            <div className="flex flex-wrap gap-4">

              <button
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
                onClick={() => {
                  localStorage.removeItem("pandit");
                  localStorage.removeItem("panditToken");
                  window.location.href = "/pandit/login";
                }}
              >
                <LogOut size={18} />
                Logout
              </button>

              <button
                className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-6 py-3 rounded-xl transition"
              >
                <Trash2 size={18} />
                Delete Account
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};

export default PanditSettings;