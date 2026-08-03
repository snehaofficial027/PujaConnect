import { useEffect, useState } from "react";
import {
  IndianRupee,
  CheckCircle,
  CreditCard,
  Wallet,
} from "lucide-react";

import { getEarnings } from "../../api/panditEarningApi";
import PanditSidebar from "../../components/pandit/PanditSidebar";
import PanditTopbar from "../../components/pandit/PanditTopbar";

export default function PanditEarnings() {

  const pandit =
    JSON.parse(localStorage.getItem("pandit")) || {};

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [data, setData] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await getEarnings();
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading Earnings...
      </div>
    );
  }

  const onlinePayments = data.bookings.filter(
    (b) => b.paymentMethod === "Online"
  ).length;

  const cashPayments = data.bookings.filter(
    (b) => b.paymentMethod === "Cash"
  ).length;

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

          <h1 className="text-4xl font-black text-gray-900">
            My Earnings
          </h1>

          <p className="text-gray-500 mt-2">
            View all your completed bookings and earnings.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

                      {/* Total Earnings */}
            <div className="bg-white rounded-3xl shadow-sm border p-6">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Total Earnings
                  </p>

                  <h2 className="text-4xl font-black mt-3 text-green-600">
                    ₹{data.totalEarnings}
                  </h2>

                </div>

                <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
                  <IndianRupee size={32} />
                </div>

              </div>

            </div>

            {/* Completed */}
            <div className="bg-white rounded-3xl shadow-sm border p-6">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Completed Bookings
                  </p>

                  <h2 className="text-4xl font-black mt-3">
                    {data.totalBookings}
                  </h2>

                </div>

                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <CheckCircle size={32} />
                </div>

              </div>

            </div>

            {/* Online */}
            <div className="bg-white rounded-3xl shadow-sm border p-6">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Online Payments
                  </p>

                  <h2 className="text-4xl font-black mt-3">
                    {onlinePayments}
                  </h2>

                </div>

                <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600">
                  <CreditCard size={32} />
                </div>

              </div>

            </div>

            {/* Cash */}
            <div className="bg-white rounded-3xl shadow-sm border p-6">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    Cash Payments
                  </p>

                  <h2 className="text-4xl font-black mt-3">
                    {cashPayments}
                  </h2>

                </div>

                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
                  <Wallet size={32} />
                </div>

              </div>

            </div>

          </div>

          {/* Earnings Table */}

          <div className="bg-white rounded-3xl shadow-sm border mt-10 overflow-hidden">

            <div className="px-8 py-6 border-b">

              <h2 className="text-2xl font-black">
                Earnings History
              </h2>

            </div>

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead className="bg-orange-50">

                  <tr>

                    <th className="px-6 py-4 text-left">
                      Devotee
                    </th>

                    <th className="px-6 py-4 text-left">
                      Puja
                    </th>

                    <th className="px-6 py-4 text-left">
                      Date
                    </th>

                    <th className="px-6 py-4 text-left">
                      Payment
                    </th>

                    <th className="px-6 py-4 text-left">
                      Amount
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {data.bookings.map((b) => (

                    <tr
                      key={b._id}
                      className="border-b hover:bg-orange-50 transition"
                    >

                      <td className="px-6 py-5 font-semibold">
                        {b.userName}
                      </td>

                      <td className="px-6 py-5">
                        {b.pujaName}
                      </td>

                      <td className="px-6 py-5">
                        {b.date}
                      </td>

                      <td className="px-6 py-5">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            b.paymentMethod === "Online"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {b.paymentMethod}
                        </span>

                      </td>

                      <td className="px-6 py-5 font-bold text-green-600">
                        ₹{b.price}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>
                  </div>

      </div>

    </div>

  );

}