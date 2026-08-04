import { useEffect, useState } from "react";
import API from "../../config/api";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  Trash2,
  Mail,
  User,
  Calendar,
  MessageCircle,
} from "lucide-react";

const AdminContact = () => {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");

  const fetchMessages = async () => {
    try {
      const res = await API.get("/api/contact");

      if (res.data.success) {
        setMessages(res.data.messages || []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
  const fetchMessages = async () => {
    try {
      const res = await API.get("/api/contact");
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchMessages();
}, []);

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
     await API.delete(`/api/contact/${id}`);

      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredMessages = messages.filter((msg) =>
    `${msg.name} ${msg.email} ${msg.subject}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalMessages = messages.length;

  const todayMessages = messages.filter((msg) => {
    return (
      new Date(msg.createdAt).toDateString() ===
      new Date().toDateString()
    );
  }).length;

  const monthMessages = messages.filter((msg) => {
    const d = new Date(msg.createdAt);
    const now = new Date();

    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* Heading */}

        <div>

          <h1 className="text-4xl font-black text-gray-800">
            Contact Messages
          </h1>

          <p className="text-gray-500 mt-2">
            View all enquiries submitted by users.
          </p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">

          <div className="bg-blue-50 rounded-3xl p-6 shadow">

            <p className="text-blue-600 font-medium">
              Total Messages
            </p>

            <h2 className="text-3xl font-black mt-2">
              {totalMessages}
            </h2>

          </div>

          <div className="bg-green-50 rounded-3xl p-6 shadow">

            <p className="text-green-600 font-medium">
              Today's Messages
            </p>

            <h2 className="text-3xl font-black mt-2">
              {todayMessages}
            </h2>

          </div>

          <div className="bg-orange-50 rounded-3xl p-6 shadow">

            <p className="text-orange-600 font-medium">
              This Month
            </p>

            <h2 className="text-3xl font-black mt-2">
              {monthMessages}
            </h2>

          </div>

          <div className="bg-purple-50 rounded-3xl p-6 shadow">

            <p className="text-purple-600 font-medium">
              Total Contacts
            </p>

            <h2 className="text-3xl font-black mt-2">
              {totalMessages}
            </h2>

          </div>

        </div>

        {/* Search */}

        <div className="flex justify-end">

          <div className="relative">


            <input
              type="text"
              placeholder="Search message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-80 h-12 pl-11 pr-4 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-orange-500"
            />

          </div>

        </div>

        {/* Table */}

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          <table className="w-full">

            <thead className="bg-orange-600 text-white">

              <tr>

                <th className="p-4 text-left">User</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Subject</th>
                <th className="p-4 text-left">Message</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-center">Action</th>

              </tr>

            </thead>

            <tbody>

                          {filteredMessages.length > 0 ? (

                filteredMessages.map((msg) => (

                  <tr
                    key={msg._id}
                    className="border-b hover:bg-orange-50 transition"
                  >

                    <td className="p-4">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">

                          <User
                            size={18}
                            className="text-orange-600"
                          />

                        </div>

                        <div>

                          <p className="font-semibold text-gray-800">
                            {msg.name}
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="p-4">

                      <div className="flex items-center gap-2">

                        <Mail
                          size={16}
                          className="text-orange-500"
                        />

                        <span>{msg.email}</span>

                      </div>

                    </td>

                    <td className="p-4 font-medium">
                      {msg.subject}
                    </td>

                    <td className="p-4 max-w-sm">

                      <div className="flex items-center gap-2">

                        <MessageCircle
                          size={16}
                          className="text-orange-500"
                        />

                        <span className="truncate">
                          {msg.message}
                        </span>

                      </div>

                    </td>

                    <td className="p-4">

                      <div className="flex items-center gap-2">

                        <Calendar
                          size={16}
                          className="text-orange-500"
                        />

                        <span>

                          {new Date(
                            msg.createdAt
                          ).toLocaleDateString()}

                        </span>

                      </div>

                    </td>

                    <td className="p-4 text-center">

                      <button
                        onClick={() =>
                          deleteMessage(msg._id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-xl transition"
                      >

                        <Trash2 size={18} />

                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-16"
                  >

                    <div className="flex flex-col items-center">

                      <MessageCircle
                        size={55}
                        className="text-gray-300 mb-3"
                      />

                      <h2 className="text-xl font-bold text-gray-600">

                        No Messages Found

                      </h2>

                      <p className="text-gray-400 mt-1">

                        User contact messages will appear here.

                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>
  );
};

export default AdminContact;