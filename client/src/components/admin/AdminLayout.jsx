import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const SIDEBAR_WIDTH = 288; // w-72 = 18rem = 288px

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* Fixed Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div
        className="min-h-screen flex flex-col"
        style={{
          marginLeft: `${SIDEBAR_WIDTH}px`,
          width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
        }}
      >
        <AdminNavbar />

        <main className="flex-1 p-8">
          <div className="w-full max-w-[1500px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;