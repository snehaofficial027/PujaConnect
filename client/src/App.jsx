import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBooking from "./components/SearchBooking";
import PopularPujas from "./components/PopularPujas";
import FeaturedPandits from "./components/FeaturedPandits";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Achievements from "./components/Achievements";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

import MyBookings from "./components/MyBookings";
import BookingModal from "./components/BookingModal";
import AuthModal from "./components/AuthModal";
import Profile from "./components/Profile";
import AllServices from "./components/AllServices";
import AllPandits from "./components/AllPandits";
import Dashboard from "./components/Dashboard";

import PanditLogin from "./pages/pandit/PanditLogin";
import PanditSignup from "./pages/pandit/PanditSignup";
import PanditDashboard from "./pages/pandit/PanditDashboard";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPandits from "./pages/admin/AdminPandits";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminRevenue from "./pages/admin/AdminRevenue";

import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import AdminContact from "./pages/admin/AdminContact";
import PanditBookings from "./pages/pandit/PanditBookings";
import PanditEarnings from "./pages/pandit/PanditEarnings";
import PanditReviews from "./pages/pandit/PanditReviews";
import PublicPanditProfile from "./components/PublicPanditProfile";
import PanditProfile from "./pages/pandit/PanditProfile";
import PanditSettings from "./pages/pandit/PanditSettings";
import GoogleSuccess from "./pages/GoogleSuccess";
import ServiceDetails from "./pages/ServiceDetails";
import PublicPujaDetails from "./components/PublicPujaDetails";
import AdminPujas from "./pages/admin/AdminPujas";

function App() {

  const location = useLocation();

  const isAdminRoute =
    location.pathname.startsWith("/admin");

  const isPanditRoute =
    location.pathname.startsWith("/pandit");

  const [user, setUser] = useState(null);

  const [searchCity, setSearchCity] =
    useState("");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [isLoginOpen, setIsLoginOpen] =
    useState(false);

  const [selectedService, setSelectedService] =
    useState(null);

  useEffect(() => {

    const loggedInUser =
      localStorage.getItem("user");

    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }

  }, []);

  const handleBookingClick = (data) => {

    setSelectedService(data);

    setIsModalOpen(true);

  };

  const handleLogout = () => {

    localStorage.removeItem("user");

    setUser(null);

    window.location.href = "/";

  };

  return (

    <div className="bg-gray-50 min-h-screen w-full overflow-x-hidden">

      {!isAdminRoute && !isPanditRoute && (
        <Navbar
          user={user}
          onLogout={handleLogout}
          onLoginClick={() => setIsLoginOpen(true)}
        />
      )}

      <Routes>

             {/* ================= HOME ================= */}

        <Route
  path="/"
  element={
    <Home
      onBookClick={handleBookingClick}
      searchCity={searchCity}
      onSearchTrigger={setSearchCity}
    />
  }
/>
        {/* ================= SERVICES ================= */}

        <Route
          path="/services"
          element={
            <AllServices
              onBookClick={handleBookingClick}
              searchCity={searchCity}
            />
          }
        />

        {/* ================= PANDITS ================= */}

        <Route
          path="/pandits"
          element={
            <AllPandits
              onBookClick={handleBookingClick}
              searchCity={searchCity}
            />
          }
        />

        <Route
  path="/pandits/:id"
  element={
    <>
      <Navbar
        user={user}
        onLogout={handleLogout}
        onLoginClick={() => setIsLoginOpen(true)}
      />

      <PublicPanditProfile
        onBookClick={handleBookingClick}
      />
    </>
  }
/>

        {/* ================= USER ================= */}

        <Route
          path="/bookings"
          element={<MyBookings user={user} />}
        />

        <Route
          path="/profile"
          element={<Profile user={user} />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard user={user} />}
        />

        {/* ================= PANDIT ================= */}

        <Route
          path="/pandit/login"
          element={<PanditLogin />}
        />

        <Route
          path="/pandit/signup"
          element={<PanditSignup />}
        />

        <Route
          path="/pandit/dashboard"
          element={<PanditDashboard />}
        />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminProtectedRoute>
              <AdminUsers />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/pandits"
          element={
            <AdminProtectedRoute>
              <AdminPandits />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <AdminProtectedRoute>
              <AdminBookings />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/revenue"
          element={
            <AdminProtectedRoute>
              <AdminRevenue />
            </AdminProtectedRoute>
          }
        />

        <Route
  path="/admin/contacts"
  element={
    <AdminProtectedRoute>
      <AdminContact />
    </AdminProtectedRoute>
  }
/>

        <Route
  path="/contact"
  element={<Contact />}
/>

<Route
  path="/pandit/bookings"
  element={<PanditBookings />}
/>

<Route
path="/pandit/earnings"
element={<PanditEarnings/>}
/>

<Route
  path="/pandit/reviews"
  element={<PanditReviews />}
/>

<Route
  path="/pandit/profile"
  element={<PanditProfile />}
/>

<Route
  path="/pandit/settings"
  element={<PanditSettings />}
/>

<Route
  path="/google-success"
  element={
    <GoogleSuccess
      onLoginSuccess={(user) => setUser(user)}
    />
  }
/>

<Route
  path="/services/:id"
  element={
    <ServiceDetails
      onBookClick={handleBookingClick}
    />
  }
/>

<Route
  path="/services/:id"
  element={
    <PublicPujaDetails
      onBookClick={handleBookingClick}
    />
  }
/>

<Route path="/admin/pujas" element={<AdminPujas />} />

      </Routes>
            {isModalOpen && (
        <BookingModal
          service={selectedService}
          user={user}
          onClose={() => setIsModalOpen(false)}
          setIsLoginOpen={setIsLoginOpen}
        />
      )}

      {isLoginOpen && (
        <AuthModal
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={(userData) => {
            setUser(userData);
            localStorage.setItem(
              "user",
              JSON.stringify(userData)
            );
            setIsLoginOpen(false);
          }}
        />
      )}

    </div>
  );
}

export default App;