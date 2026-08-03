import { useEffect, useState } from "react";
import API from "../../config/api";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  IndianRupee,
} from "lucide-react";

import AdminLayout from "../../components/admin/AdminLayout";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();

    const interval = setInterval(() => {
      fetchUsers();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

 const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("adminToken");

    const res = await API.get("/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(res.data.users || []);
    setFilteredUsers(res.data.users || []);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    const result = users.filter((user) =>
      user.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredUsers(result);
  }, [search, users]);

  return (
    <AdminLayout>

      {/* Heading */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-black text-gray-800">
            Users
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all registered users
          </p>

        </div>

        <div className="bg-orange-100 text-orange-700 px-5 py-3 rounded-2xl font-bold">

          {filteredUsers.length} Users

        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-3xl shadow-md p-6 mb-8">

        <div className="relative">

          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full h-12 pl-12 pr-5 rounded-xl border outline-none focus:ring-2 focus:ring-orange-500"
          />

        </div>

      </div>

      {/* Users Cards */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

     {filteredUsers.length > 0 ? (
  filteredUsers.map((user) => (
    <div
      key={user._id}
      className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />

      <div className="p-6">

        {/* Top */}

        <div className="flex justify-between items-start">

          <div className="flex items-center gap-4">

            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-orange-100"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-orange-100 flex items-center justify-center">
                <User
                  size={34}
                  className="text-orange-600"
                />
              </div>
            )}

            <div>

              <h2 className="text-xl font-black text-gray-800">
                {user.name}
              </h2>

              <span className="inline-block mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                Active User
              </span>

            </div>

          </div>

        </div>

        {/* Details */}

        <div className="mt-6 space-y-4">

          <div className="flex items-center gap-3 text-gray-600">
            <Mail
              size={18}
              className="text-orange-600"
            />
            <span>{user.email}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <MapPin
              size={18}
              className="text-orange-600"
            />
            <span>{user.city || "Not Added"}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <Calendar
              size={18}
              className="text-orange-600"
            />
            <span>
              Joined :{" "}
              {new Date(
                user.createdAt
              ).toLocaleDateString()}
            </span>
          </div>

           <div className="flex items-center gap-3 text-gray-600">

  <IndianRupee
    size={18}
    className="text-green-600"
  />

  <span>

Total Booking Amount :
₹{user.totalBookingAmount || 0}
  </span>
  </div>

  <div className="flex items-center justify-between mt-3">

  <span className="text-gray-500">
    Last Booking
  </span>

  <span className="font-semibold">
    {user.lastBookingDate}
  </span>

</div>

<div className="flex items-center justify-between mt-2">

  <span className="text-gray-500">
    Status
  </span>

  <span
    className={`px-3 py-1 rounded-full text-xs font-bold
    ${
      user.lastBookingStatus === "Completed"
        ? "bg-green-100 text-green-700"
        : user.lastBookingStatus === "Accepted"
        ? "bg-blue-100 text-blue-700"
        : user.lastBookingStatus === "Pending"
        ? "bg-yellow-100 text-yellow-700"
        : user.lastBookingStatus === "Rejected"
        ? "bg-red-100 text-red-700"
        : "bg-gray-100 text-gray-700"
    }`}
  >
    {user.lastBookingStatus}
  </span>

</div>

        </div>

      </div>

    </div>
  ))
) : (
  <div className="col-span-2 bg-white rounded-3xl p-20 text-center shadow">

    <User
      size={60}
      className="mx-auto text-gray-300 mb-4"
    />

    <h2 className="text-2xl font-black text-gray-700">
      No Users Found
    </h2>

    <p className="text-gray-500 mt-2">
      No registered users available.
    </p>

  </div>
)}
      </div>

    </AdminLayout>
  );
};

export default AdminUsers;