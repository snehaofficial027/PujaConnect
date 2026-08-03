import { useEffect, useState } from "react";
import axios from "axios";
import { Check, X, Shield, UserCheck, Calendar, Briefcase, RefreshCw } from "lucide-react";

const Dashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem("user")) || { role: "user" };
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ટેસ્ટિંગ માટે પંડિતોનું ડમી લિસ્ટ (એડમિન મોનિટર માટે)
  const [pandits, setPandits] = useState([
    { id: "1", name: "Acharya Ramesh Joshi", city: "Ahmedabad", isVerified: false },
    { id: "2", name: "Pandit Harish Vyas", city: "Baroda", isVerified: true },
  ]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = () => {
    setLoading(true);
    const apiPath = currentUser.role === "admin"
  ? `${import.meta.env.VITE_API_URL}/api/bookings/admin/all`
  : `${import.meta.env.VITE_API_URL}/api/bookings/user/${currentUser._id || currentUser.id}`;

    axios.get(apiPath)
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard data load error:", err);
        setLoading(false);
      });
  };

  // ⚡ પંડિત અથવા એડમિન દ્વારા બુકિંગ એપ્રુવ/રિજેક્ટ કરવા માટે
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axios.put(
  `${import.meta.env.VITE_API_URL}/api/bookings/update-status/${bookingId}`,
  { status: newStatus }
);
      alert(`Booking status changed to ${newStatus}`);
      fetchDashboardData(); // રીલોડ ડેટા
    } catch (err) {
      alert("Action failed");
    }
  };

  // ⚡ એડમિન દ્વારા પંડિત વેરિફિકેશન
  const togglePanditVerify = (id) => {
    setPandits(pandits.map(p => p.id === id ? { ...p, isVerified: !p.isVerified } : p));
    alert("Pandit profile status updated!");
  };

  if (loading) return <div className="text-center py-20 font-bold text-sm text-gray-500">Loading Control Panel...</div>;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 animate-in fade-in text-left">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight capitalize">{currentUser.role} Control Panel</h2>
          <p className="text-gray-500 text-xs mt-1">Welcome back, {currentUser.name}. Manage your integrated parameters.</p>
        </div>
        <button onClick={fetchDashboardData} className="p-2.5 bg-gray-50 hover:bg-orange-50 text-gray-600 hover:text-orange-600 border border-gray-200 rounded-xl transition">
          <RefreshCw size={16} />
        </button>
      </div>

      {/* 👑 ADMIN FEATURES CONTAINER */}
      {currentUser.role === "admin" && (
        <div className="space-y-8">
          
          {/* Section: Verify and Approve Pandit Profiles */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2"><Shield size={18} className="text-orange-600"/> Verify & Approve Pandit Profiles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pandits.map(p => (
                <div key={p.id} className="border border-gray-100 p-4 rounded-2xl bg-gray-50/50 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{p.name}</h4>
                    <p className="text-xs text-gray-400 font-medium">{p.city}</p>
                  </div>
                  <button 
                    onClick={() => togglePanditVerify(p.id)}
                    className={`text-xs font-black px-3 py-1.5 rounded-xl border flex items-center gap-1 transition ${
                      p.isVerified 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                        : "bg-amber-50 text-amber-600 border-amber-200 hover:bg-orange-600 hover:text-white"
                    }`}
                  >
                    <UserCheck size={13} /> {p.isVerified ? "Verified Account" : "Approve Profile"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Monitor Bookings and Disputes */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2"><Calendar size={18} className="text-orange-600"/> Master Bookings Monitor</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 rounded-xl">
                  <tr>
                    <th className="px-4 py-3 font-bold">Puja Ritual</th>
                    <th className="px-4 py-3 font-bold">Assigned Scholar</th>
                    <th className="px-4 py-3 font-bold">Schedule</th>
                    <th className="px-4 py-3 font-bold">Status</th>
                    <th className="px-4 py-3 font-bold text-center">Action Overrule</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bookings.map(b => (
                    <tr key={b._id} className="hover:bg-gray-50/50 transition">
                      <td className="px-4 py-4 font-bold text-gray-900">{b.pujaName}</td>
                      <td className="px-4 py-4 font-semibold text-gray-700">{b.panditName}</td>
                      <td className="px-4 py-4 text-xs font-medium">{b.date} ({b.timeSlot})</td>
                      <td className="px-4 py-4">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          b.status === "Confirmed" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                        }`}>{b.status}</span>
                      </td>
                      <td className="px-4 py-4 flex justify-center gap-2">
                        <button onClick={() => handleStatusChange(b._id, "Confirmed")} className="p-1.5 bg-green-50 hover:bg-green-600 text-green-600 hover:text-white rounded-lg border border-green-200 transition"><Check size={14}/></button>
                        <button onClick={() => handleStatusChange(b._id, "Rejected")} className="p-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-lg border border-red-200 transition"><X size={14}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 🕉️ PANDIT FEATURES CONTAINER */}
      {currentUser.role === "pandit" && (
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm">
          <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2"><Briefcase size={18} className="text-orange-600"/> Incoming Booking Inquiries</h3>
          
          {bookings.length === 0 ? (
            <p className="text-center py-8 text-gray-400 text-sm">No ritual inquiries assigned to your calendar yet.</p>
          ) : (
            <div className="space-y-4">
              {bookings.map(b => (
                <div key={b._id} className="border border-gray-200/60 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-orange-100 transition">
                  <div className="space-y-1">
                    <div className="flex gap-2 items-center">
                      <h4 className="font-extrabold text-base text-gray-900">{b.pujaName}</h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${b.status === "Confirmed" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>{b.status}</span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">Date: {b.date} | Venue: {b.address} ({b.pujaMode})</p>
                  </div>
                  
                  {b.status === "Pending" && (
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button 
                        onClick={() => handleStatusChange(b._id, "Confirmed")} 
                        className="flex-1 sm:flex-none flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm"
                      >
                        <Check size={13}/> Accept
                      </button>
                      <button 
                        onClick={() => handleStatusChange(b._id, "Rejected")} 
                        className="flex-1 sm:flex-none flex items-center gap-1 bg-gray-100 hover:bg-red-600 text-gray-700 hover:text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                      >
                        <X size={13}/> Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;