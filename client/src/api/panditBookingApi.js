import API from "../config/api";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("panditToken")}`,
  },
});

export const getBookings = () =>
  API.get("/api/pandit/bookings", authHeader());

export const confirmBooking = (id) =>
  API.put(`/api/pandit/bookings/${id}/confirm`, {}, authHeader());

export const rejectBooking = (id) =>
  API.put(`/api/pandit/bookings/${id}/reject`, {}, authHeader());

export const completeBooking = (id) =>
  API.put(`/api/pandit/bookings/${id}/complete`, {}, authHeader());