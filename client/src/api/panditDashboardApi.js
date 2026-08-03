import API from "../config/api";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("panditToken")}`,
  },
});

export const getDashboard = async (panditId) => {
  return await API.get(
    `/api/pandit-dashboard/${panditId}`,
    getAuthHeaders()
  );
};

export const getPanditBookings = async () => {
  return API.get(
    "/api/pandit/bookings",
    getAuthHeaders()
  );
};

export const updateBookingStatus = async (
  bookingId,
  status
) => {
  return API.put(
    `/api/pandit/bookings/update-status/${bookingId}`,
    { status },
    getAuthHeaders()
  );
};