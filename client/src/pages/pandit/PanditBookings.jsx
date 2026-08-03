import RecentBookings from "../../components/pandit/RecentBookings";
import PanditSidebar from "../../components/pandit/PanditSidebar";
import PanditTopbar from "../../components/pandit/PanditTopbar";
import { useState } from "react";

export default function PanditBookings() {

  const pandit =
    JSON.parse(localStorage.getItem("pandit")) || {};

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

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

          <h1 className="text-3xl font-black mb-6">
            My Bookings
          </h1>

          <RecentBookings />

        </div>

      </div>

    </div>
  );
}